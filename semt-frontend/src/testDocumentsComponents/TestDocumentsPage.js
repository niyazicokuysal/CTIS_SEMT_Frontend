import { Link, useNavigate } from "react-router-dom";
import "./TestDocumentsPage.css";
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

const TestDocumentsPage = () => {
  const [project, setProject] = useState([]);
  const [document, setDocument] = useState([]);

  const now = 60;

  const [testDocName, setTestDocName] = useState("");
  const [testDocDesc, setTestDocDesc] = useState("");

  const [showTestDoc, setTestDoc] = useState(false);

  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];
  const testId = path[3];

  const testDocClose = () => setTestDoc(false);
  const testDocShow = () => setTestDoc(true);

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

  useEffect(() => {
    const getDocument = async () => {
      const testInfo = await fetchTestDocument(testId);
      setDocument(testInfo);
    };
    getDocument();
    
  }, []);

  const fetchTestDocument = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/test-document/getbyId?id=${testId}`
    );
    const data = await res.json();
    console.log("bruh",document)
    return data;
  };

  const onUpdateTestDocument = (e) => {
    e.preventDefault();

    if (!testDocName || !testDocDesc) {
      alert("Please add the credentials");
      return;
    }

    const id = Number(document.id);
    document.name = testDocName;
    document.description = testDocDesc;
    updateTestDocument(document);
    setTestDocName("");
    setTestDocDesc("");
    setDocument(false);
  };

  const updateTestDocument = async (testDoc) => {
    console.log("aaa",JSON.stringify(testDoc));
    const res = await fetch("https://localhost:44335/api/test-document/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(testDoc),
    });
    
    const newTestDocument = await fetchTestDocument(testDoc.id);
    setDocument(newTestDocument);
  };

  return (
    <>
      <Container fluid className="reqDocMainPage">
        <Row>
          <Col sm={10} style={{ height: "200px" }}>
            <Row className="projInfoRow">
              <Col>
                <h1>
                  {`${document.name} of ${project.name}`.length > 65
                    ? `${document.name} of ${project.name}`
                        .slice(0, 62)
                        .concat("...")
                    : `${document.name} of ${project.name}`}
                </h1>
              </Col>
            </Row>
            <Row className="projInfoRow">
              <Col>
                <a>
                  {document.description}
                </a>
              </Col>
            </Row>
          </Col>
          <Col sm={2}>
            <Button
              size="lg"
              variant="success"
              className="btnReqDoc"
              onClick={testDocShow}
            >
              Edit Document Info
            </Button>
            <Button
              size="lg"
              variant="danger"
              className="btnReqDoc" //onClick={docShow}
            >
              Add Test in Document
            </Button>
            <Button
              size="lg"
              variant="info"
              className="btnReqDoc" //onClick={docShow}
            >
              Add Test Group
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      
      <Modal
        //Edit document modal
        show={showTestDoc}
        onHide={testDocClose}
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
          <Form onSubmit={onUpdateTestDocument}>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Edit Document Name</Form.Label>
              <Form.Control
                onChange={(e) => setTestDocName(e.target.value)}
                type="text"
                placeholder="Enter the name for the Document"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
              <Form.Label>Edit Document Description</Form.Label>
              <Form.Control
                onChange={(e) => setTestDocDesc(e.target.value)}
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
    </>
  );
};

export default TestDocumentsPage;
