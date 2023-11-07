import { useNavigate, Route, Routes, Link } from "react-router-dom";

import Main from "./pages/Main/Main";
import Login from "./pages/Auth/Login";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { Col, Container, Row, Stack } from "react-bootstrap";
import SignUp from "./pages/Auth/SignUp";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home/Home";
import InterviewRecordList from "./components/InterviewRecordList";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";

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

  return (
    <div className="App">
      <NavigationBar isLogin={isLogin} userName={user.username} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route
          path="/login"
          element={
            <Login setUser={setUser} setIsLogin={setIsLogin} logout={logout} />
          }
        />
        <Route
          path="/interview/record/:active"
          element={<InterviewRecordList />}
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
