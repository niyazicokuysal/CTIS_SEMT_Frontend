import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Container, Nav, NavDropdown, Image } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { Link, useLocation } from "react-router-dom";
import { OffcanvasData } from "./OffcanvasData";

import "./Header.css";

const Header = () => {
  const { pathname } = useLocation()
  const path = pathname.split("/")
  const projId = path[1]

  return (
    <Navbar className="navbar-custom" expand={false}>
      <Container fluid>
        <Navbar.Offcanvas
          style={{width: "330px"}}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
          scroll= "true"
        >
          <Offcanvas.Header closeButton>
            <Link to="inDev" className="header">
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Mehmet Mehmetoğlu
              </Offcanvas.Title>
            </Link>
          </Offcanvas.Header>

          <Offcanvas.Body>
            {projId === ""
              ? OffcanvasData.map((item, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Link
                        to={""}
                        className={`${
                          projId === "" && item.path.includes("home")
                            ? "selected"
                            : "invisible"
                        }`}
                      >
                        <span className="row" >{item.title}</span>
                      </Link>
                    </Nav.Item>
                  );
                })
              : OffcanvasData.map((item, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Link
                        to={`${
                          item.path.includes("home")
                            ? "/"
                            : "/" + projId + "/" + item.path
                        } `}
                        className={`${
                          item.path.includes(item.path) &&
                          pathname.includes(item.path)
                            ? "selected"
                            : ""
                        }`}
                      >
                        <span className="row">{item.title}</span>
                      </Link>
                    </Nav.Item>
                  );
                })}
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Brand>
          <Link to="inDev" className="title">
            Cey Defence Software Engineering Management Tool
          </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
