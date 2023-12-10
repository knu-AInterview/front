import React, { useEffect, useState } from "react";
import InterviewList from "../components/InterviewRecord/InterviewList";
import axiosInstance from "./Interview/axiosInstance";

const InterviewRecord = () => {
  const [data, setData] = useState([]);

  // 인터뷰 제목, 인터뷰 아이디
  const getInterviewData = async () => {
    const resData = await axiosInstance
      .get(`/api/interview/list`)
      .then((res) => {
        return res.status === 200 ? res.data : null;
      })
      .catch((err) => {
        alert("이력서 목록을 가져오지 못하였습니다.");
        return null;
      });

    try {
      const initData = resData.map((it) => {
        return {
          interviewId: it.interviewId,
          title: it.title,
        };
      });
      setData(initData);
    } catch (error) {
      // 임시 코드 시작
      // setData([
      //   { interviewId: 1, title: "인터뷰 제목 1" },
      //   { interviewId: 3, title: "인터뷰 제목 2" },
      //   { interviewId: 4, title: "인터뷰 제목 3" },
      //   { interviewId: 5, title: "인터뷰 제목 4" },
      //   { interviewId: 10, title: "인터뷰 제목 5" },
      // ]);
      // 임시 코드 끝
      return;
    }
  };

  useEffect(() => {
    getInterviewData();
  }, []);

  return (
    <>
      <h1 className="text-center p-5">마이 페이지</h1>
      <h3 className="text-center">나의 인터뷰 목록</h3>
      <hr className="p-2" />
      <InterviewList interviewList={data} />
    </>
  );
};

export default InterviewRecord;
