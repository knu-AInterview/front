import React, { useCallback, useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AccountFunctionContext, AccountStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  // 계정 정보 및 함수 프로퍼티
  const { isLoggedIn, nickName } = useContext(AccountStateContext);
  const { onLoggedOut } = useContext(AccountFunctionContext);

  const navigate = useNavigate();

  const logout = useCallback(() => {
    // 로그아웃 통신 코드??
    onLoggedOut();
    navigate("/");
  }, []);

  const onClickAccountRequired = (path) => {
    isLoggedIn ? navigate(path) : alert("로그인이 필요합니다.");
  };

  return (
    <Navbar expand="md" className="bg-success-subtle">
      <Container>
        <Navbar.Brand href="/">AInterview</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">홈</Nav.Link>
            {/* /interview/requirement */}
            <Nav.Link
              onClick={() => {
                onClickAccountRequired("/interview/requirement");
              }}
            >
              AI 면접 보기
            </Nav.Link>
            {/* /resume?mode=write */}
            <Nav.Link
              onClick={() => {
                onClickAccountRequired("/resume?mode=write");
              }}
            >
              이력서 작성
            </Nav.Link>
            {/* /resume/list */}
            <Nav.Link
              onClick={() => {
                onClickAccountRequired("/resume/list");
              }}
            >
              이력서 보기
            </Nav.Link>
            {/* 인터뷰 기록 보기 */}
            <Nav.Link
              onClick={() => {
                onClickAccountRequired("/interview/list");
              }}
            >
              면접 기록 보기
            </Nav.Link>
          </Nav>

          {isLoggedIn ? (
            <>
              {`${nickName}님`}&nbsp;&nbsp;
              <Nav.Link onClick={logout}>로그아웃</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/signin">로그인</Nav.Link>&nbsp;&nbsp;
              <Nav.Link href="/signup">회원가입</Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
