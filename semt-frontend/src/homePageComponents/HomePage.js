import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HomePage.css";
import CreateProjectModal from "./CreateProjectModal";
import { Container, Row, Col, Table, Button, ProgressBar  } from "react-bootstrap";
import moment from "moment";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const now = 60;

   

  useEffect(() => {
    const getProjects = async () => {
      const projectsFromServer = await fetchProjects();
      setProjects(projectsFromServer);
    };

    getProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("https://localhost:44335/api/project/getall");
    const data = await res.json();

    return data;
  };

  return (
    <Container fluid className="containerM">
      <Row>
        <Col sm={8} className="welcome">
          <h1 className="titleHP">Welcome Mehmet Mehmetoğlu</h1>
        </Col>
        <Col sm={4} style={{ textAlign: "end" }}>
        <Button
            size="lg"
            variant="warning"
            onClick={() => navigate("inDev")}
          >
            Manage Users
          </Button>
          <Button
            size="lg"
            variant="success"
            style={{ marginLeft: "20px"}}
            onClick={() => setModalShow(true)}
          >
            Create New Project
          </Button>
        </Col>
        <CreateProjectModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Row>
      <Row>
        <Col sm>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Project Id</th>
                <th>Project Name</th>
                <th>User Count</th>
                <th>Creation Date</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => navigate(`${project.id}/main`)}
                  className="tableRow"
                >
                  <td className="tableCol" style={{ width:"150px"}}>{project.id}</td>
                  <td className="tableCol">{project.name}</td>
                  <td className="tableCol" style={{ width:"150px"}}>12323</td>
                  <td className="tableCol" style={{ width:"320px"}}>{moment(project.createdDate).format("LLLL")}</td>
                  <td className="tableCol" style={{ width:"500px", paddingTop:"12px"}}><ProgressBar animated now={now} label={`${now}%`} /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col sm={6}></Col>
        <Col sm={6}></Col>
      </Row>
    </Container>
  );
};

export default HomePage;
