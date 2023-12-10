import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

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
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ResumeItem;
