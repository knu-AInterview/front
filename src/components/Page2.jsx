import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Page2() {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state?.data;
  const [data, setData] = useState([]);
  const [toggledIndices, setToggledIndices] = useState([]);
  console.log(receivedData);
  setData(receivedData);
  setToggledIndices(new Array(data.length).fill(false));

  const handleGoBack = () => {
    navigate(-1, { state: { data: receivedData } });
  };

  const toggleVisibility = (index) => {
    setToggledIndices((prevToggledIndices) => {
      const newToggledIndices = [...prevToggledIndices];
      newToggledIndices[index] = !newToggledIndices[index];
      return newToggledIndices;
    });
  };

  return (
    <div>
      <h1>Page 2</h1>
      <Table>
        <thead>
          <tr>
            <th>Anticipated Questions</th>
            <th>Answer</th>
            <th>Show / Hide</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr key={index}>
              <td>{element.question}</td>
              <td>
                {toggledIndices[index] ? (
                  <span>{element.answer}</span>
                ) : (
                  <span>HIDDEN</span>
                )}
              </td>
              <td>
                <Button onClick={() => toggleVisibility(index)}>
                  {toggledIndices[index] ? "Hide" : "Show"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleGoBack}>뒤로 가기</Button>
      <Link to="/">
        <Button>Done!</Button>
      </Link>
    </div>
  );
}

export default Page2;
