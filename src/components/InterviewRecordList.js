import React, { useEffect, useState } from "react";
import InterviewRecordElement from "./InterviewRecordElement";
import { Table } from "react-bootstrap";
import Paginate from "./Paginate";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const InterviewRecordList = () => {
  // paginagion
  const { active } = useParams(); // 현재 페이지
  const lastPageNo = 10; // 총 페이지 수
  // Query String
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const job = searchParams.get("job");
  // 질문 및 답변
  const [qaList, setQaList] = useState([]);
  // dummy
  const dummyQaList = [
    {
      id: 10,
      job: "job10",
      question: "question10",
      answer: "answer10",
      date: "2023-11-10",
    },
    {
      id: 9,
      job: "job9",
      question: "question9",
      answer: "answer9",
      date: "2023-11-09",
    },
    {
      id: 8,
      job: "job8",
      question: "question8",
      answer: "answer8",
      date: "2023-11-08",
    },
    {
      id: 7,
      job: "job7",
      question: "question7",
      answer: "answer7",
      date: "2023-11-07",
    },
    {
      id: 6,
      job: "job6",
      question: "question6",
      answer: "answer6",
      date: "2023-11-06",
    },
    {
      id: 5,
      job: "job5",
      question: "question5",
      answer: "answer5",
      date: "2023-11-05",
    },
    {
      id: 4,
      job: "job4",
      question: "question4",
      answer: "answer4",
      date: "2023-11-04",
    },
    {
      id: 3,
      job: "job3",
      question: "question3",
      answer: "answer3",
      date: "2023-11-03",
    },
    {
      id: 2,
      job: "job2",
      question: "question2",
      answer: "answer2",
      date: "2023-11-02",
    },
    {
      id: 1,
      job: "job1",
      question: "question1",
      answer: "answer1",
      date: "2023-11-01",
    },
  ];

  // get data from back
  // need pagination later
  const getQaList = async () => {
    await axios
      .get("/api/history/board", { params: { id: id, job: job } })
      .then((res) => {
        setQaList(res.data);
        console.log(qaList);
      })
      // if failed use dummy data now
      .catch((err) => {
        console.log(err);
        setQaList(dummyQaList);
      });
  };

  // mount
  useEffect(() => {
    // get question & answer
    getQaList();
  }, []);

  return (
    <div>
      <h1 className="text-center">Question & Answer</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>job</th>
            <th>question</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {qaList.map((ele) => (
            <InterviewRecordElement key={ele.id} {...ele} />
          ))}
        </tbody>
      </Table>
      {/* <Paginate active={Number(active)} lastPageNo={lastPageNo} /> */}
    </div>
  );
};

export default InterviewRecordList;
