import React from "react";
import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";

// const NavigationBar = ({ isLogin, userName, logout }) => {
const NavigationBar = () => {
  const expand = false;
  return (
    <Navbar key={expand} expand={expand} className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/" className="m-auto">
          AInterview
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              AInterview
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/page1">AI 면접 보기</Nav.Link>
              <Nav.Link href="/history">면접 히스토리</Nav.Link>
              {/* <NavDropdown
                title="AI 면접"
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                <NavDropdown.Item href="/page1">AI 면접 연습</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/history">
                  면접 기록 보기
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
