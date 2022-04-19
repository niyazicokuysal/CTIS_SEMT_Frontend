import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {

  return (
    <Navbar className="navbar-custom" expand={false}>
      <Container fluid>
      <Navbar.Brand><Link to="/login" className="userName">
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
