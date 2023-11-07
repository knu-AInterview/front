import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passowrdConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");

  const [validated, setValidated] = useState(false);

  // 이메일 중복 확인
  const isUniqueEamil = (email) => {};
  // const validateEmail = (email) => {
  //   return email
  //     .toLowerCase()
  //     .match(
  //       /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  //     );
  // };

  // 비밀번호 유효성 확인
  const validPassword = (password) => {};

  // 비밀번호와 비밀번호확인이 일치 하는지 확인
  const ispasswordSame = (password, passowrdConfirm) => {
    return password === passowrdConfirm ? "valid" : "invalid";
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <h1>회원 가입</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="예) email@aiinterview.com"
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
            placeholder="4글자 이상의 영문 대소문자, 숫자, 특수문자 조합"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            minLength={"4"}
            required
          />
          <Form.Control.Feedback type="invalid">
            비밀번호는 4글자 이상이어야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="4글자 이상의 영문 대소문자, 숫자, 특수문자 조합"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passowrdConfirm}
            minLength={"4"}
            required
          />
          <Form.Control.Feedback type="invalid">
            비밀번호는 4글자 이상이어야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>닉네임</Form.Label>
          <Form.Control
            type="text"
            placeholder="3글자 이상의 조합"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            minLength={"3"}
            required
          />
          <Form.Control.Feedback type="invalid">
            닉네임은 3글자 이상이어야 합니다.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;