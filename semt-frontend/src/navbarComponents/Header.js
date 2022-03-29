import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container, Nav, NavDropdown, Image } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Header.css";

const Header = () => {
  const [projectReq, setprojectReq] = useState([]);
  const [projectTest, setProjectTest] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);

  const { pathname } = useLocation()
  const path = pathname.split("/")
  const projId = path[1]
  const docId = path[3];

  console.log(projId);
  
  useEffect(() => {
    const getProjectReq = async () => {
      if (projId !== "") {
        const projectReq = await getProjectDocuments(projId);
        setprojectReq(projectReq)
        const projectTest = await getProjectTestDocuments(projId);
        setProjectTest(projectTest)
      }
    }

    getProjectReq();
    const temp = []
    projectReq.forEach(reqDoc => {
      temp.push({name: reqDoc.typeName, id: reqDoc.id, link: "/" + projId + "/req/" + reqDoc.id})
    });

    projectTest.forEach(reqTest => {
      temp.push({name: reqTest.name, id: reqTest.id, link:"/" + projId + "/test/" + reqTest.id})
    })

    setAllDocuments(temp)


  }, [projId, docId]);

  const getProjectDocuments = async (id) => {
    const res = await fetch(`https://localhost:44335/api/requirement-document/getall?projectId=${id}`);
    const data = await res.json();

    return data;
  };

  const getProjectTestDocuments = async (id) => {
    const res = await fetch(`https://localhost:44335/api/test-document/getall?projectId=${id}`);
    const data = await res.json();

    return data;
  };

  return (
    <Navbar className="navbar-custom" expand={false}>
      <Container fluid>
      <Navbar.Brand><Link to="" className="userName">
            Mehmet Mehmetoğlu
          </Link></Navbar.Brand>
        <Navbar.Brand>
          <Link to="" className="title">
            Cey Defence Software Engineering Management Tool
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
