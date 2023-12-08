import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumeList from "../components/Resume/ResumeList";
import axiosInstance from "./Interview/axiosInstance";

const Mypage = () => {
  const { userId } = useParams(); // 유저 아이디 번호
  const [resumeList, setresumeList] = useState([]); // 이력서 목록 데이타

  const getResumeListData = async () => {
    const res = await axiosInstance
      .get("/data/resumeList.json")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        alert("이력서 목록 가져오기 실패");
      });

    const initresumeList = res.body.map((it) => {
      return {
        resumeId: it.resumeId,
        title: it.title,
      };
    });

    setresumeList(initresumeList);
  };

  useEffect(() => {
    getResumeListData();
  }, []);

  return (
    <div>
      <h1 className="text-center p-5">마이 페이지</h1>
      {/* 이력서 목록 */}
      <ResumeList userId={userId} resumeList={resumeList} />
    </div>
  );
};

export default Mypage;
