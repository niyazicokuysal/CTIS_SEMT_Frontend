import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import './Header.css'

const Header = () => {
  return (
    <Navbar className='navbar-custom' expand={false}>
      <Container fluid>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
            </Nav>
          </Offcanvas.Body>

        </Navbar.Offcanvas>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Brand className='title'>Cey Defence Software Engineering Management Tool</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default Header
