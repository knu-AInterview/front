import React from "react";
import InterviewItem from "./InterviewItem";

const InterviewList = ({ interviewList }) => {
  return (
    <div>
      {interviewList.map((it) => (
        <InterviewItem key={it.id} {...it} />
      ))}
    </div>
  );
};

InterviewItem.defaultProps = {
  interviewList: [],
};

export default InterviewList;
