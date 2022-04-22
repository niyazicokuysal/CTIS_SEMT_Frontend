import "./RequirementDocumentsPage.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import EditReqDocumentInfoModal from "./EditReqDocumentInfoModal";
import AddRequirementInDocumentModal from "./AddRequirementInDocumentModal";
import AddRequirGroupModal from "./AddRequirGroupModal";
import ViewReqDetailsModal from "./ViewReqDetailsModal";
import Switch from "react-js-switch";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ProgressBar,
  Breadcrumb,
  Spinner,
} from "react-bootstrap";

const RequirementDocumentsPage = () => {
  const [loadingForProject, setLoadingForProject] = useState(false);
  const [loadingForDocument, setLoadingForDocument] = useState(false);
  const [listById, setListById] = useState(true);
  const [project, setProject] = useState([]);
  const [document, setDocument] = useState([]);
  const [docGroups, setDocGroups] = useState([]);
  const [docRequirements, setDocumentRequirements] = useState([]);
  const [singleReqInfo, setSingleReqInfo] = useState([]);
  const [singleGroupInfo, setSingleGroupInfo] = useState([null]);

  const [showDetails, setDetails] = useState(false);
  const [showDoc, setDoc] = useState(false);
  const [showGroup, setGroup] = useState(false);
  const [showReq, setReq] = useState(false);
  const [showUpdateReq, setUpdateReq] = useState(false);

  const [docTypeName, setDocTypeName] = useState("");
  const [docDescription, setDocDesc] = useState("");

  const [reqComment, setReqComment] = useState("");
  const [reqDesc, setReqDesc] = useState("");
  const [reqGrp, setReqGrp] = useState("null");
  const [reqType, setReqType] = useState("");

  const [groupName, setGroupName] = useState("");

  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];
  const docId = path[3];

  const docClose = () => setDoc(false);
  const docShow = () => setDoc(true);

  const detailsClose = () => setDetails(false);
  const detailsShow = (id, group) => [
    {
      set: setDetails(true),
      showedReqId: id,
      req: getReqById(id),
      group: getGroupById(group),
    },
  ];

  const groupClose = () => setGroup(false);
  const groupShow = () => setGroup(true);

  const reqClose = () => setReq(false);
  const reqShow = () => setReq(true);
  const updateReqClose = () => setUpdateReq(false);
  const updateReqShow = () => setUpdateReq(true);

  useEffect(() => {
    const getProject = async () => {
      const projectInfo = await fetchProject(projId);
      setProject(projectInfo);
    };

    const getDocument = async () => {
      const documentInfo = await fetchDocument(docId);
      setDocument(documentInfo);
    };

    const getDocGroups = async () => {
      const groupsInfo = await fetchDocumentGroups(docId);
      setDocGroups(groupsInfo);
    };

    const getDocReq = async () => {
      const docReqs = await getProjectDocumentsRequirements(docId);

      setDocumentRequirements(docReqs);
    };

    getProject();
    getDocument();
    getDocReq();
    getDocGroups();
  }, []);

  const onSubmitReq = (e) => {
    e.preventDefault();

    if (!reqComment || !reqDesc || !reqType) {
      alert("Please add the credentials");
      return;
    }

    console.log(reqComment, reqDesc, reqGrp, reqType);

    const projectId = Number(projId);
    const requirementDocumentId = Number(docId);
    const requirementGroupId = Number(reqGrp);
    const description = reqDesc;
    const comment = reqComment;
    const testTypes = reqType;

    addRequriement({
      projectId,
      requirementDocumentId,
      requirementGroupId,
      description,
      comment,
      testTypes,
    });
    setReqComment("");
    setReqDesc("");
    setReqGrp("");
    setReqType("");
    reqClose(false);
  };

  const onSubmitEditReq = (e) => {
    e.preventDefault();

    console.log(reqComment, reqDesc, reqGrp, reqType);

    const projectId = Number(projId);
    const requirementDocumentId = Number(docId);
    const requirementGroupId = Number(reqGrp);
    const description = reqDesc;
    const comment = reqComment;
    const testTypes = reqType;

    updateRequriement({
      projectId,
      requirementDocumentId,
      requirementGroupId,
      description,
      comment,
      testTypes,
    });
    setReqComment("");
    setReqDesc("");
    setReqGrp("");
    setReqType("");
    reqClose(false);
  };

  const addRequriement = async (reqInfo) => {
    console.log(JSON.stringify(reqInfo));
    const res = await fetch("https://localhost:44335/api/requirement/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reqInfo),
    });

    const newRequirements = await getProjectDocumentsRequirements(docId);
    setDocumentRequirements(newRequirements);
  };

  const updateRequriement = async (reqInfo) => {
        console.log(JSON.stringify(reqInfo));
        const res = await fetch("https://localhost:44335/api/requirement/update", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(reqInfo),
        });

        const newRequirements = await getProjectDocumentsRequirements(docId);
        setDocumentRequirements(newRequirements);
  };

  const onSubmitGroup = (e) => {
    e.preventDefault();

    if (!groupName) {
      alert("Please add the credentials");
      return;
    }

    const name = groupName;
    const requirementDocumentId = document.id;
    const parentId = null;
    addDocumentReqGroup({ parentId, requirementDocumentId, name });
    setGroup("");
    docClose(false);
  };

  const addDocumentReqGroup = async (groupInfo) => {
    console.log(JSON.stringify(groupInfo));
    const res = await fetch(
      "https://localhost:44335/api/requirement-group/add",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(groupInfo),
      }
    );

    const newdocs = await fetchDocumentGroups(docId);
    setDocGroups(newdocs);
  };

  const onUpdateDocument = (e) => {
    e.preventDefault();

    if (!docTypeName || !docDescription) {
      alert("Please add the credentials");
      return;
    }

    document.typeName = docTypeName + " Requirements Document";
    document.description = docDescription;
    console.log(document);
    updateDocument(document);
    setDocTypeName("");
    setDocDesc("");
    setDoc(false);
  };

  const deleteRequirement = async (id) => {
    await fetch(`https://localhost:44335/api/requirement/delete?id=${id}`, {
      method: "POST",
    });
    const docReqs = await getProjectDocumentsRequirements(docId);
    setDocumentRequirements(docReqs);
  };

  const fetchDocumentGroups = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/requirement-group/getall?documentId=${id}`
    );
    const data = await res.json();

    return data;
  };

  const fetchProject = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/project/getbyid?id=${id}`
    );
    const data = await res.json();

    setLoadingForProject(true);
    return data;
  };

  const getProjectDocumentsRequirements = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/requirement/getbydocumentid?documentId=${id}`
    );
    const data = await res.json();

    console.log(data);
    return data;
  };

  const getReqById = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/requirement/getbyid?id=${id}`
    );
    const data = await res.json();

    const projectInfo = data;
    setSingleReqInfo(projectInfo);
    console.log(singleReqInfo);
    return data;
  };

  const getGroupById = async (id) => {
    if (id !== null) {
      const res = await fetch(
        `https://localhost:44335/api/requirement-group/getbyid?id=${id}`
      );
      const groupInfo = await res.json();
      setSingleGroupInfo(groupInfo);
      console.log(singleGroupInfo);
    } else setSingleGroupInfo(null);
  };

  const fetchDocument = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/requirement-document/getbyid?id=${id}`
    );
    const data = await res.json();

    setLoadingForDocument(true);
    return data;
  };

  const updateDocument = async (document) => {
    console.log(JSON.stringify(document));
    const res = await fetch(
      "https://localhost:44335/api/requirement-document/update",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(document),
      }
    );

    const newDocument = await fetchDocument(document.id);
    setDocument(newDocument);
  };

  const renderNullGroup = () => {
    let isNull = false;
    for (let req in docRequirements) {
      if (req.requirementGroupId == null) isNull = true;
    }
    if (isNull) {
      return (
        <>
          <tr className="header">
            <td colSpan="7">No Group</td>
          </tr>
          {docRequirements.map((requirement, i) =>
            renderRequirements({ id: null }, requirement, i)
          )}
        </>
      );
    }
  };

  const renderRequirements = (group, requirement, i) => {
    if (group.id == requirement.requirementGroupId) {
      return (
        <tr
          key={i}
          className={`${requirement.isDeleted === true ? "deleted" : ""}`}
        >
          <td>{requirement.name}</td>

          <td>{requirement.description}</td>
          <td>{requirement.testTypes}</td>
          <td>{requirement.isDeleted === true ? "Deleted" : "Not Deleted"}</td>
          <td className={`${false === true ? "trueRow" : "falseRow"}`}>No</td>
          <td>
            <Button
              size="sm"
              variant="primary"
              className="btnTable"
              onClick={() =>
                detailsShow(requirement.id, requirement.requirementGroupId)
              }
            >
              View
            </Button>
          </td>
          <td>
            <Button
              size="sm"
              variant="danger"
              onClick={() => deleteRequirement(requirement.id)}
              className={`${
                requirement.isDeleted === true ? "deletedBtn" : "btnTable"
              }`}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    }
    return null;
  };

  const changelistRender = () => {
    if (listById == false) setListById(true);
    else setListById(false);
  };

  return (
    <>
      {!loadingForProject && !loadingForDocument ? (
        <Spinner animation="border">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Container fluid className="reqDocMainPage">
            <Row>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`${"/"}`}>Main Page</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`${"/" + projId + "/main"}`}>{project.name}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{document.typeName}</Breadcrumb.Item>
              </Breadcrumb>
              <Col sm={8} style={{ height: "140px" }}>
                <Row className="projInfoRow">
                  <Col className="progressBar">
                    {" "}
                    <ProgressBar
                      now={document.finishRate}
                      label={`Validation: ${document.finishRate}%`}
                    />
                  </Col>
                </Row>
                <Row className="projInfoRow">
                  <Col className="projectReqDesc">
                    <a>{document.description}</a>
                  </Col>
                </Row>
              </Col>
              <Col sm={2}>
                <Button
                  size="lg"
                  variant="info"
                  className="btnReqDoc"
                  onClick={docShow}
                >
                  Edit Document Info
                </Button>
                <Button
                  size="lg"
                  variant="success"
                  className="btnReqDoc"
                  onClick={reqShow}
                >
                  Add Requirement in Document
                </Button>
              </Col>
              <Col sm={2}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="btnReqDoc"
                  onClick={groupShow}
                >
                  Add Requirements Group
                </Button>
                <Button
                  size="lg"
                  variant="dark"
                  className="btnReqDoc"
                  //onClick={reqShow}
                >
                  Create Baseline of Document
                </Button>
              </Col>
            </Row>
            <Row className="tableSwitch">
              <Col sm={2}>
                  <h5>List By Group/List By Req Id:</h5>
              </Col>
              <Col>
                  <Switch
                    borderColor={{ on: "#f46e0f", off: "#f9f9f9" }}
                    backgroundColor={{ on: "#f46e0f", off: "#D0CDC8" }}
                    color="#E3E3E3"
                    value={listById}
                    size={60}
                    onChange={changelistRender}
                  />
              </Col>
            </Row>
            <Row>
              <Col>
                <Table hover bordered className="reqTable">
                  <thead>
                    <tr>
                      <th style={{ width: "140px" }}>Req Id</th>
                      <th>Description</th>
                      <th style={{ width: "170px" }}>Test Types</th>
                      <th style={{ width: "120px" }}>Is Deleted</th>
                      <th style={{ width: "105px" }}>Is Verified</th>
                      <th style={{ width: "118px" }}>View Details</th>
                      <th style={{ width: "118px" }}>Edit</th>
                      <th style={{ width: "118px" }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {listById === false ? (
                        <>
                          {docRequirements.map((requirement, i) => (
                            <>
                              <tr
                                key={i}
                                className={`${
                                  requirement.isDeleted === true
                                    ? "deleted"
                                    : ""
                                }`}
                              >
                                <td>{requirement.name}</td>

                                <td>{requirement.description}</td>
                                <td>{requirement.testTypes}</td>
                                <td>
                                  {requirement.isDeleted === true
                                    ? "Deleted"
                                    : "Not Deleted"}
                                </td>
                                <td
                                  className={`${
                                    false === true ? "trueRow" : "falseRow"
                                  }`}
                                >
                                  No
                                </td>
                                <td>
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    className="btnTable"
                                    onClick={() =>
                                      detailsShow(
                                        requirement.id,
                                        requirement.requirementGroupId
                                      )
                                    }
                                  >
                                    View
                                  </Button>
                                </td>
                                  <td>
                                      <Button
                                          size="sm"
                                          variant="info"
                                          onClick={() =>
                                              updateReqShow
                                          }
                                          className="btnTable"
                                      >
                                          Edit
                                      </Button>
                                  </td>

                                <td>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() =>
                                      deleteRequirement(requirement.id)
                                    }
                                    className={`${
                                      requirement.isDeleted === true
                                        ? "deletedBtn"
                                        : "btnTable"
                                    }`}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          {renderNullGroup()}
                          {docGroups.map((group, g) => (
                            <>
                              <tr className="header">
                                <td colSpan="7">{group.name}</td>
                              </tr>
                              {docRequirements.map((requirement, i) =>
                                renderRequirements(group, requirement, i)
                              )}
                            </>
                          ))}
                        </>
                      )}
                    </>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </>
      )}

      <EditReqDocumentInfoModal
        showDoc={showDoc}
        docClose={docClose}
        onUpdateDocument={onUpdateDocument}
        setDocTypeName={setDocTypeName}
        setDocDesc={setDocDesc}
      ></EditReqDocumentInfoModal>

      <AddRequirementInDocumentModal
        showReq={showReq}
        reqClose={reqClose}
        onSubmitReq={onSubmitReq}
        setReqDesc={setReqDesc}
        setReqComment={setReqComment}
        setReqType={setReqType}
        setReqGrp={setReqGrp}
        docGroups={docGroups}
      ></AddRequirementInDocumentModal>

      <EditRequirementModal
          showReq={showReq}
          reqClose={reqClose}
          onSubmitReq={onSubmitReq}
          setReqDesc={setReqDesc}
          setReqComment={setReqComment}
          setReqType={setReqType}
          setReqGrp={setReqGrp}
          docGroups={docGroups}
      ></EditRequirementModal>

      <AddRequirGroupModal
        showGroup={showGroup}
        groupClose={groupClose}
        onSubmitGroup={onSubmitGroup}
        setGroupName={setGroupName}
      ></AddRequirGroupModal>

      <ViewReqDetailsModal
        showDetails={showDetails}
        detailsClose={detailsClose}
        singleReqInfo={singleReqInfo}
        singleGroupInfo={singleGroupInfo}
      ></ViewReqDetailsModal>
    </>
  );
};

export default RequirementDocumentsPage;
