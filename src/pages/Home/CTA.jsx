import React from "react";
import "./cta.css";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <div className="gpt3__cta">
      <div className="gpt3__cta-content">
        <p>Join with us and get started</p>
        <h3>AInterview와 함께 여러분의 무한한 가능성을 펼처보세요</h3>
      </div>
      <div className="gpt3__cta-btn">
        <button type="button" onClick={() => navigate("/signup")}>
          등록하기
        </button>
      </div>
    </div>
  );
};

export default CTA;
