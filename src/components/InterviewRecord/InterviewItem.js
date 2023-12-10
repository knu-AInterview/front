import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InterviewItem = ({ interviewId, interviewTitle }) => {
  const navigate = useNavigate();

  return (
    <Col key={interviewId}>
      <Card style={{ width: "16rem", height: "8rem" }}>
        <Card.Body className="text-center">
          <Card.Text>{interviewTitle}</Card.Text>

          <Button
            variant="outline-primary"
            onClick={() => {
              navigate(`/interview/qna/${interviewId}`);
            }}
          >
            보기
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default InterviewItem;
