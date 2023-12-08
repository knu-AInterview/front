import "./global.css";
import "./App.css";
import { useNavigate, Route, Routes, Link } from "react-router-dom";

import Main from "./pages/Main/Main";
import Login from "./pages/Auth/Login";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { Col, Container, Row, Stack } from "react-bootstrap";
import SignUp from "./pages/Auth/SignUp";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home/Home";
import InterviewRecordList from "./components/InterviewRecordList";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Resume from "./pages/Resume";
import Mypage from "./pages/Mypage";
import { Container } from "react-bootstrap";
import SignIn from "./pages/Auth/SignIn";
import MainPage from "./pages/Interview/MainPage";
import FirstPageContent from "./pages/Interview/FirstPageContent";
import SecondPage from "./pages/Interview/SecondPage";
import InterviewRecord from "./pages/InterviewRecord";

// 계정 정보(isLoggedIn, nickName) context
export const AccountStateContext = React.createContext();
// 로그인, 로그아웃 함수 context
export const AccountFunctionContext = React.createContext();

const App = () => {
  // 계정 정보 state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [nickName, setNickName] = useState("test");

  // 로그인 시
  const onLoggedIn = useCallback((nickName) => {
    setIsLoggedIn(true);
    setNickName(nickName);
  }, []);

  // 로그아웃 시
  const onLoggedOut = useCallback(() => {
    setIsLoggedIn(false);
    setNickName("");
  }, []);

  const accountFunction = useMemo(() => {
    return { onLoggedIn, onLoggedOut };
  });

  return (
    <AccountStateContext.Provider value={{ isLoggedIn, nickName }}>
      <AccountFunctionContext.Provider value={accountFunction}>
        <div className="App">
          <div className="gradient__bg">
            <NavigationBar />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/main" element={<Main />} /> */}
                {/* <Route path="/page1" element={<Page1 />} /> */}
                {/* <Route path="/page2" element={<Page2 />} /> */}
                {/* <Route
                path="/interview/record/:active"
                element={<InterviewRecordList />}
              /> */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/resume/list" element={<Mypage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                  path="/interview/requirement"
                  element={<FirstPageContent />}
                />
                <Route path="/interview/interview" element={<SecondPage />} />
                <Route path="/interview/list" element={<InterviewRecord />} />
              </Routes>
            </Container>
          </div>
        </div>
      </AccountFunctionContext.Provider>
    </AccountStateContext.Provider>
  );
};

export default App;
