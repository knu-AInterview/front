// SecondPage.jsx
// import React from "react";
// import { Button } from "reactstrap";

// const SecondPage = ({ onBack, onComplete }) => {
//   return (
//     <div>
//       <h1>Second Page</h1>
//       <p>This is the content of the second page.</p>
//       <Button color="primary" onClick={onBack}>
//         뒤로가기
//       </Button>{" "}
//       <Button color="success" onClick={onComplete}>
//         완료
//       </Button>
//     </div>
//   );
// };

// export default SecondPage;

import React from "react";
import "./SecondPage.css";
// import gptLogo from "./assets/chatgpt.svg";
// import addBtn from "./assets/add-30.png";
// import msgIcon from "./assets/message.svg";
// import home from "./assets/home.svg";
// import saved from "./assets/bookmark.svg";
// import rocket from "./assets/rocket.svg";
// import sendBtn from "./assets/send.svg";
// import userIcon from "../../assets/user.png";
// import RobotImgLogo from "../../assets/smart_toy.png";
// import { sendMsgToOpenAI } from "./openai";
import { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, useLocation } from "react-router-dom";

const SecondPage = ({ onBack, onComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { interviewId, qnaList } = location.state?.dataFromServer || {};
  // console.log(qnaList[0]["question"]);
  const questionsFromQnA = qnaList.map((item, index) => {
    return {
      [index]: {
        text: item.question,
        hiddenText: item.answer,
        buttons: [
          {
            label: "show answer",
            action: "open_link",
            link: "/select-resume",
          },
        ],
      },
    };
  });
  // console.log(questionsFromQnA);
  const [buttonLabels, setButtonLabels] = useState(
    new Array(qnaList.length).fill("show answers")
  );
  const [selectedResume, setSelectedResume] = useState(null);
  const openResumeSelection = () => {
    console.log("Selected Resume ID:", selectedResume);
  };

  const [idx, setIdx] = useState(1);
  const [qnaIdx, setQnaIdx] = useState(0);
  // const [questionsFromQnA, setQuestionsFromQnA] = useState([]);
  // const scenarios = [
  //   {
  //     text: "안녕하세요!\nAInterview입니다. 이력서를 전송하여 AI가 모의 면접 질문과 답을 제공하는 서비스입니다.\n아래 버튼을 통해 이력서 선택을 완료해주세요!",
  //     hiddenText: "",
  //     buttons: [
  //       {
  //         label: "TOGGLE",
  //         action: "open_link",
  //         link: "/select-resume",
  //       },
  //     ],
  //   },
  // ];
  const scenarios = [];
  // console.log(scenarios);
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: questionsFromQnA[qnaIdx][qnaIdx].text,
      hiddenText: questionsFromQnA[qnaIdx][qnaIdx].hiddenText,

      isBot: true,

      buttons: questionsFromQnA[qnaIdx][qnaIdx].buttons,

      // text: scenarios[0].text,
      // hiddenText: scenarios[0].hiddenText,
      // isBot: true,
      // buttons: scenarios[0].buttons,
    },
  ]);
  const [toggledIndices, setToggledIndices] = useState([]);

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
            // className="chatImg"
            // src={message.isBot ? RobotImgLogo : userIcon}
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
                  {buttonLabels[index]}
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
    for (let i = 0; i < text.length; i++) {
      // Simulate typing effect by appending one letter at a time
      await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust the delay as needed
      botMessage.text += text[i];
      setMessages((prevMessages) => {
        const lastMessageIndex = prevMessages.length - 1;
        prevMessages[lastMessageIndex] = { ...botMessage };
        return [...prevMessages];
      });
    }

    // Scroll to the bottom of the chat container after typing simulation
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
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
      if (idx < scenarios.length) {
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
        setIdx(idx + 1);
      } else if (qnaIdx < questionsFromQnA.length) {
        // const userMessage = { text, isBot: false, buttons: [] };
        // setMessages([...messages, userMessage]);

        // const res = await sendMsgToOpenAI(input);
        // const botMessage = { text: res, isBot: true, buttons: [] };
        const userMessage = { text, hiddenText: "", isBot: false, buttons: [] };
        setMessages([...messages, userMessage]);
        console.log(questionsFromQnA, qnaIdx);
        const botText = questionsFromQnA[qnaIdx][qnaIdx].text; // Question #{i}
        const botHiddenText = questionsFromQnA[qnaIdx][qnaIdx].hiddenText; // Answer #{i}
        // console.log(botText, botHiddenText);
        // console.log("BOTTEXT:", botText);
        // const botMessage = { text: "", isBot: true, buttons: [] };
        const botMessage = {
          text: botText,
          hiddenText: botHiddenText,
          isBot: true,
          buttons: questionsFromQnA[qnaIdx][qnaIdx].buttons,
        };
        setMessages([...messages, userMessage, botMessage]);
        setQnaIdx(qnaIdx + 1);
        await simulateTyping(botText, botMessage);
      }

      // Removed the scroll code from here
    }, 600);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([...messages, { text, isBot: false, buttons: [] }]);
    // const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      { text, isBot: false, buttons: [] },
      // { text: res, isBot: true, buttons: [] },
    ]);
  };

  const handleLinkClick = (link) => {
    alert(`Link clicked: ${link}`);
    // 여기서 원하는 동작 수행 가능
  };

  const handleButtonClick = (i, button) => {
    // alert(`Button clicked: ${button.label}`);
    toggleVisibility(i);

    // // Check if the button has a link property
    // if (button.link) {
    //   // Customize window features
    //   const windowFeatures =
    //     "width=600,height=400,menubar=no,toolbar=no,location=no,status=no";

    //   // Open the link in a new window with custom features
    //   const childWindow = window.open(button.link, "_blank", windowFeatures);

    //   // 이벤트 리스너 등록
    //   window.addEventListener("message", (event) => {
    //     // 이벤트 데이터 확인
    //     const dataFromChild = event.data;
    //     console.log(dataFromChild);
    //     if (Array.isArray(dataFromChild)) {
    //       setQuestionsFromQnA((prevQuestions) => [
    //         ...prevQuestions,
    //         ...dataFromChild.map((q) => q.question),
    //       ]);
    //     } else if (
    //       typeof dataFromChild === "object" &&
    //       dataFromChild.question
    //     ) {
    //       // If dataFromChild is a single question object
    //       setQuestionsFromQnA((prevQuestions) => [
    //         ...prevQuestions,
    //         dataFromChild.question,
    //       ]);
    //     } else {
    //       console.error("Invalid data received from the child:", dataFromChild);
    //     }
    //   });
    // }
    // Handle other actions if needed
  };
  return (
    <div className="App">
      <div className="App">
        <div className="sideBar">{/* ... (이전 코드) */}</div>
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
                placeholder="Send a message"
                value={input}
                onKeyDown={handleEnter}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <Button className="send" color="primary" onClick={handleSend}>
                Send
              </Button>
            </div>
            <p>
              ChatGPT may produce inaccurate information about people, places,
              or facts. ChatGPT August 20 Version.
            </p>
            <div>
              <Button color="primary" onClick={onBack}>
                뒤로가기
              </Button>{" "}
              <Button color="success" onClick={onComplete}>
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
