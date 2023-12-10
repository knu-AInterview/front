import React, { useEffect, useRef, useState } from "react";
import ResumeViewer from "../components/InterviewRecord/ResumeViewer";
import QnAListViewer from "../components/InterviewRecord/QnAListViewer";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./Interview/axiosInstance";
import { Button } from "react-bootstrap";

const QnAList = () => {
  // url parameter
  const { interviewId } = useParams(); // 인터뷰 id
  // resume
  const [resume, setResume] = useState({
    resumeId: -1,
    title: "",
    career: [],
    award: [],
    language: "",
    introduction: "",
  });
  // interview
  const [qnaList, setQnaList] = useState([]);

  const qnaID = useRef(0);

  const navigate = useNavigate();

  // 인터뷰 데이터 가져오기
  const getInterviewData = async () => {
    const resData = await axiosInstance
      .get(`/api/${interviewId}`)
      .then((res) => {
        return res.status === 200 ? res.data : null;
      })
      .catch((err) => {
        alert("인터뷰 데이터를 가져오지 못하였습니다.");
        return null;
      });

    try {
      setResume(resData.resume);
      const initQnaList = resData.qnaList.map((it) => {
        return {
          question: it.question,
          answer: it.answer,
          id: qnaID.current++,
        };
      });
      setQnaList(initQnaList);
    } catch (error) {
      // 임시 코드 시작
      // setResume({
      //   resumeId: 12,
      //   title: "대충 이력서 제목",
      //   career: ["자택 경비원 3년", "키보드 워리어 4년"],
      //   award: ["멍 때리기 대회 은상", "으이구 이 화상"],
      //   language: "C, C++, JAVA",
      //   introduction:
      //     "14년간 아내로서 엄마로서 최선을 다해 열심히 살아오면서도 항상 배움, 그중에서도 체계적인 학습에 대한 아쉬움이 있었습니다. 또한 주부이지만 성장하는 아이들에게 멋진 엄마의 모습을 보여주고 싶습니다.\
      //     제 환경이나 상황이 한 번에 긴 시간을 공부하기는 어렵겠지만 낮에는 아이들과 함께 공부하고, 아이들이 잠든 후 밤 시간을 이용해 짬짬이 공부하려고 합니다. 또한 주말에는 사이버외대에서 진행하는 특강이나 모임에도 적극적으로 참석해서 다른 학생들과 함께 공부하고, 쉽지는 않겠지만 해외 문화탐방과 같은 문화체험도 참가해 보고 싶습니다.\
      //     사이버외대를 졸업한 후에 여건이 된다면 대학원에도 진학해 보고 싶습니다. 학부과정에서 키운 언어에 대한 실력과 전문성을 바탕으로 대학원에서는 효과적으로 영어를 가르칠 수 있는 교육법(교수법)에 대해 공부할 계획입니다. 또한 향후 가능하다면 어린이, 학생을 대상으로 영어를 가르치는 봉사활동도 해보고 싶습니다.\
      //     \
      //     원어민 교수님을 포함한 외국인과 거리낌 없이 소통하고 즐길 수 있는 가까운 미래 제 모습을 상상하며 열심히 하겠습니다.",
      // });
      // setQnaList([
      //   {
      //     question:
      //       "실명제 기반이기 때문에 장난스럽거나\
      //    유치한 답변이 많은 네이버 지식인에 비해 실명을 걸고\
      //     답변하는 만큼 답변의 평균적인 질이 매우 높다.\
      //      아주 기본적인 수학 질문에도 아주아주 진지하게 그래프까지 동원해가며\
      //       설명해주는 사람들을 흔히 볼 수 있다. 또한 구체적이지 않은 인생이나 삶의\
      //        목표 등에 대한 질문에도 아주 성의있는 답을 받을 수 있다.",
      //     answer:
      //       "진지한 답변이 많을 수밖에 없는 이유가 있다. 쿼라에 가입을 할 때 자신의 전문분야와 관심사를 기입해야 되고 질문을 할 때 실제로 전문성, 구독수, 답변수 등 다양한 기준으로 선정된 사람들에게 답변을 쓰도록 요청할 수 있기 때문. 실제 해당업종 전문가들이 답변을 해주는 경우도 많다. 그리고 이 사이트는 로그인을 하지 않으면 기본적으로 사이트를 쓸 수 없다(구글, 페이스북 아이디는 연동 가능). 예를 들어 아폴로 계획의 궁금한 점에 대해 질문이 올라오면, 아예 실제로 아폴로 계획에 참여했던 전문가가 등판해서 거의 과학 논문 수준의 답변을 올려주는 진풍경을 볼 수도 있다.",
      //     id: 1,
      //   },
      //   { question: "질문2", answer: "답변2", id: 2 },
      //   { question: "질문3", answer: "답변3", id: 3 },
      //   { question: "질문4", answer: "답변4", id: 4 },
      //   { question: "질문5", answer: "답변5", id: 5 },
      //   { question: "질문6", answer: "답변6", id: 6 },
      //   { question: "질문7", answer: "답변7", id: 7 },
      //   { question: "질문8", answer: "답변8", id: 8 },
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
      <h1 className="p-5 text-center">나의 면접 기록</h1>
      <h3 className="p-2 text-center">제출한 이력서</h3>
      <ResumeViewer {...resume} />
      <h3 className="p-4 text-center">질문 및 답변</h3>
      <QnAListViewer qnaList={qnaList} />
      <div className="p-4 text-center">
        <Button variant="secondary" onClick={() => navigate("/interview/list")}>
          인터뷰 목록으로
        </Button>{" "}
        <Button variant="secondary" onClick={() => navigate("/")}>
          홈으로
        </Button>
      </div>
    </>
  );
};

export default QnAList;
