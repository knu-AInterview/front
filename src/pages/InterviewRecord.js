import React, { useEffect, useState } from "react";
import InterviewList from "../components/InterviewRecord/InterviewList";

const InterviewRecord = () => {
  const [data, setData] = useState([]);

  // 인터뷰 제목, 인터뷰 아이디
  const getData = async () => {
    const res = await fetch("/data/interviewList.json")
      .then((res) => res.json())
      .catch((err) => {
        alert("불러오기 실패");
        console.log(err);
      });

    const initData = res.body.map((it) => {
      return {
        interviewId: it.interviewId,
        interviewTitle: it.interviewTitle,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      InterviewRecord
      <InterviewList interviewList={data} />
    </div>
  );
};

export default InterviewRecord;
