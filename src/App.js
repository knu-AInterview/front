import { useNavigate, Route, Routes, Link } from "react-router-dom";

import Main from "./pages/Main/Main";
import Login from "./pages/Auth/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Col, Container, Row } from "react-bootstrap";
import SignUp from "./pages/Auth/SignUp";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  // 로그인을 위한 modal
  const [show, setShow] = useState(false);

  const logout = () => {
    axios({
      url: "http://localhost:8080/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8080/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setIsLogin(true);
            setUser(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs>
            <Sidebar style={{ height: "100vh" }} id="sidebar">
              <Menu>
                {isLogin ? (
                  <MenuItem>{`${user.username}님`}</MenuItem>
                ) : (
                  <MenuItem
                    component={<Link to="/login" />}
                    onClick={handleShow}
                  >
                    로그인
                  </MenuItem>
                )}
                <MenuItem component={<Link to="/" />}>홈</MenuItem>
                <SubMenu label="면접" defaultOpen>
                  <MenuItem component={<Link to="/main" />}>
                    AI 면접 보기
                  </MenuItem>
                  <MenuItem>이전 질문 보기</MenuItem>
                  <MenuItem>면접 일정 보기</MenuItem>
                </SubMenu>
                <MenuItem onClick={logout}> 로그아웃 </MenuItem>
              </Menu>
            </Sidebar>
          </Col>
          <Col>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/main" element={<Main />} />
              <Route
                path="/login"
                element={<Login setUser={setUser} setIsLogin={setIsLogin} />}
              />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
