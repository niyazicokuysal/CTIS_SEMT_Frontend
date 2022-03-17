import { Link, useNavigate } from "react-router-dom";
import "./TestDocumentsPage.css";
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

const TestDocumentsPage = () => {

  const [project, setProject] = useState([]);

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
            <Col >
              <h1>Test Documents of {project.name}</h1>
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
        <Col sm={8}></Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  </>
  )
}

export default TestDocumentsPage