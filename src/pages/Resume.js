import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, Row, Col, Button, ButtonGroup } from "react-bootstrap";

const Resume = () => {
  // mode에 따라 작성, 읽기, 수정
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const resumeId = searchParams.get("resumeId");
  const userId = searchParams.get("userId");

  // 희망 직무, 자기 소개
  const [resume, setResume] = useState({
    title: new Date().toLocaleString(),
    desiredJob: "",
    introduce: "",
  });

  const handleChangeResume = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
  };

  const defaultCareerElement = {
    companyName: "",
    work: "",
  };

  // 경력 (직장명, 직무)
  const [career, setCareer] = useState([
    {
      companyName: "",
      work: "",
    },
  ]);

  const addCareer = () => {
    if (career.length < 10) {
      setCareer(career.concat({ ...defaultCareerElement }));
    }
  };

  const deleteCareer = () => {
    if (career.length > 1) {
      setCareer(career.slice(0, -1));
    }
  };

  const handleChangeCareer = (e, idx) => {
    const newCareer = [...career];
    newCareer[idx] = { ...newCareer[idx], [e.target.name]: e.target.value };
    setCareer(newCareer);
  };

  // 서버로부터 데이터 받아오기
  const getResumeData = async () => {
    const res = await fetch(``);
  };

  const handleSubmit = () => {};

  console.log("resume: ", resume);
  console.log("career:", career);

  return (
    <div>
      <h1>이력서</h1>
      <Form>
        <fieldset disabled={mode === "view" ? true : false}>
          {/* 경력 (직장 이름, 직무) */}
          {career.map((ele, idx) => (
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
              key={idx}
            >
              <Form.Label column sm={2}>
                {idx === 0 ? "경력" : ""}
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  name="companyName"
                  value={ele.companyName}
                  onChange={(e) => handleChangeCareer(e, idx)}
                  placeholder={`직장 이름 ${idx + 1}`}
                />
              </Col>
              <Col sm={5}>
                <Form.Control
                  name="work"
                  value={ele.job}
                  onChange={(e) => handleChangeCareer(e, idx)}
                  placeholder={`직무 ${idx + 1}`}
                />
              </Col>
            </Form.Group>
          ))}
          <Row>
            <Col className="mb-3" sm={{ span: 10, offset: 2 }}>
              <ButtonGroup>
                <Button variant="outline-secondary" onClick={addCareer}>
                  추가
                </Button>
                <Button variant="outline-secondary" onClick={deleteCareer}>
                  삭제
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          {/* 희망 직무 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              희망 직무
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="desiredJob"
                value={resume.desiredJob}
                onChange={handleChangeResume}
                placeholder="지원하고자 하는 직무"
              />
            </Col>
          </Form.Group>
          {/* 기술적인 자기소개 3-4줄 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              자기소개
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="introduce"
                value={resume.introduce}
                onChange={handleChangeResume}
                as="textarea"
                placeholder="기술적인 자기소개 (3~4 줄)"
              />
            </Col>
          </Form.Group>
        </fieldset>
        {/* 저장 또는 수정 */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            {mode === "write" || mode === "edit" ? (
              <Button type="submit">저장</Button>
            ) : mode === "view" ? (
              <Button variant="secondary">수정</Button>
            ) : (
              <></>
            )}
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Resume;
