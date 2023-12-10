import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";

const ResumeAddableInput = ({ title, placeholder, getState, initState }) => {
  const [state, setState] = useState([""]);

  const addState = useCallback(() => {
    state.length < 10 && setState([...state, ""]);
  }, [state]);

  const deleteState = useCallback(() => {
    state.length > 1 && setState(state.slice(0, -1));
  }, [state]);

  const handleChangeState = useCallback(
    (e, idx) => {
      const newState = [...state];
      newState[idx] = e.target.value;
      setState(newState);
    },
    [state]
  );

  useEffect(() => {
    initState.length !== 0 && setState(initState);
  }, [initState]);

  useEffect(() => {
    getState(state);
  }, [state, getState]);

  return (
    <div>
      {state.map((ele, idx) => (
        <Form.Group as={Row} className="mb-3" key={idx}>
          <Form.Label column sm={2}>
            {idx === 0 && title}
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              value={ele}
              onChange={(e) => handleChangeState(e, idx)}
              placeholder={placeholder}
            />
          </Col>
        </Form.Group>
      ))}
      <Row>
        <Col className="mb-3" sm={{ span: 10, offset: 2 }}>
          <ButtonGroup>
            <Button variant="success" onClick={addState}>
              추가
            </Button>
            <Button variant="danger" onClick={deleteState}>
              삭제
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ResumeAddableInput;
