import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import ResumeList from "../components/Resume/ResumeList";
import axiosInstance from "./Interview/axiosInstance";

const Mypage = () => {
  // const { userId } = useParams(); // 유저 아이디 번호
  const [resumeList, setresumeList] = useState([]); // 이력서 목록 데이타

  const getResumeListData = async () => {
    const res = await axiosInstance
      .get("http://localhost:8080/api/member/resume/list")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        alert("이력서 목록 가져오기 실패");
        // 임시 코드 시작
        // return { data: [{ resumeId: 1, title: "title" }] };
        // 임시 코드 끝
        return null;
      });

    try {
      const initresumeList = res.data.map((it) => {
        return {
          resumeId: it.resumeId,
          title: it.title,
        };
      });
      setresumeList(initresumeList);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    getResumeListData();
  }, []);

  return (
    <>
      <h1 className="text-center p-5">마이 페이지</h1>
      {/* 이력서 목록 */}
      {/* <ResumeList userId={userId} resumeList={resumeList} /> */}
      <h3 className="text-center">나의 이력서 목록</h3>
      <hr className="p-2" />
      <ResumeList resumeList={resumeList} />
    </>
  );
};

export default Mypage;
