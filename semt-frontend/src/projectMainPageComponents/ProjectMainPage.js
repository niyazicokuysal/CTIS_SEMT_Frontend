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
} from "react-bootstrap";

const ProjectMainPage = ({ dummyProject }) => {
  const [project, setProject] = useState([]);

  const { pathname } = useLocation();
  const path = pathname.split("/");
  const projId = path[1];

  const navigate = useNavigate();

  const now = 60;

  



  const documents = [
    {requirementsDocuments: "System Requirements", testDocuments: "System Test Document" },
    {requirementsDocuments: "Software Requirements", testDocuments: "Software Test Document" },
    {requirementsDocuments: "Authentication Requirements", testDocuments: "Authentication Test Document" },
    {requirementsDocuments: "Visual Requirements", testDocuments: "Visual Test Document" },
    {requirementsDocuments: "Non-Functional Requirements", testDocuments: "Non-Functional Test Document" },
  ]

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
              <ProgressBar
                animated
                now={now}
                label={`Validation: ${now}%`}
              />
            </Col>
          </Row>
          <Row className="projInfoRow">
            <Col>
              <a>{project.description}</a>
            </Col>
          </Row>
        </Col>
        <Col sm={2}>
          <Button size="lg" variant="success" className="btnProjectMain">
            Edit Project Info
          </Button>
          <Button size="lg" variant="danger" className="btnProjectMain">
            Edit Project Documentation
          </Button>
          <Button size="lg" variant="info" className="btnProjectMain" onClick={() => navigate("/inDev")}>
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
              <td><Link to={"/inDev"} className="documentRow">{document.requirementsDocuments}</Link></td>
              <td><Link to={"/inDev"} className="documentRow">{document.testDocuments}</Link></td>
              <td><ProgressBar variant="danger" now={now} label={`${now}%`} /></td>
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
  }
};

export default ProjectMainPage;
