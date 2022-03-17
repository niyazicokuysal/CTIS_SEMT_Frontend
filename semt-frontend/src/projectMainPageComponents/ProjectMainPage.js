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
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];

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
    }

    setName("");
    setDesc("");
    setShow(false);
  };

  return (
    <>
      <Container fluid className="projectMainPage">
        <Row>
          <Col sm={10} style={{ height: "200px" }}>
            <Row className="projInfoRow">
              <Col sm={4}>
                {" "}
                <h1>{project.name}</h1>
              </Col>
              <Col sm={8} className="progressBar">
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
            <Button size="lg" variant="danger" className="btnProjectMain">
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
                    <td>
                      <Link to={"/inDev"} className="documentRow">
                        {document.requirementsDocuments}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/inDev"} className="documentRow">
                        {document.testDocuments}
                      </Link>
                    </td>
                    <td>
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
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                value={project.name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter the name for the Project"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                value={project.description}
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
          <Table striped bordered hover className="documantTable">
            <thead>
              <tr>
                <th>Requirements Documentation</th>
                <th>Test Documentation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>System Requirements</td>
                <td>System Tests</td>
              </tr>
              <tr>
                <td>Software Requirements</td>
                <td>Software Tests</td>
              </tr>
              <tr>
                <td>Software Requirements</td>
                <td>Software Tests</td>
              </tr>
              <tr>
                <td>Software Requirements</td>
                <td>Software Tests</td>
              </tr>
            </tbody>
          </Table>
          <Form /*onSubmit={onSubmit} buraya bak !!!!!!!!!!!!!!!!!!!!!!!!!!*/>
            <Form.Group className="mb-3" controlId="formCreateProject">
              <Form.Label>New requirement</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter the name for the requirement"
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Add Requirement
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
