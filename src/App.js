import { useNavigate, Route, Routes, Link } from "react-router-dom";

import Main from "./pages/Main/Main";
import Login from "./pages/Auth/Login";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Col, Container, Row, Stack } from "react-bootstrap";
import SignUp from "./pages/Auth/SignUp";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home/Home";
import InterviewRecordList from "./components/InterviewRecordList";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import { History } from "./pages/History";
import { Container } from "react-bootstrap";

const App = () => {
  // const [isLogin, setIsLogin] = useState(false);
  // const [user, setUser] = useState({});

  // const logout = () => {
  //   axios({
  //     url: "http://localhost:8080/logout",
  //     method: "POST",
  //     withCredentials: true,
  //   }).then((result) => {
  //     if (result.status === 200) {
  //       window.open("/", "_self");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   try {
  //     axios({
  //       url: "http://localhost:8080/login/success",
  //       method: "GET",
  //       withCredentials: true,
  //     })
  //       .then((result) => {
  //         if (result.data) {
  //           setIsLogin(true);
  //           setUser(result.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <div className="App">
      <NavigationBar />
      <Container className="m-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          {/* <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
                setIsLogin={setIsLogin}
                logout={logout}
              />
            }
          /> */}
          <Route path="/history" element={<History />} />
          <Route path="/history/board" element={<InterviewRecordList />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
