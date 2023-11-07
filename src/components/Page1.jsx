// Page1.js
// import React from 'react';

import React, { useState } from "react";
// import "./App.css";
import Example from "./Example";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table, Button, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function Page1() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/"); // 뒤로 가기
  };
  const [job, setJob] = useState("");
  const [requirement, setRequirement] = useState("");
  const [level, setlevel] = useState(null); // Example 컴포넌트에서 선택한 난이도 상태
  const [loading, setLoading] = useState(false);

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  const handleRequirementChange = (e) => {
    setRequirement(e.target.value);
  };

  const handleNext = () => {
    setLoading(true); // 요청 시작 시 로딩 상태 활성화

    // 데이터를 객체로 만들기
    const dataToSend = {
      job: job,
      requirement: requirement,
      level: level,
    };

    console.log(typeof job);
    console.log(typeof requirement);
    console.log(typeof level);
    // 서버로 데이터 보내기
    axios
      .post("/api/saveData", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoading(false); // 로딩 상태 비활성화
        console.log("데이터가 서버에 전송되었습니다.");
        // 이후 페이지 전환 또는 다른 작업 수행
        navigate("/page2", { state: response.data }); // 데이터와 함께 페이지 전환
      })
      .catch((error) => {
        console.error("데이터 전송 중 오류가 발생했습니다:", error);
      });
  };

  return (
    <div>
      <h1>Page 1</h1>
      <FormGroup>
        <Label for="jobSelect">Job</Label>
        <Input
          type="select"
          name="job"
          id="jobSelect"
          value={job}
          onChange={handleJobChange}
        >
          <option value="">Please select.</option>
          <option value="Front-end Developer">Front-end Developer</option>
          <option value="Back-end Developer">Back-end Developer</option>
          <option value="AI Researcher">AI Researcher</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="requirementInput">Requirement</Label>
        <Input
          type="text"
          name="requirement"
          id="requirementInput"
          value={requirement}
          onChange={handleRequirementChange}
        />
      </FormGroup>
      <Example level={level} setlevel={setlevel} />
      <Button onClick={handleGoBack}>이전</Button>
      <Button onClick={handleNext}>다음</Button>
    </div>
  );
}

export default Page1;
