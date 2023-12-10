import React from "react";
import ResumeItem from "./ResumeItem";
import { Row } from "react-bootstrap";

const ResumeList = ({ resumeList }) => {
  return (
    <>
      <Row md={2} lg={3} xl={4} className="g-3">
        {resumeList.map((it) => (
          <ResumeItem key={it.resumeId} {...it} />
        ))}
      </Row>
    </>
  );
};

ResumeList.defaultProps = {
  resumeList: [],
};

export default ResumeList;
