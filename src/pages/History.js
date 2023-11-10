import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

export const History = () => {
  // job categories
  const [jobArray, setJobArray] = useState([]);
  // dummy
  const dummyJobArray = ["job1", "job2", "job3", "job4", "job5"];

  // get data from back
  const getJobs = async () => {
    await axios
      .get("/api/history")
      .then((res) => {
        setJobArray(res.data);
        console.log.res(jobArray);
      })
      // If failed, ues dummy data now
      .catch((err) => {
        console.log(err);
        setJobArray(dummyJobArray);
      });
  };

  // mount
  useEffect(() => {
    // get job-categories
    getJobs();
  }, []);

  return (
    <div>
      <h1 className="text-center">직군 선택</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4 text-center">
        {jobArray.map((job) => (
          <Col key={job}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="/assets/front.jpg" />
              <Card.Body>
                <Card.Title>{job}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="primary"
                  href={`/history/board?id=-1&job=${job}`}
                >
                  see history
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
