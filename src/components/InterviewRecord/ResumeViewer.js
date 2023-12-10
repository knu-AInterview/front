import React, { useRef } from "react";
import Card from "react-bootstrap/Card";

const ResumeViewer = ({ title, career, award, language, introduction }) => {
  return (
    <>
      <Card>
        {/* 제목 */}
        <Card.Header className="border-0 fs-4">{title}</Card.Header>
        <Card.Body>
          {/* 경력 */}
          <Card.Title>
            <b>경력</b>
          </Card.Title>
          <hr />
          {career.map((it) => (
            <Card.Text id={it.idx}>{it}</Card.Text>
          ))}
          <br />
          {/* 수상 이력 */}
          <Card.Title>
            <b>수상 이력</b>
          </Card.Title>
          <hr />
          {award.map((it) => (
            <Card.Text id={it.idx}>{it}</Card.Text>
          ))}
          <br />
          {/* 사용 언어 */}
          <Card.Title>
            <b>사용 언어</b>
          </Card.Title>
          <hr />
          <Card.Text>{language}</Card.Text>
          <br />
          {/* 자기 소개 */}
          <Card.Title>
            <b>자기 소개</b>
          </Card.Title>
          <hr />
          <Card.Text>
            <p>{introduction}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ResumeViewer;
