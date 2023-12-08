import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InterviewItem = ({ interviewId, interviewTitle }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card style={{ width: "16rem", height: "8rem" }}>
        <Card.Body className="text-center">
          <Card.Text>{interviewTitle}</Card.Text>

          <Button
            variant="outline-primary"
            onClick={() => {
              navigate(`/interview/${interviewId}`);
            }}
          >
            보기
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default InterviewItem;
