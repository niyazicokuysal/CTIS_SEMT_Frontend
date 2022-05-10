import React from "react";
import "./LandingPage.css";
import {
  Container,
  Navbar,
  Button,
  Form,
} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="loginBackGround">
      <Container className="loginContainer" >
        <h1 className="title1">Welcome to</h1>
        <h4 className="title2">
          Cey Defence Software Engineering Management Tool
        </h4>

        <Button variant="warning" className="btnLogin" onClick={() => navigate("/")}>
          Start Application
        </Button>
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

export default LandingPage;
