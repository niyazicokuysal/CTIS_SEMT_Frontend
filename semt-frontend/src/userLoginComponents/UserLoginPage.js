import React from "react";
import "./UserLoginPage.css";
import {
  Container,
  Navbar,
  Button,
  Form,
} from "react-bootstrap";

const UserLoginPage = () => {

  return (
    <div className="loginBackGround">
      <Container className="loginContainer">
        <h1 className="title1">Welcome to</h1>
        <h4 className="title2">
          Cey Defence Software Engineering Management Tool
        </h4>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>

      <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom">
        <Container>
          <Navbar.Brand href="http://www.ctis.bilkent.edu.tr/ctis_seniorProject.php?semester=28&id=4978">
            A Senior Project by Teletubbies - Fuatcan Akdağ, Niyazi Berkay
            Çokuysal, Demir Kösterit, Aytuğ Berk Şengül{" "}
          </Navbar.Brand>
          <Navbar.Brand>2022 CTIS</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default UserLoginPage;
