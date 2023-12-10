import React from "react";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import "./header.css";
import CTA from "./CTA";

const Home = () => {
  return (
    <>
      <div className="gpt3__header section__padding p-5" id="home">
        <div className="gpt3__header-content">
          <h1 className="gradient__text">
            AInterview와 함께
            <br />
            면접을 준비해보세요
          </h1>
          <p>
            저희의 새로운 AI 면접 준비 플랫폼 AInterview와 함께 면접을
            준비해보세요. 면접 스터디 그룹이 없더라도, 생성형 AI가 만들어 낸
            예상 질문에 답하며 면접에 대한 자신감을 키우게 됩니다.
          </p>

          <div className="gpt3__header-content__people">
            <img src={people} alt="" />
            <p>Be prepared to interview with us.</p>
          </div>
        </div>

        <div className="gpt3__header-image">
          <img src={ai} alt="" />
        </div>
      </div>
      <CTA />
    </>
  );
};

export default Home;
