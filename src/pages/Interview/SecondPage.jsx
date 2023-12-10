import React from "react";
import "./SecondPage.css";
import userIcon from "../../assets/user.png";
import RobotImgLogo from "../../assets/smart_toy.png";
import { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, useLocation } from "react-router-dom";

const SecondPage = ({ onBack, onComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { interviewId, qnaList } = location.state?.dataFromServer || {};
  const questionsFromQnA = qnaList.map((item, index) => {
    return {
      [index]: {
        text: item.question,
        hiddenText: item.answer,
        buttons: [
          {
            label: "",
          },
        ],
      },
    };
  });
  const [buttonLabels, setButtonLabels] = useState(
    new Array(qnaList.length).fill("show answers")
  );
  console.log(buttonLabels);

  const [idx, setIdx] = useState(1);
  const [qnaIdx, setQnaIdx] = useState(0);
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [disableInput, setDisableInput] = useState(false);

  const scenarios = [
    {
      text: "안녕하세요!\nAInterview입니다. 지금부터 모의 면접을 시작하도록 하겠습니다.",
      hiddenText: "",
      buttons: [],
    },
    {
      text: "수고 많으셨습니다. 모의 면접이 종료되었습니다. 아래의 '완료' 버튼을 면접을 종료해주세요.",
      hiddenText: "",
      buttons: [],
    },
  ];
  const [messages, setMessages] = useState([
    {
      text: scenarios[0].text,
      hiddenText: scenarios[0].hiddenText,
      isBot: true,
      buttons: scenarios[0].buttons,
    },
  ]);
  const [toggledIndices, setToggledIndices] = useState(["show answers"]);

  const toggleVisibility = (index) => {
    setToggledIndices((prevToggledIndices) => {
      const newToggledIndices = [...prevToggledIndices];
      newToggledIndices[index] = !newToggledIndices[index];
      return newToggledIndices;
    });

    setButtonLabels((prevLabels) => {
      const newLabels = [...prevLabels];
      newLabels[index] =
        prevLabels[index] === "show answers" ? "hide" : "show answers";
      return newLabels;
    });
  };
  const renderMessage = (message, index, handleButtonClick) => {
    const hasBtn = message.buttons.length > 0 ? true : false;
    console.log("hello message:", message, hasBtn);
    return (
      <div key={index} className={message.isBot ? "chat bot" : "chat"}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <img
            className="chatImg"
            src={message.isBot ? RobotImgLogo : userIcon}
            alt=""
          />
          <p className="txt">
            {message.text}
            <br />
            {message.buttons.length > 0 ? (
              toggledIndices[index] ? (
                <span>{message.hiddenText}</span>
              ) : (
                <span></span>
              )
            ) : (
              <span></span>
            )}
          </p>
          {message.buttons && message.buttons.length > 0 && (
            <div className="buttonContainer">
              {message.buttons.map((button, btnIndex) => (
                <Button
                  key={btnIndex}
                  className="customButton"
                  color="primary"
                  onClick={() => handleButtonClick(index, button)}
                >
                  {buttonLabels[btnIndex]}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setToggledIndices(new Array(qnaList.length).fill(false));
  }, []);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const simulateTyping = async (text, botMessage) => {
    setDisableInput(true); // disable 상태로 설정

    // 새로운 메시지 생성
    const newBotMessage = { ...botMessage };

    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      newBotMessage.text += text[i];
      setMessages((prevMessages) => {
        const lastMessageIndex = prevMessages.length - 1;
        // 마지막 메시지만 업데이트
        prevMessages[lastMessageIndex] = { ...newBotMessage };
        return [...prevMessages];
      });
    }

    // Scroll to the bottom of the chat container after typing simulation
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    setDisableInput(false); // disable 상태 해제
  };

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([
      ...messages,
      { text: input, hiddenText: "", isBot: false, buttons: [] },
      { text: "thinking...", hiddenText: "", isBot: true, buttons: [] }, //scenarios[i].hiddenText;
    ]);

    const chatContainer = document.getElementById("chat-container"); // Replace with the actual ID of your chat container

    setTimeout(async () => {
      if (qnaIdx < questionsFromQnA.length) {
        const userMessage = { text, hiddenText: "", isBot: false, buttons: [] };
        setMessages([...messages, userMessage]);
        console.log(questionsFromQnA, qnaIdx);
        const botText = questionsFromQnA[qnaIdx][qnaIdx].text; // Question #{i}
        const botHiddenText = questionsFromQnA[qnaIdx][qnaIdx].hiddenText; // Answer #{i}
        const botMessage = {
          text: "",
          hiddenText: botHiddenText,
          isBot: true,
          buttons: questionsFromQnA[qnaIdx][qnaIdx].buttons,
        };
        setMessages([...messages, userMessage, botMessage]);
        await simulateTyping(botText, botMessage);
        setQnaIdx((prevQnaIdx) => prevQnaIdx + 1); // 여기서 질문 번호를 증가시킴
      } else if (idx < scenarios.length) {
        const userMessage = { text, hiddenText: "", isBot: false, buttons: [] };
        setMessages([...messages, userMessage]);

        const botText = scenarios[idx].text;
        const botHiddenText = scenarios[idx].hiddenText;
        const botMessage = {
          text: "",
          hiddenText: botHiddenText,
          isBot: true,
          buttons: scenarios[idx].buttons,
        };
        setMessages([...messages, userMessage, botMessage]);

        await simulateTyping(botText, botMessage);
        console.log(idx);
        setIdx((prevIdx) => prevIdx + 1);
      }

      // Removed the scroll code from here
    }, 600);
  };

  const handleEnter = async (e) => {
    if (input.trim() !== "" && e.key === "Enter") await handleSend();
  };

  const handleButtonClick = (i, button) => {
    toggleVisibility(i);
  };
  return (
    <div className="App">
      <div className="App">
        <div className="sideBar">{/* */}</div>
        <div className="main">
          <div className="chats">
            {messages.map((message, i) =>
              renderMessage(message, i, handleButtonClick)
            )}
            <div ref={msgEnd} />
          </div>
          <div className="chatFooter">
            <div className="inp">
              <input
                type="text"
                placeholder={
                  disableInput
                    ? "AI generates questions.."
                    : idx >= scenarios.length
                    ? "Interview is done."
                    : "Send a message"
                }
                value={input}
                onKeyDown={handleEnter}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                disabled={disableInput || idx >= scenarios.length}
              />
              <Button
                className="send"
                color="primary"
                onClick={handleSend}
                disabled={input.trim() === ""}
              >
                Send
              </Button>
            </div>
            <p>
              Try AInterview to receive anticipated interview questions and
              answers! AInterview@KNU
            </p>
            <div>
              <Button
                color="success"
                onClick={() => {
                  navigate("/");
                }}
              >
                완료
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
