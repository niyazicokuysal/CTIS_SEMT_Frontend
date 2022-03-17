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
              <Col sm={5}>
                <h1>
                  {`System Requirements Documents of ${project.name}`.length >
                  50
                    ? `System Requirements Documents of ${project.name}`
                        .slice(0, 50)
                        .concat("...")
                    : `System Requirements Documents of ${project.name}`}
                </h1>
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
              // onClick={handleShow}
            >
              Edit Document Info
            </Button>
            <Button
              size="lg"
              variant="danger"
              className="btnReqDoc" //onClick={docShow}
            >
              Add Requirement in Document
            </Button>
            <Button
              size="lg"
              variant="info"
              className="btnReqDoc" //onClick={docShow}
            >
              Add Requirements Group
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table hover bordered className="reqTable">
              <thead>
                <tr>
                  <th style={{ width: "140px" }}>Req Id</th>
                  <th>Description</th>
                  <th style={{ width: "170px" }}>Test Types</th>
                  <th style={{ width: "120px" }}>Is Verified</th>
                  <th style={{ width: "118px" }}>View Details</th>
                  <th style={{ width: "118px" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td 
                   className={`${
                    true === true
                      ? "trueRow"
                      : "falseRow"
                  }`}
                  >Yes</td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="btnTable" //onClick={docShow}
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      className="btnTable" //onClick={docShow}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr className="header">
                  <td colSpan="6">ASDFASDF</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RequirementDocumentsPage;
