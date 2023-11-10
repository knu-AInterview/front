import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

const InterviewRecordElement = ({ id, job, question, answer, date }) => {
  const [open, setOpen] = useState(false);

  return (
    <tr>
      <td>{id}</td>
      <td>{job}</td>
      <td>
        {question}{" "}
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="answer"
          aria-expanded={open}
        >
          check answer
        </Button>
        <Collapse in={open}>
          <div id="answer">{answer}</div>
        </Collapse>
      </td>
      <td>{date}</td>
    </tr>
  );
};

export default InterviewRecordElement;
