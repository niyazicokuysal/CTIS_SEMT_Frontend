import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HomePage.css";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";
import moment from "moment";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const now = 60;

  useEffect(() => {
    const getProjects = async () => {
      const projectsFromServer = await fetchProjects();
      setProjects(projectsFromServer);
    };

    getProjects();
  }, []);

  const addProject = async (project) => {
    console.log(JSON.stringify(project));
    const res = await fetch("https://localhost:44335/api/project/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(project),
    });

    const newProjects = await fetchProjects();
    setProjects(newProjects);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description) {
      alert("Please add the credentials");
      return;
    }

    addProject({ name, description });
    setName("");
    setDesc("");
  };

  const deleteProject = async (id) => {
    await fetch(`https://localhost:44335/api/project/delete?id=${id}`, {
      method: "POST",
    });
    const projectsFromServer = await fetchProjects();
    setProjects(projectsFromServer);
  };

  const fetchProjects = async () => {
    const res = await fetch("https://localhost:44335/api/project/getall");
    const data = await res.json();

    return data;
  };

  return (
    <>
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
              style={{ marginLeft: "20px" }}
              onClick={handleShow}
            >
              Create New Project
            </Button>
          </Col>
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
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => navigate(`${project.id}/main`)}
                    className="tableRow"
                  >
                    <td className="tableCol" style={{ width: "150px" }}>
                      {project.id}
                    </td>
                    <td className="tableCol">{project.name}</td>
                    <td className="tableCol" style={{ width: "150px" }}>
                      12323
                    </td>
                    <td className="tableCol" style={{ width: "430px" }}>
                      {moment(project.createdDate).format("LLLL")}
                    </td>
                    <td
                      className="tableCol"
                      style={{ width: "500px", paddingTop: "12px" }}
                    >
                      <ProgressBar animated now={now} label={`${now}%`} />
                    </td>
                    <td
                      onClick={(e) => e.stopPropagation()}
                      id="deleteColumn"
                      style={{ width: "157px" }}
                    >
                      <Button
                        size="sm"
                        variant="danger"
                        className="btnDelete"
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete the Project
                      </Button>
                    </td>
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

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formCreateProject">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter the name for the Project"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                style={{ height: "200px" }}
                rows="5"
                as="textarea"
                placeholder="Enter the description for the Project"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Add The Project
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HomePage;
