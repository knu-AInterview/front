import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import ResumeAddableInput from "../components/Resume/ResumeAddableInput";
import axiosInstance from "./Auth/axiosInstance";

const Resume = () => {
  // mode에 따라 작성, 읽기, 수정
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const resumeId = searchParams.get("resumeId");

  const navigate = useNavigate();

  // 추가 및 수정이 없는 항목: 제목, 사용 언어, 자기소개
  const [notAddableItem, setNotAddableItem] = useState({
    title: "",
    introduction: "",
    language: "",
  });

  const handleChangeNotAddableItem = (e) => {
    setNotAddableItem({
      ...notAddableItem,
      [e.target.name]: e.target.value,
    });
  };

  // 추가 및 수정이 있는 항목
  // 경력
  const [career, setCareer] = useState([""]);
  const getCareer = (state) => setCareer(state);
  const [initCareer, setInitCareer] = useState([]);
  // 수상 이력
  const [award, setAward] = useState([""]);
  const getAward = (state) => setAward(state);
  const [initAward, setInitAward] = useState([]);

  // 서버로부터 데이터 받아오기
  const getResumeData = async () => {
    const res = await axiosInstance(
      `http://localhost:8080/api/member/resume/${resumeId}`,
      {
        method: "GET",
        // body: JSON.stringify({ mode: mode }),
      }
    )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        // return dummyResumeData;
        alert("이력서 가져오기 실패");
      });

    try {
      setNotAddableItem({
        title: res.title,
        language: res.language,
        introduction: res.introduction,
      });
      setCareer(res.career);
      setAward(res.award);
      setInitCareer(res.career);
      setInitAward(res.award);
    } catch (error) {
      return;
    }
  };

  // 수정 버튼 클릭
  const onClickEdit = () => {
    // setSearchParams({ userId: userId, resumeId: resumeId, mode: "edit" });
    setSearchParams({ resumeId: resumeId, mode: "edit" });
  };

  // 저장 버튼 클릭
  const handleSubmit = () => {
    const resumeData = {
      ...notAddableItem,
      career: career,
      award: award,
      resumeId: resumeId, // resume id (null if wrtie mode)
    };

    axiosInstance({
      url:
        mode === "write"
          ? "http://localhost:8080/api/resume"
          : mode === "edit"
          ? `http://localhost:8080/api/member/resume/${resumeId}`
          : null,
      method: mode === "write" ? "POST" : mode === "edit" ? "PUT" : null,
      withCredentials: true,
      data: resumeData,
    }).then((res) => {
      if (res.status === 200) {
        alert("저장 완료");
        setSearchParams({ mode: "view" });
      } else {
        alert("저장 실패");
      }
    });
  };

  // 삭제 버튼
  const onClickDelete = () => {
    if (window.confirm(`삭제하시겠습니까?`) === true) {
      axiosInstance
        .delete(`http://localhost:8080/api/member/resume/${resumeId}`)
        .then((res) => {
          alert("삭제하였습니다.");
          navigate("/resume/list");
        })
        .catch(() => {
          alert("삭제 실패");
        });
    }
  };

  useEffect(() => {
    if (mode === "view" || mode === "edit") {
      getResumeData();
    }
  }, []);

  useEffect(() => {
    if (mode === "write") {
      setNotAddableItem({
        title: "",
        introduction: "",
        language: "",
      });
      setCareer([""]);
      setAward([""]);
      setInitCareer([]);
      setInitAward([]);
    }
  }, [mode]);

  return (
    <>
      <h1 className="text-center p-5">
        이력서 {mode === "write" ? "작성" : mode === "edit" ? "수정" : "보기"}
      </h1>

      <Form>
        <fieldset disabled={mode === "view" ? true : false}>
          {/* 제목 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              이력서 제목
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="title"
                value={notAddableItem.title}
                onChange={handleChangeNotAddableItem}
                placeholder="이력서의 제목"
              />
            </Col>
          </Form.Group>
          {/* 경력 */}
          <ResumeAddableInput
            title={"경력"}
            placeholder={"예시) A회사에서 n년 동안 xxx 서비스 개발"}
            getState={getCareer}
            initState={initCareer}
            mode={mode}
          />
          {/* 수상 이력 */}
          <ResumeAddableInput
            title={"수상 이력"}
            placeholder={"예시) B 경진대회 x 상"}
            getState={getAward}
            initState={initAward}
            mode={mode}
          />

          {/* 사용 언어 */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              사용 언어
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                name="language"
                value={notAddableItem.language}
                onChange={handleChangeNotAddableItem}
                placeholder="예시) C, python 등"
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
                name="introduction"
                value={notAddableItem.introduction}
                onChange={handleChangeNotAddableItem}
                as="textarea"
                placeholder="기술적인 자기소개 (3~4 줄)"
                rows={6}
              />
            </Col>
          </Form.Group>
        </fieldset>
        {/* 저장 또는 수정 */}
        <Form.Group as={Row} className="p-3">
          <Col sm={{ span: 10, offset: 2 }}>
            {mode === "write" ? (
              <>
                <Button onClick={handleSubmit}>저장</Button>
              </>
            ) : mode === "edit" ? (
              <>
                <Button variant="primary" onClick={handleSubmit}>
                  저장
                </Button>{" "}
                <Button variant="danger" onClick={onClickDelete}>
                  삭제
                </Button>{" "}
                <Button
                  variant="secondary"
                  onClick={() => navigate("/resume/list")}
                >
                  목록으로
                </Button>
              </>
            ) : mode === "view" ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/resume/list")}
                >
                  목록으로
                </Button>{" "}
                {resumeId !== null && (
                  <>
                    <Button variant="primary" onClick={onClickEdit}>
                      수정
                    </Button>{" "}
                    <Button variant="danger" onClick={onClickDelete}>
                      삭제
                    </Button>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default Resume;
