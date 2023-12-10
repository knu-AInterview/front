import React from "react";
import Accordion from "react-bootstrap/Accordion";

const QnAListViewer = ({ qnaList }) => {
  return (
    <>
      <Accordion className="border-0">
        {qnaList.map((it) => (
          <Accordion.Item key={it.id} eventKey={`${it.id}`}>
            <Accordion.Header>{it.id + ". " + it.question}</Accordion.Header>
            <Accordion.Body>{it.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

QnAListViewer.defaultProps = {
  qnaList: [],
};

export default QnAListViewer;
