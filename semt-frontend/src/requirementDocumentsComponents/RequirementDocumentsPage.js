import "./RequirementDocumentsPage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const [showDetails, setDetails] = useState(false);
  const [showDoc, setDoc] = useState(false);
  const [showGroup, setGroup] = useState(false);
  const [showReq, setReq] = useState(false);

  const [docName, setName] = useState("");
  const [docDescription, setDesc] = useState("");

  const [reqComment, setReqComment] = useState("");
  const [reqDesc, setReqDesc] = useState("");
  const [reqGrp, setReqGrp] = useState("");
  const [reqType, setReqType] = useState("");

  const [groupName, setGroupName] = useState("");

  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];
  const docId = path[3];

  const docClose = () => setDoc(false);
  const docShow = () => setDoc(true);

  const detailsClose = () => setDetails(false);
  const detailsShow = () => setDetails(true);

  const groupClose = () => setGroup(false);
  const groupShow = () => setGroup(true);

  const reqClose = () => setReq(false);
  const reqShow = () => setReq(true);

  const now = 60;

  const onSubmitReq = (e) => {
    e.preventDefault();

    if (
      !reqComment ||
      !reqDesc ||
      !reqType
    ) {
      alert("Please add the credentials");
      return;
    }


    console.log(reqComment, reqDesc, reqGrp, reqType)

    
    const projectId = Number(projId);
    const requirementDocumentId = Number(docId);
    const requirementGroupId = null
    if (reqGrp !== "") {
      requirementGroupId = reqGrp
    }
    const description = reqDesc;
    const comment = reqComment;
    const testType = reqType;

    addRequriement({projectId, requirementDocumentId, requirementGroupId, description, comment, testType})
    setReqComment("");
    setReqDesc("");
    setReqGrp("");
    setReqType("");
    reqClose(false);
  };

  const addRequriement= async (reqInfo) => {
    console.log(JSON.stringify(reqInfo));
    const res = await fetch(
      "https://localhost:44335/api/requirement/add",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reqInfo),
      }
    );
  };

  const onSubmitDocument = (e) => {
    e.preventDefault();

    if (!docName || !docDescription) {
      alert("Please add the credentials");
      return;
    }

    setName("");
    setProject("");
    docClose(false);
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

  useEffect(() => {
    const getProject = async () => {
      const projectInfo = await fetchProject(projId);
      setProject(projectInfo);
    };

    const getDocument = async () => {
      const documentInfo = await fetchDocument(docId);
      setDocument(documentInfo);
    };

    console.log(docId);
    const getDocGroups = async () => {
      const groupsInfo = await fetchDocumentGroups(docId);
      setDocGroups(groupsInfo);
    };

    console.log(docGrups);

    getProject();
    getDocument();
    getDocGroups();
  }, []);

  const fetchDocument = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/requirement-document/getbyid?id=${id}`
    );
    const data = await res.json();

    return data;
  };

  const dummydocument = {
    description: "Dummy description",
    comment: "Comment",
    createDate: "31/01/2031",
    updateDate: "31/31/3131",
    name: "name",
    testtype: "31 Testi",
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
                  <th style={{ width: "120px" }}>Is Verified</th>
                  <th style={{ width: "118px" }}>View Details</th>
                  <th style={{ width: "118px" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td className={`${true === true ? "trueRow" : "falseRow"}`}>
                    Yes
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="btnTable"
                      onClick={detailsShow}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      className="btnTable" //onClick={docShow}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr className="header">
                  <td colSpan="6">ASDFASDF</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                </tr>
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
          <Form onSubmit={onSubmitDocument}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Edit Document Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter the name for the Document"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Edit Document Description</Form.Label>
              <Form.Control
                onChange={(e) => setDesc(e.target.value)}
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

            <Form.Select aria-label="Default select example"
            onChange={e => {setReqType(e.target.value);
            }}>
              <option value="0" selected disabled>Please select a Type</option>
              <option value="Inspection">Inspection</option>
              <option value="Demonstration">Demonstration</option>
              <option value="Test">Test</option>
              <option value="Analysis">Analysis</option>
              <option value="Certification">Certification</option>
            </Form.Select>

            <Form.Select aria-label="Default select example" style={{ marginTop: "20px" }}
             onChange={e => {setReqGrp(e.target.value);}}>
              <option value="0" selected disabled>Select a Header if you want</option>
              {docGrups.map((doc, i) => (
                  <option key={i} value={doc.id}>{doc.name}</option>
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
            {dummydocument.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Description:</h5> {dummydocument.description}
          <h5>Comment:</h5> {dummydocument.comment}
          <h5>Create Date:</h5> {dummydocument.createDate}
          <h5>Update Date:</h5> {dummydocument.updateDate}
          <h5>Test Type:</h5> {dummydocument.testtype}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequirementDocumentsPage;
