import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavigationBar = ({ isLogin, userName, logout }) => {
  return (
    <Navbar expand="md" className="bg-success-subtle">
      <Container>
        <Navbar.Brand href="/">AInterview</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">홈</Nav.Link>
            <Nav.Link href="/main">AI 면접 보기</Nav.Link>
            <Nav.Link href="/resume?mode=write">이력서 작성</Nav.Link>
            <Nav.Link href="/user/11">이력서 보기</Nav.Link>
          </Nav>

          <Nav.Link href="user/11">{`test님`}</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
