import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumeList from "../components/ResumeList";

const Mypage = () => {
  const { userId } = useParams(); // 유저 아이디 번호
  const [resumeList, setresumeList] = useState([]); // 이력서 목록 데이타

  const getResumeListData = async () => {
    // 더미 이력서 리스트 데이타
    const dummyResumeListData = [
      {
        resumeId: 1,
        title: "이력서 제목 1",
        date: new Date().toLocaleString(),
      },
      {
        resumeId: 2,
        title: "이력서 제목 2",
        date: new Date().toLocaleString(),
      },
      {
        resumeId: 3,
        title: "이력서 제목 3",
        date: new Date().toLocaleString(),
      },
    ];

    const res = await fetch(`/api/user/${userId}`)
      .then((res) => res.json())
      .catch((err) => {
        return dummyResumeListData;
      });

    const initresumeList = res.map((it) => {
      return {
        resumeId: it.resumeId,
        title: it.title,
        date: it.date,
      };
    });

    setresumeList(initresumeList);
  };

  useEffect(() => {
    getResumeListData();
  }, []);

  return (
    <div>
      <h1>마이 페이지</h1>
      {/* 이력서 목록 */}
      <ResumeList userId={userId} resumeList={resumeList} />
    </div>
  );
};

export default Mypage;
