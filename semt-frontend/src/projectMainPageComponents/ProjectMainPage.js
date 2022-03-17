import { Link, useNavigate } from "react-router-dom";
import "./ProjectMainPage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ListGroup,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";

const ProjectMainPage = ({ dummyProject }) => {
  const [project, setProject] = useState([]);
  const [show, setShow] = useState(false);
  const [showDoc, setDoc] = useState(false);


  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [newDocName, setNewDocName] = useState("");
  const [newDocHeader, setNewDocHeader] = useState("");


  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];

  const reqDocId = 1;
  const testDocId = 1;


  const navigate = useNavigate();

  const now = 60;

  const documents = [
    {
      requirementsDocuments: "System Requirements",
      testDocuments: "System Test Document",
    },
    {
      requirementsDocuments: "Software Requirements",
      testDocuments: "Software Test Document",
    },
    {
      requirementsDocuments: "Authentication Requirements",
      testDocuments: "Authentication Test Document",
    },
    {
      requirementsDocuments: "Visual Requirements",
      testDocuments: "Visual Test Document",
    },
    {
      requirementsDocuments: "Non-Functional Requirements",
      testDocuments: "Non-Functional Test Document",
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const docClose = () => setDoc(false);
  const docShow = () => setDoc(true);

  useEffect(() => {
    const getProject = async () => {
      const projectInfo = await fetchProject(projId);
      setProject(projectInfo);
    };

    getProject();
  }, []);

  const fetchProject = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/project/getbyid?id=${id}`
    );
    const data = await res.json();

    return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description) {
      alert("Please add the credentials");
      return;
    } else if (name.length > 50) {
      alert(`Project Name is ${name.length} character should be Max 50`);
      return;
    } else if (description.length > 300) {
      alert(`Project Name is ${description.length} character should be Max 300`);
      return;
    }

    setName("");
    setDesc("");
    setShow(false);
  };

  const onSubmitDocument = (e) => {
    e.preventDefault();

    if (!newDocName || !newDocHeader) {
      alert("Please add the credentials");
      return;
    }

    setNewDocName("");
    setNewDocHeader("");
    docClose(false);
  };


  return (
    <>
      <Container fluid className="projectMainPage">
        <Row>
          <Col sm={10} style={{ height: "200px" }}>
            <Row className="projInfoRow">
              <Col sm={5}>
                <h1>{project.name}</h1>
              </Col>
              <Col sm={7} className="progressBar">
                {" "}
                <ProgressBar animated now={now} label={`Validation: ${now}%`} />
              </Col>
            </Row>
            <Row className="projInfoRow">
              <Col>
                <a>{project.description}</a>
              </Col>
            </Row>
          </Col>
          <Col sm={2}>
            <Button
              size="lg"
              variant="success"
              className="btnProjectMain"
              onClick={handleShow}
            >
              Edit Project Info
            </Button>
            <Button size="lg" variant="danger" className="btnProjectMain" onClick={docShow}>
              Edit Project Documentation
            </Button>
            <Button
              size="lg"
              variant="info"
              className="btnProjectMain"
              onClick={() => navigate("/inDev")}
            >
              Edit Project Members
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Table className="documantTable">
              <thead>
                <tr>
                  <th style={{ width: "320px" }}>Requirements Documentation</th>
                  <th style={{ width: "320px" }}>Test Documentation</th>
                  <th>Requirements Validation Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document, i) => (
                  <tr key={i}>
                    <td className="documentRow">
                      <Link to={`/${projId}/req/${reqDocId}`}>
                        {document.requirementsDocuments}
                      </Link>
                    </td>
                    <td className="documentRow">
                      <Link to={`/${projId}/test/${testDocId}`}>
                        {document.testDocuments}
                      </Link>
                    </td>
                    <td style={{ paddingTop: "13px" }}>
                      <ProgressBar
                        variant="danger"
                        now={now}
                        label={`${now}%`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm={4}>
            <h3>Project Members</h3>
            <ListGroup variant="flush">
              {dummyProject.members.map((member, i) => (
                <ListGroup.Item key={i}>
                  <Link to={"/inDev"} className="projectMembers">
                    {member}
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Project Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formCreateProject">
              <Form.Label>Edit Project Name</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)} 
                type="text"
                placeholder="Enter the name for the Project"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Edit Project Description</Form.Label>
              <Form.Control
                onChange={(e) => setDesc(e.target.value)}
                style={{ height: "200px" }}
                rows="5"
                as="textarea"
                placeholder="Enter the description for the Project"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Update Project
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDoc}
        onHide={docClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Project Documentation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table hover className="documantTable">
          <thead>
                <tr>
                  <th style={{ width: "320px" }}>Requirements Documentation</th>
                  <th style={{ width: "320px" }}>Test Documentation</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document, i) => (
                  <tr key={i}>
                    <td>   
                        {document.requirementsDocuments}
                    </td>
                    <td>
                        {document.testDocuments}
                    </td>
                  </tr>
                ))}
              </tbody>
          </Table>
          <Form onSubmit={onSubmitDocument}>
            <Form.Group className="mb-3" controlId="formCreateProject">
              <Form.Label>New Requirement Document</Form.Label>
              <Form.Control
                onChange={(e) => setNewDocName(e.target.value)} 
                type="text"
                placeholder="Enter the name for the requirement document"
              />
              <Form.Label style={{ marginTop: "20px" }}>New Requirement Document's Header</Form.Label>
              <Form.Control 
                onChange={(e) => setNewDocHeader(e.target.value)} 
                type="text"
                placeholder="Enter the header"
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Add Requirement Documentation
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ProjectMainPage.defaultProps = {
  dummyProject: {
    members: [
      "Mehmet Ali - Project Menager",
      "Tahsin Küçük - Developer",
      "Burak Demirbaş - Developer",
      "Zeynep Zeynep Oğlu - Tester",
      "Deniz Tuzlu - Tester",
    ],
  },
};

export default ProjectMainPage;
