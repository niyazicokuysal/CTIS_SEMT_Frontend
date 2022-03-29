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
        <Navbar.Offcanvas
          style={{ width: "330px" }}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          scroll="true"
        >
          <Offcanvas.Header closeButton>
            <Link to="inDev" className="header">
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Mehmet Mehmetoğlu
              </Offcanvas.Title>
            </Link>
          </Offcanvas.Header>


          <Offcanvas.Body>
            <Nav.Item key={0}>
              <Link
                to={""}
                className={`${projId === ""
                  ? "selected"
                  : ""
                  }`}
              >
                <span className="row" >Home</span>
              </Link>
            </Nav.Item>
            {console.log(allDocuments)}
            {projId === ""
              ? null
              :  <Nav.Item key={10000000000000000000}> <Link
              to={"/" + projId + "/main"}
              className={`${pathname.includes("main")
                ? "selected"
                : ""
                }`}
            >
              <span className="row" >Main</span>
            </Link>
            </Nav.Item>
            }
            {projId === ""
              ? null
              : projectReq.map((item, index) => {
                return (
                  <Nav.Item key={index}>
                    <Link
                      to={`${"/" + projId + "/req/" + item.id}`}
                      className={`${pathname.includes(item.id) &&  pathname.includes("req")
                          ? "selected"
                          : ""
                        }`}
                    >
                      <span className="row">{item.typeName}</span>
                    </Link>
                  </Nav.Item>
                );
              })}
              {projId === ""
              ? null
              : projectTest.map((item, index) => {
                return (
                  <Nav.Item key={index+10000}>
                    <Link
                      to={`${"/" + projId + "/test/" + item.id} `}
                      className={`${pathname.includes(item.id) &&  pathname.includes("test")
                          ? "selected"
                          : ""
                        }`}
                    >
                      <span className="row">{item.name}</span>
                    </Link>
                  </Nav.Item>
                );
              })}
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
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
