import { Link, useNavigate } from "react-router-dom";
import "./TestDocumentsPage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import EditTestDocumentInfoModel from "./EditTestDocumentInfoModel";
import AddTestCaseModel from "./AddTestCaseModel";
import AddTestStepModel from "./AddTestStepModel";
//import axios from "axios";
import moment from "moment";
import {
  Container,
  Accordion,
  Row,
  Col,
  Table,
  Button,
  Breadcrumb,
  Spinner,
} from "react-bootstrap";

const TestDocumentsPage = () => {
  const [loadingForProject, setLoadingForProject] = useState(false);
  const [project, setProject] = useState([]);
  const [testDocument, setTestDocument] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [singleTestCase, setSingleTestCase] = useState([]);

  const [testDocName, setTestDocName] = useState("");
  const [testDocDesc, setTestDocDesc] = useState("");

  const [testName, setTestName] = useState("");
  const [description, setDesc] = useState("");
  const [requirementString, setRequirementString] = useState("");

  const [testStepDescription, setTestStepDescription] = useState("");
  const [testStepInputs, setTestStepInputs] = useState("");
  const [testStepExpected, setTestStepExpected] = useState("");
  const [testStepComments, setTestStepComments] = useState("");
  const [testStepRequirements, setTestStepRequirements] = useState("");
  const [fillerTestCaseId, setFillerTestCaseId] = useState("");


  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];
  const testDocId = path[3];

  const [showTestDoc, setTestDoc] = useState(false);
  const testDocClose = () => setTestDoc(false);
  const testDocShow = () => setTestDoc(true);

  const [showTestCaseAdd, setShowTestCaseAdd] = useState(false);
  const testCaseAddClose = () => setShowTestCaseAdd(false);
  const testCaseAddOpen = () => setShowTestCaseAdd(true);

  const [showTestStepAdd, setShowTestStepAdd] = useState(false);
  const testStepAddClose = () => setShowTestStepAdd(false);
  const testStepAddOpen = (id) => [{
    set: setShowTestStepAdd(true),
    testCase: getTestCaseById(id),
  }
]

  const fetchProject = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/project/getbyid?id=${id}`
    );
    const data = await res.json();

    return data;
  };

  const fetchDocument = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/test-document/getbyid?id=${id}`
    );
    const data = await res.json();

    setTestCases(data.testCases);
    setLoadingForProject(true);
    return data;
  };

  useEffect(() => {
    const getProject = async () => {
      const projectInfo = await fetchProject(projId);
      setProject(projectInfo);
    };

    const getDocument = async () => {
      const groupsInfo = await fetchDocument(testDocId);
      setTestDocument(groupsInfo);
    };

    getProject();
    getDocument();
  }, []);

  const onUpdateTestDocument = (e) => {
    e.preventDefault();

    if (!testDocName || !testDocDesc) {
      alert("Please add the credentials");
      return;
    }

    testDocument.name = testDocName + " Test Document";
    testDocument.description = testDocDesc;

    updateTestDocument(testDocument);
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
  };

  const onSubmitCase = (e) => {
    e.preventDefault();

    if (!testName || !description || !requirementString) {
      alert("Please add the credentials");
      return;
    }

    const projectId = Number(projId);
    const testDocumentId = Number(testDocId);
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

    const groupsInfo = await fetchDocument(testDocId);
    setTestDocument(groupsInfo);
  };

  
  const getTestCaseById = async (id) => {
    const res = await fetch(
      `https://localhost:44335/api/test-case/getbyid?id=${id}`
    );
    const data = await res.json();

    const testCase = data;
    setSingleTestCase(testCase);
    return data;
  };

  const onSubmitStep = (e) => {
    e.preventDefault();

    if (!testStepDescription || !testStepInputs || !testStepExpected || !testStepComments ||!testStepRequirements) {
      alert("Please add the credentials");
      return;
    }

    const projectId = Number(projId);
    const testCaseId = Number(fillerTestCaseId)
    const description = testStepDescription
    const inputs = testStepInputs
    const expectedOutputs = testStepExpected
    const comment = testStepComments

    const requirementNames = testStepRequirements.split("/");

    addTestStep({
      projectId,
      testCaseId,
      description,
      inputs,
      expectedOutputs,
      comment,
      requirementNames
    });
    setTestStepDescription("");
    setTestStepInputs("");
    setTestStepExpected("");
    setTestStepComments("");
    setTestStepRequirements("");
    setShowTestStepAdd(false);
  };

  const addTestStep = async (addTestStep) => {
    console.log(JSON.stringify(addTestStep));
    const res = await fetch("https://localhost:44335/api/test-case-step/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addTestStep),
    });

    const groupsInfo = await fetchDocument(testDocId);
    setTestDocument(groupsInfo);
  };

  return (
    <>
      {!loadingForProject ? (
        <Spinner animation="border">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Container fluid className="testDocMainPage">
            <Row>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to={`${"/"}`}>Main Page</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`${"/" + projId + "/main"}`}>{project.name}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{testDocument.name}</Breadcrumb.Item>
              </Breadcrumb>
              <Col sm={8} style={{ height: "100px" }}>
                <Row className="projInfoRow">
                  <Col className="projectTestDesc">
                    <a>{testDocument.description}</a>
                  </Col>
                </Row>
              </Col>
              <Col sm={2}>
                <Button
                  size="lg"
                  variant="info"
                  className="btnReqDoc"
                  onClick={testDocShow}
                >
                  Edit Document Info
                </Button>
              </Col>
              <Col sm={2}>
                <Button
                  size="lg"
                  variant="success"
                  className="btnReqDoc"
                  onClick={testCaseAddOpen}
                >
                  Add Test Case
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Accordion alwaysOpen>
                  {testCases.map((testCase) => (
                    <Accordion.Item eventKey={testCase.id}>
                      <Accordion.Header>{testCase.name}</Accordion.Header>
                      <Accordion.Body style={{ backgroundColor: "#ffe5ba" }}>
                        <Row>
                          <Col sm={10}>
                            {" "}
                            <Table bordered style={{ borderColor: "black" }}>
                              <tbody>
                                <tr>
                                  <td style={{ width: "130px" }}>
                                    Description:
                                  </td>
                                  <td>
                                    <p className="testCaseText">
                                      {testCase.description}
                                    </p>
                                  </td>
                                  <td style={{ width: "135px" }}>
                                    Created Date:
                                  </td>
                                  <td style={{ width: "150px" }}>
                                    <p className="testCaseDate">
                                      {moment(testCase.createdDate).format(
                                        "LL"
                                      )}
                                    </p>
                                  </td>
                                </tr>
                                <tr></tr>
                              </tbody>
                            </Table>
                          </Col>
                          <Col sm={2}>
                            <Button
                              size="lg"
                              variant="success"
                              className="addTestStepBtn"
                              onClick={() => testStepAddOpen(testCase.id)}
                            >
                              Add Test Step
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Number</th>
                                <th>Description</th>
                                <th>Inputs</th>
                                <th>Expected Output</th>
                                <th>Comment</th>
                                <th>Requirements Id's</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
                <div style={{ height: "100px" }}></div>
              </Col>
            </Row>
          </Container>
        </>
      )}

      <EditTestDocumentInfoModel
        showTestDoc={showTestDoc}
        testDocClose={testDocClose}
        onUpdateTestDocument={onUpdateTestDocument}
        setTestDocName={setTestDocName}
        setTestDocDesc={setTestDocDesc}
      ></EditTestDocumentInfoModel>

      <AddTestCaseModel
        showTestCaseAdd={showTestCaseAdd}
        testCaseAddClose={testCaseAddClose}
        onSubmitCase={onSubmitCase}
        setTestName={setTestName}
        setRequirementString={setRequirementString}
        setDesc={setDesc}
      ></AddTestCaseModel>

      <AddTestStepModel
        testCaseInfo = {singleTestCase}
        setFillerTestCaseId = {setFillerTestCaseId}
        showTestStepAdd={showTestStepAdd}
        testStepAddClose={testStepAddClose}
        onSubmitStep={onSubmitStep}
        setTestStepDescription={setTestStepDescription}
        setTestStepInputs={setTestStepInputs}
        setTestStepExpected={setTestStepExpected}
        setTestStepComments={setTestStepComments}
        setTestStepRequirements={setTestStepRequirements}
      ></AddTestStepModel>
    </>
  );
};

export default TestDocumentsPage;
