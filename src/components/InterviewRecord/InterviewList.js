import React from "react";
import InterviewItem from "./InterviewItem";
import { Row } from "react-bootstrap";

const InterviewList = ({ interviewList }) => {
  return (
    <>
      <Row md={2} lg={3} xl={4} className="g-3">
        {interviewList.map((it) => (
          <InterviewItem key={it.interviewId} {...it} />
        ))}
      </Row>
    </>
  );
};

InterviewItem.defaultProps = {
  interviewList: [],
};

export default InterviewList;
