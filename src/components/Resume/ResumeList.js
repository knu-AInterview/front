import React from "react";
import ResumeItem from "./ResumeItem";
import { Row } from "react-bootstrap";

const ResumeList = ({ userId, resumeList }) => {
  return (
    <div>
      <h3 className="text-center">이력서 목록</h3>
      <hr className="p-2" />
      <div>
        <Row md={2} lg={3} xl={4} className="g-3">
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
