import React, { useState } from "react";
import InterviewRecordElement from "./InterviewRecordElement";
import { Table } from "react-bootstrap";
import Paginate from "./Paginate";
import { useParams } from "react-router-dom";

const InterviewRecordList = () => {
  // 백으로부터 받아야하는 데이터는?
  const { active } = useParams(); // 현재 페이지
  const lastPageNo = 10; // 총 페이지 수
  const qaList = [
    {
      index: 10,
      job: "job10",
      question: "question10",
      answer: "answer10",
      date: "2023-11-10",
    },
    {
      index: 9,
      job: "job9",
      question: "question9",
      answer: "answer9",
      date: "2023-11-09",
    },
    {
      index: 8,
      job: "job8",
      question: "question8",
      answer: "answer8",
      date: "2023-11-08",
    },
    {
      index: 7,
      job: "job7",
      question: "question7",
      answer: "answer7",
      date: "2023-11-07",
    },
    {
      index: 6,
      job: "job6",
      question: "question6",
      answer: "answer6",
      date: "2023-11-06",
    },
    {
      index: 5,
      job: "job5",
      question: "question5",
      answer: "answer5",
      date: "2023-11-05",
    },
    {
      index: 4,
      job: "job4",
      question: "question4",
      answer: "answer4",
      date: "2023-11-04",
    },
    {
      index: 3,
      job: "job3",
      question: "question3",
      answer: "answer3",
      date: "2023-11-03",
    },
    {
      index: 2,
      job: "job2",
      question: "question2",
      answer: "answer2",
      date: "2023-11-02",
    },
    {
      index: 1,
      job: "job1",
      question: "question1",
      answer: "answer1",
      date: "2023-11-01",
    },
  ];

  return (
    <div>
      InterviewRecordList <br />
      current page number is {active}
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
            <InterviewRecordElement {...ele} />
          ))}
        </tbody>
      </Table>
      <Paginate active={Number(active)} lastPageNo={lastPageNo} />
    </div>
  );
};

export default InterviewRecordList;
