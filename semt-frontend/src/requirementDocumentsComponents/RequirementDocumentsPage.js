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

  const docClose = () => setDoc(false);
  const docShow = () => setDoc(true);

  const groupClose = () => setGroup(false);
  const groupShow = () => setGroup(true);

  const reqClose = () => setReq(false);
  const reqShow = () => setReq(true);

  const now = 60;

  const onSubmitReq = (e) => {
    e.preventDefault();

    if (!reqComment || !reqDesc || !docName || !docDescription || !reqGrp || !reqType) {
      alert("Please add the credentials");
      return;
    }

    setReqComment("");
    setReqDesc("");
    setReqGrp("");
    setReqType("");
    docClose(false);
  };

  const onSubmitDocument = (e) => {
    e.preventDefault();

    if (!docName || !docDescription ) {
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

    setGroup("");
    docClose(false);
  };

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
              <Col sm={5}>
                <h1>System Requirements Documents of {project.name}</h1>
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
              className="btnReqDoc" onClick={groupShow}
            >
              Add Requirements Group
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>Req Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Comment</th>
                  <th>Test Types</th>
                  <th>Created Date</th>
                  <th>Updated Date</th>
                  <th>Is Verified</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                </tr>
                <tr className="header">
                  <td colSpan="9">ASDFASDF</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
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

            <Form.Select aria-label="Default select example">
              <option>Type</option>
              <option value="1">Inspection</option>
              <option value="2">Demonstration</option>
              <option value="3">Test</option>
              <option value="4">Analysis</option>
              <option value="5">Certification</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Group</option>
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

    </>
  );
};

export default RequirementDocumentsPage;
