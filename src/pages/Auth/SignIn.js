import React, { useContext } from "react";
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
// import "./SignIn.css";
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";
import { AccountFunctionContext } from "../../App";

const SignIn = ({ setIsLogin, setUser, SignInOnRequestClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  // 로그인 시
  const { onLoggedIn } = useContext(AccountFunctionContext);

  // navigae
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleDone = () => {
    axiosInstance({
      url: "http://localhost:8080/api/auth/login",
      method: "POST",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          // window.open("/", "_self");
          onLoggedIn("test");
          console.log("Login Ok!");
          navigate("/");
        }
      })
      .catch((error) => {});
  };

  return (
    // <div class="rounded shadow p-3 mb-5 position-absolute top-50 start-50 translate-middle">
    <>
      <h1 className="text-center p-5">로그인</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Form.Control.Feedback type="invalid">
            이메일 주소를 입력해주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            minLength={"4"}
          />
          <Form.Control.Feedback type="invalid">
            비밀번호는 4글자 이상이어야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        {/* <div className="d-grid gap-2">
          <Button variant="primary" type="submit" onClick={login}>
            Login
          </Button>
        </div> */}
        <div className="buttons text-center p-4">
          <Button
            variant="danger"
            onClick={() => {
              navigate("/");
            }}
          >
            취소
          </Button>{" "}
          <Button variant="success" onClick={handleDone}>
            로그인
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SignIn;
