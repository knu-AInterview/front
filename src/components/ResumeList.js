import React from "react";
import ResumeItem from "./ResumeItem";
import { Row } from "react-bootstrap";

const ResumeList = ({ userId, resumeList }) => {
  return (
    <div>
      <h2>이력서 목록</h2>
      <h4>{resumeList.length}개의 이력서가 있습니다.</h4>
      <div>
        <Row md={1} lg={2} xl={3} className="g-4">
          {resumeList.map((it) => (
            <ResumeItem key={it.resumeId} userId={userId} {...it} />
          ))}
        </Row>
      </div>
    </div>
  );
};

ResumeList.defaultProps = {
  resumeList: [],
};

export default ResumeList;
