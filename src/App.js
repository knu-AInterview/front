// import "./global.css";
// import "./App.css";
import { Route, Routes } from "react-router-dom";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import SignUp from "./pages/Auth/SignUp";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home/Home";

import Resume from "./pages/Resume";
import Mypage from "./pages/Mypage";
import { Container } from "react-bootstrap";
import SignIn from "./pages/Auth/SignIn";
import FirstPageContent from "./pages/Interview/FirstPageContent";
import SecondPage from "./pages/Interview/SecondPage";
import InterviewRecord from "./pages/InterviewRecord";
import QnAList from "./pages/QnAList";

// 계정 정보(isLoggedIn, nickName) context
export const AccountStateContext = React.createContext();
// 로그인, 로그아웃 함수 context
export const AccountFunctionContext = React.createContext();

const App = () => {
  // 계정 정보 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickName, setNickName] = useState("");

  // 로그인 시
  const onLoggedIn = useCallback((nickName) => {
    setIsLoggedIn(true);
    localStorage.setItem(
      "account",
      JSON.stringify({ isLoggedIn: true, nickName: nickName })
    );
  }, []);

  // 로그아웃 시
  const onLoggedOut = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.setItem(
      "account",
      JSON.stringify({ isLoggedIn: false, nickName: "" })
    );
  }, []);

  const accountFunction = useMemo(() => {
    return { onLoggedIn, onLoggedOut };
  }, []);

  useEffect(() => {
    try {
      const account = JSON.parse(localStorage.getItem("account"));
      setIsLoggedIn(account.isLoggedIn);
      setNickName(account.nickName);
    } catch (error) {
      return;
    }
  }, [isLoggedIn, nickName]);

  return (
    <AccountStateContext.Provider value={{ isLoggedIn, nickName }}>
      <AccountFunctionContext.Provider value={accountFunction}>
        <div className="App gradient__bg">
          <NavigationBar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* 이력서 */}
              <Route path="/resume" element={<Resume />} />
              <Route path="/resume/list" element={<Mypage />} />
              {/* 계정 */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              {/* 면접 */}
              <Route
                path="/interview/requirement"
                element={<FirstPageContent />}
              />
              <Route path="/interview/interview" element={<SecondPage />} />
              {/* 면접 기록 */}
              <Route path="/interview/list" element={<InterviewRecord />} />
              <Route path="interview/qna/:interviewId" element={<QnAList />} />
            </Routes>
          </Container>
        </div>
      </AccountFunctionContext.Provider>
    </AccountStateContext.Provider>
  );
};

export default App;
