import { Link, useNavigate } from "react-router-dom";
import "./TestDocumentsPage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import EditTestDocumentInfoModel from "./EditTestDocumentInfoModel";
import AddTestCaseModel from "./AddTestCaseModel";
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

  const [testDocName, setTestDocName] = useState("");
  const [testDocDesc, setTestDocDesc] = useState("");

  const [testName, setTestName] = useState("");
  const [description, setDesc] = useState("");
  const [requirementString, setRequirementString] = useState("");

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
                          <Col sm={11}>
                            {" "}
                            <Table bordered style={{ borderColor: "black" }}>
                              <tbody>
                                <tr>
                                  <td>Description:</td>
                                  <td>
                                    <p className="testCaseText">
                                      {testCase.description}
                                    </p>
                                  </td>
                                  <td>Created Date:</td>
                                  <td>
                                    <p className="testCaseDate">
                                      {moment(testCase.createdDate).format(
                                        "LLLL"
                                      )}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ width: "140px" }}>
                                    Requirements:
                                  </td>
                                  <td>
                                    <p className="testCaseText">
                                      {testCase.requirementTestCases}
                                    </p>
                                  </td>
                                  <td style={{ width: "150px" }}>
                                    Updated Date:
                                  </td>
                                  <td style={{ width: "310px" }}>
                                    <p className="testCaseDate">
                                      {testCase.updatedDate === null
                                        ? "Not Yet Modified"
                                        : moment(testCase.updatedDate).format(
                                            "LLLL"
                                          )}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                          <Col sm={1}>
                            <Button
                              size="lg"
                              variant="success"
                              className="addTestStepBtn"
                            >
                              Add Test Step
                            </Button>
                          </Col>
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
    </>
  );
};

export default TestDocumentsPage;
