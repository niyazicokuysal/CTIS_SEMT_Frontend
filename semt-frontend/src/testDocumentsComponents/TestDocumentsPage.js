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
  const [showTestCaseAdd, setShowTestCaseAdd] = useState(false);
  const [testCases, setTestCases] = useState([]);
 // const [document, setDocument] = useState([]);

  const testCaseAddClose = () => setShowTestCaseAdd(false);
  const testCaseAddOpen = () => setShowTestCaseAdd(true);
  const [testDoc, setDocument] = useState([]);

  const [testDocName, setTestDocName] = useState("");
  const [testDocDesc, setTestDocDesc] = useState("");

  const [testName, setTestName] = useState("");
  const [description, setDesc] = useState("");
  const [requirementString, setRequirementString] = useState("");

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
    const getDocument = async () => {
      const testInfo = await fetchTestDocument(testId);
      setDocument(testInfo);
    };
    const getTestCases = async () => {
      const testInfo = await fetchTestCases(testId);
      setTestCases(testInfo);
    };

    getTestCases();
    getDocument();
    getProject();
    console.log(testCases)
  }, [projId]);

  const fetchProject = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/project/getbyid?id=${id}`
    );
    const data = await res.json();

    return data;
  };

  const fetchTestDocument = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/test-document/getbyId?id=${id}`
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
    document.name = testDocName + " Test Document"; 
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

  const fetchTestCases = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/test-case/getall?documentId=${id}`
    );
    const data = await res.json();
    return data;
  };


  const onSubmitCase = (e) => {
    e.preventDefault();

    if (!testName || !description || !requirementString) {
      alert("Please add the credentials");
      return;
    } 

    const projectId = Number(projId);
    const testDocumentId = Number(testId);
    const name = testName

    const requirementNames = requirementString.split("/");

    addTestCase({ projectId, testDocumentId, name, description,requirementNames });
    setTestName("");
    setDesc("");
    setRequirementString("");
    setTestDoc(false)
  };

  const addTestCase = async (addTestCase) => {
    console.log(JSON.stringify(addTestCase));
    const res = await fetch(
      "https://localhost:44335/api/test-case/add",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(addTestCase),
      }
    );
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
              variant="info"
              className="btnReqDoc"
              onClick={testCaseAddOpen}
            >
              Add Test Case
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>


              {testCases.map((testCase, i) => {
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{testCase.name}</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>


              })}
    
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


      <Modal
        //Add Test Case Model
        show={showTestCaseAdd}
        onHide={testCaseAddClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Test Case 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitCase}
          >
            <Form.Group className="mb-3" controlId="">
            <Form.Label>Name of the Case</Form.Label>
              <Form.Control
                onChange={(e) => setTestName(e.target.value)}
                type="text"
                placeholder="Enter a name for the Case"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
            <Form.Label>Requirement(s) that been Tested</Form.Label>
              <Form.Control
                onChange={(e) => setRequirementString(e.target.value)}
                type="text"
                placeholder="Enter requirement name(s)"
              />
            </Form.Group>
            <Form.Label>Project Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                style={{ height: "200px" }}
                rows="5"
                as="textarea"
                placeholder="Enter the description for the Project"
              />
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Add Group
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TestDocumentsPage;
