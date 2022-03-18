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

  const testCaseAddClose = () => setShowTestCaseAdd(false);
  const testCaseAddOpen = () => setShowTestCaseAdd(true);

  const now = 60;

  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];

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

  return (
    <>
      <Container fluid className="reqDocMainPage">
        <Row>
          <Col sm={10} style={{ height: "200px" }}>
            <Row className="projInfoRow">
              <Col>
                <h1>
                  {`System Test Documents of ${project.name}`.length > 65
                    ? `System Test Documents of ${project.name}`
                        .slice(0, 62)
                        .concat("...")
                    : `System Test Documents of ${project.name}`}
                </h1>
              </Col>
            </Row>
            <Row className="projInfoRow">
              <Col>
                <a>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse.
                </a>
              </Col>
            </Row>
          </Col>
          <Col sm={2}>
            <Button
              size="lg"
              variant="success"
              className="btnReqDoc"
              // onClick={handleShow}
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
          <Form //onSubmit={onSubmitGroup}
          >
            <Form.Group className="mb-3" controlId="">
            <Form.Label>Name of the Case</Form.Label>
              <Form.Control
                //onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter a name for the Case"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
            <Form.Label>Requirement(s) that been Tested</Form.Label>
              <Form.Control
                //onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter requirement name(s)"
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
    </>
  );
};

export default TestDocumentsPage;
