import React, { useState } from "react";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import "./header.css";
// import SignUpModal from "./SignUpModal";

const Home = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [placeholderContent, setPlaceholderContent] =
    useState("Your Email Address");
  const [email, setEmail] = useState("");

  const closeSignUpModal = () => {
    setPlaceholderContent("Your Email Address");

    setIsSignUpModalOpen(false);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">
          {/* Let&apos;s Build Something amazing with GPT-3 OpenAI */}
          AInterview와 함께
          <br />
          면접을 준비해보세요
        </h1>
        <p>
          {/* Yet bed any for travelling assistance indulgence unpleasing. Not
          thoughts all exercise blessing. Indulgence way everything joy
          alteration boisterous the attachment. Party we years to order allow
          asked of. */}
          저희의 새로운 AI 면접 준비 플랫폼 AInterview와 함께 면접을
          준비해보세요. 면접 스터디 그룹이 없더라도, 생성형 AI가 만들어 낸 예상
          질문에 답하며 면접에 대한 자신감을 키우게 됩니다.
        </p>

        <div className="gpt3__header-content__input">
          <input
            type="email"
            placeholder={placeholderContent}
            onChange={handleEmailChange}
          />
          {/* <button type="button" onClick={openSignUpModal}>
            Get Started
          </button> */}

          {/* <SignUpModal
            isOpen={isSignUpModalOpen}
            onRequestClose={closeSignUpModal}
            placeholderContent={placeholderContent} // Pass the placeholder content to SignUpModal
          /> */}
        </div>

        <div className="gpt3__header-content__people">
          <img src={people} />
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>

      <div className="gpt3__header-image">
        <img src={ai} />
      </div>
    </div>
  );
};

export default Home;
