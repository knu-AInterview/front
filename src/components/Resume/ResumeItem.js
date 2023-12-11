import React, { useContext } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../pages/Interview/axiosInstance";
import { ResumeFunctionContext } from "../../pages/Mypage";

const ResumeItem = ({ resumeId, title }) => {
  const navigate = useNavigate();

  // 이력서 보기 또는 수정으로 이동
  const navigateToResume = (mode) => {
    navigate({
      pathname: "/resume",
      search: createSearchParams({
        resumeId: resumeId,
        mode: mode,
      }).toString(),
    });
  };

  // 삭제 버튼
  const onClickDelete = () => {
    if (window.confirm(`삭제하시겠습니까?`) === true) {
      axiosInstance
        .delete(`http://localhost:8080/api/member/resume/${resumeId}`)
        .then((res) => {
          alert("삭제하였습니다.");
          window.location.reload();
        })
        .catch(() => {
          alert("삭제 실패");
        });
    }
  };

  return (
    <Col key={resumeId}>
      <Card style={{ width: "16rem", height: "8rem" }}>
        <Card.Body className="text-center">
          <Card.Text>{title}</Card.Text>
          <Button
            variant="outline-primary"
            onClick={() => navigateToResume("view")}
          >
            보기
          </Button>
          {` `}
          <Button
            variant="outline-secondary"
            onClick={() => navigateToResume("edit")}
          >
            수정
          </Button>{" "}
          <Button variant="outline-danger" onClick={onClickDelete}>
            삭제
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ResumeItem;
