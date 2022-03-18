import "./RequirementDocumentsPage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  Container,
  Accordion,
  Row,
  Col,
  Table,
  Button,
  ListGroup,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";

const RequirementDocumentsPage = () => {
  const [project, setProject] = useState([]);
  const [document, setDocument] = useState([]);
  const [docGrups, setDocGroups] = useState([]);
  const [docRequirements, setDocumentRequirements] = useState([]);
  const [singleReqInfo, setSingleReqInfo] = useState([]);
  const [singleGroupInfo, setSingleGroupInfo] = useState([null]);

  const [showDetails, setDetails] = useState(false);
  const [showDoc, setDoc] = useState(false);
  const [showGroup, setGroup] = useState(false);
  const [showReq, setReq] = useState(false);

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

  const now = 60;

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

  }

  const onUpdateDocument = (e) => {
    e.preventDefault();

    if (!docTypeName || !docDescription) {
      alert("Please add the credentials");
      return;
    }

    const id = Number(document.id);
    console.log("UPDATE",document);
    document.typeName = docTypeName;
    document.description = docDescription;
    updateDocument(document);
    setDocTypeName("");
    setDocDesc("");
    setDocument(false);
  }

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

    return data;
  };

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
  }, [projId]);


  const updateDocument = async (document) => {
    console.log(JSON.stringify(document));
    const res = await fetch("https://localhost:44335/api/requirement-document/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(document),
    });
    
    const newDocument = await fetchDocument(document.id);
    setDocument(newDocument);
  };

  return (
    <>
      <Container fluid className="reqDocMainPage">
        <Row>
          <Col sm={10} style={{ height: "200px" }}>
            <Row className="projInfoRow">
              <Col sm={5}>
                <h1>
                  {`${document.typeName} of ${project.name}`.length > 50
                    ? `${document.typeName} of ${project.name}`
                        .slice(0, 50)
                        .concat("...")
                    : `${document.typeName} of ${project.name}`}
                </h1>
              </Col>
              <Col sm={7} className="progressBar">
                {" "}
                <ProgressBar
                  variant="danger"
                  animated
                  now={now}
                  label={`Validation: ${now}%`}
                />
              </Col>
            </Row>
            <Row className="projInfoRow">
              <Col>
                <a>{document.description}</a>
              </Col>
            </Row>
          </Col>
          <Col sm={2}>
            <Button
              size="lg"
              variant="success"
              className="btnReqDoc"
              onClick={docShow}
            >
              Edit Document Info
            </Button>
            <Button
              size="lg"
              variant="danger"
              className="btnReqDoc"
              onClick={reqShow}
            >
              Add Requirement in Document
            </Button>
            <Button
              size="lg"
              variant="info"
              className="btnReqDoc"
              onClick={groupShow}
            >
              Add Requirements Group
            </Button>
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
                  <th style={{ width: "118px" }}>Delete</th>
                  {/* <th style={{ width: "118px" }}>Group</th> */}
                </tr>
              </thead>
              <tbody>
                {docRequirements.map((requirement, i) => (
                  <tr
                    key={i}
                    className={`${
                      requirement.isDeleted === true ? "deleted" : ""
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
                      className={`${false === true ? "trueRow" : "falseRow"}`}
                    >
                      No
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
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
                        variant="danger"
                        onClick={() => deleteRequirement(requirement.id)}
                        className={`${
                          requirement.isDeleted === true
                            ? "deletedBtn"
                            : "btnTable"
                        }`}
                      >
                        Delete
                      </Button>
                    </td>

                    {/* <td>{singleGroupInfo === null ? "Has no Group" : singleGroupInfo.name}</td> */}
                  </tr>
                ))}

                {/* <tr className="header">
                  <td colSpan="7">ASDFASDF</td>
                </tr> */}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal
        //Edit document modal
        show={showDoc}
        onHide={docClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Document Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onUpdateDocument}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Edit Document Name</Form.Label>
              <Form.Control
                onChange={(e) => setDocTypeName(e.target.value)}
                type="text"
                placeholder="Enter the name for the Document"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Edit Document Description</Form.Label>
              <Form.Control
                onChange={(e) => setDocDesc(e.target.value)}
                style={{ height: "200px" }}
                rows="5"
                as="textarea"
                placeholder="Enter the description for the Document"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Update Document
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        //Add Requirement In Document
        show={showReq}
        onHide={reqClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Requirement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitReq}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) => setReqDesc(e.target.value)}
                style={{ height: "100px" }}
                rows="5"
                as="textarea"
                placeholder="Enter the description for the Requirement"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                onChange={(e) => setReqComment(e.target.value)}
                style={{ height: "100px" }}
                rows="5"
                as="textarea"
                placeholder="Enter the comment for the Requirement"
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setReqType(e.target.value);
              }}
            >
              <option value="0" selected disabled>
                Please select a Type
              </option>
              <option value="Inspection">Inspection</option>
              <option value="Demonstration">Demonstration</option>
              <option value="Test">Test</option>
              <option value="Analysis">Analysis</option>
              <option value="Certification">Certification</option>
            </Form.Select>

            <Form.Select
              aria-label="Default select example"
              style={{ marginTop: "20px" }}
              onChange={(e) => {
                setReqGrp(e.target.value);
              }}
            >
              <option value="0" selected disabled>
                Select a Header if you want
              </option>
              {docGrups.map((doc, i) => (
                <option key={i} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </Form.Select>

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Add Requirement
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        //Add Requirement Group Modal
        show={showGroup}
        onHide={groupClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Requirement Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitGroup}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                onChange={(e) => setGroupName(e.target.value)}
                type="text"
                placeholder="Enter the name for the Group"
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Add Group
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        //View Details Modal
        show={showDetails}
        onHide={detailsClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {singleReqInfo.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Description: {singleReqInfo.description} </h5>
          <h5>Comment: {singleReqInfo.comment} </h5>
          <h5>
            Create Date: {moment(singleReqInfo.createdDate).format("LLLL")}{" "}
          </h5>
          <h5>
            Update Date:{" "}
            {singleReqInfo.updatedDate === null
              ? "Not Yet Modified"
              : moment(singleReqInfo.updatedDate).format("LLLL")}{" "}
          </h5>
          <h5>
            Group:{" "}
            {singleGroupInfo === null ? "Has no Group" : singleGroupInfo.name}{" "}
          </h5>
          <h5>Test Type: {singleReqInfo.testTypes} </h5>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequirementDocumentsPage;
