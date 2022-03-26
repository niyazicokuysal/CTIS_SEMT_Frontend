import { Link, useNavigate } from "react-router-dom";
import "./TestDocumentsPage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import EditTestDocumentInfoModel from "./EditTestDocumentInfoModel"
import AddTestCaseModel from "./AddTestCaseModel"
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
  const [testDocument, setTestDocument] = useState([]);
  const [testCases, setTestCases] = useState([]);

  const [testDocName, setTestDocName] = useState("");
  const [testDocDesc, setTestDocDesc] = useState("");

  const [testName, setTestName] = useState("");
  const [description, setDesc] = useState("");
  const [requirementString, setRequirementString] = useState("");

  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];
  const testId = path[3];

  const [showTestDoc, setTestDoc] = useState(false);
  const testDocClose = () => setTestDoc(false);
  const testDocShow = () => setTestDoc(true);

  const [showTestCaseAdd, setShowTestCaseAdd] = useState(false);
  const testCaseAddClose = () => setShowTestCaseAdd(false);
  const testCaseAddOpen = () => setShowTestCaseAdd(true);

  useEffect(() => {
    const getProject = async () => {
      const projectInfo = await fetchProject(projId);
      setProject(projectInfo);
    };
    const getDocument = async () => {
      const testInfo = await fetchTestDocument(testId);
      setTestDocument(testInfo);
    };

console.log("234")
    getDocument();
    getProject();
    console.log(testCases)
  }, [projId]);

  useEffect(() => {
    
    const getTestCases = async () => {
      const testCasesInfo = await fetchTestCases(testId);
      setTestCases(testCasesInfo);
    };

    getTestCases();
      
    
  }, [testCases]);

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
    setTestDoc(false);
  };

  const updateTestDocument = async (testDoc) => {
    const res = await fetch(
      "https://localhost:44335/api/test-document/update",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(testDoc),
      }
    );

    const newTestDocument = await fetchTestDocument(testDoc.id);
    setTestDocument(newTestDocument);
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
    const name = testName;

    const requirementNames = requirementString.split("/");

    addTestCase({
      projectId,
      testDocumentId,
      name,
      description,
      requirementNames,
    });
    setTestName("");
    setDesc("");
    setRequirementString("");
    setShowTestCaseAdd(false);
  };

  const addTestCase = async (addTestCase) => {
    console.log(JSON.stringify(addTestCase));
    const res = await fetch("https://localhost:44335/api/test-case/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addTestCase),
    });
  };

  return (
    <>
      <Container fluid className="reqDocMainPage">
        <Row>
          <Col sm={10} style={{ height: "200px" }}>
            <Row className="projInfoRow">
              <Col>
                <h1>
                  {`${testDocument.name} of ${project.name}`.length > 65
                    ? `${testDocument.name} of ${project.name}`
                        .slice(0, 62)
                        .concat("...")
                    : `${testDocument.name} of ${project.name}`}
                </h1>
              </Col>
            </Row>
            <Row className="projInfoRow">
              <Col>
                <a>{testDocument.description}</a>
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
              </Table>;
            })}
          </Col>
        </Row>
      </Container>

      <EditTestDocumentInfoModel showTestDoc={showTestDoc} testDocClose={testDocClose} onUpdateTestDocument={onUpdateTestDocument} setTestDocName={setTestDocName} setTestDocDesc={setTestDocDesc}></EditTestDocumentInfoModel>

      <AddTestCaseModel showTestCaseAdd = {showTestCaseAdd} testCaseAddClose={testCaseAddClose} onSubmitCase={onSubmitCase} setTestName={setTestName} setRequirementString={setRequirementString} setDesc={setDesc}></AddTestCaseModel>
    </>
  );
};

export default TestDocumentsPage;
