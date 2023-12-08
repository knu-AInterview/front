// FirstPageContent.jsx
//

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
// import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
// import "./ResumeSelect.css";
import { useNavigate } from "react-router-dom";
// import "./FirstPageContent.css";
import axiosInstance from "./axiosInstance";

const FirstPageContent = ({ onNext, onCancel }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState("");
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [job, setJob] = useState("");
  const [title, setTitle] = useState("");
  const [requirement, setRequirement] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState(-1);
  const [selectedResumeObject, setSelectedResumeObject] = useState(null);

  useEffect(() => {
    // Fetch data from the local JSON file
    // fetch("/data/data.json")
    //   .then((response) => response.json())
    //   .then((jsonData) => setData(jsonData.body))
    //   .catch((error) => console.error("Error fetching data:", error));

    axiosInstance({
      url: "http://localhost:8080/api/member/resume",
      method: "GET",
      withCredentials: true,
    })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          // window.open("/", "_self");
          console.log("Ok!");
        }
      })
      .catch((error) => {});
  }, []);

  const handleJobButtonClick = (selectedJob) => {
    setJob(selectedJob);
  };

  const handleTitleChange = (event) => {
    // 입력값이 변경될 때마다 호출되는 함수로, title 상태를 업데이트합니다.
    setTitle(event.target.value);
  };

  const handleRequirementChange = (event) => {
    // 입력값이 변경될 때마다 호출되는 함수로, title 상태를 업데이트합니다.
    setRequirement(event.target.value);
  };

  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
      const selectedResume = data.find((item) => item.id === parseInt(id));
      setSelectedResumeObject(selectedResume);
      console.log("222selected resume:", selectedResume);
      // const selectedResumeId = selectedResume.id;
      // console.log("Selected Resume id:", selectedResumeId);
      setSelectedResumeId(selectedResume.id);
      // onSelectResume(selectedResume ? selectedResume.name : "");
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleDone = async () => {
    if (open) {
      // onSelectResume(selectedResume);
      // toggleModal();
      // setOpen("");

      // 전송할 데이터 준비
      // const sendData = {
      //   data: data.map((resume) => ({
      //     // id: resume.id,
      //     // name: resume.name,
      //     // job: resume.job,
      //     // skills: resume.skills,
      //     // otherInfo: resume.otherInfo,
      //     // 다른 Resume 속성들도 필요한 대로 추가
      //     title: title,
      //     resumeid: resume.id,
      //     job: job,
      //     requirement: requirement,
      //   })),
      // };
      // console.log(data);
      const sendData = {
        title: title,
        // resumeid: selectedResumeId,
        resumeId: selectedResumeObject.id,
        job: job,
        requirement: requirement,
      };

      try {
        const response = await axiosInstance.post(
          "http://localhost:8080/api/saveData",
          //   "https://jsonplaceholder.typicode.com/posts",
          sendData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Server Response:", response.data);
        // toggleModal();

        // TODO :: Navigate to Page 2
        // navigate("/interview", { state: { resumeData: response.data } });
        navigate("/interview/interview", {
          state: {
            dataFromServer: response.data,
          },
        });
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else {
      // Done 버튼을 클릭했을 때, 모달이 열려있지 않거나 id가 0이하면 경고 메시지를 띄움
      alert("Please select a valid resume before clicking 'Done'.");
    }
  };

  return (
    <div>
      {/* title을 입력받는 Input 컴포넌트 */}
      <p>
        {" "}
        <br />
        <strong>Enter your Interview Title.</strong>
      </p>
      <Input
        type="textarea"
        rows="1"
        placeholder="Enter your title"
        value={title} // 현재 title 상태를 표시
        onChange={handleTitleChange} // 입력값이 변경될 때 호출되는 함수
      />
      <p>
        {" "}
        <br />
        <strong>Select your resume.</strong>
      </p>
      <Accordion flush open={open} toggle={toggle}>
        {data.map((item, index) => (
          <AccordionItem key={item.id}>
            <AccordionHeader targetId={item.id.toString()}>
              {item.title}
            </AccordionHeader>
            <AccordionBody accordionId={item.id.toString()}>
              {/* <strong>{`Resume Title: ${item.title}.`}</strong> */}
              {/* <br /> */}
              {`Career: ${item.career.join(", ")}`}
              <br />
              {`Award: ${item.award.join(", ")}`}
              <br />
              {`Language: ${item.language}`}
              <br />
              {`Introduction: ${item.introduction}`}
              <br />
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
      <p>
        {" "}
        <br />
        <strong>Select your job.</strong>
      </p>
      <div>
        <Button
          color={job === "Front-end" ? "primary" : "secondary"}
          onClick={() => handleJobButtonClick("Front-end")}
        >
          Front-end
        </Button>{" "}
        <Button
          color={job === "Back-end" ? "primary" : "secondary"}
          onClick={() => handleJobButtonClick("Back-end")}
        >
          Back-end
        </Button>{" "}
        <Button
          color={job === "AI" ? "primary" : "secondary"}
          onClick={() => handleJobButtonClick("AI")}
        >
          AI
        </Button>
      </div>
      {/* title을 입력받는 Input 컴포넌트 */}
      <p>
        {" "}
        <br />
        <strong>Enter your requirement.</strong>
      </p>
      <Input
        type="textarea"
        rows="4"
        placeholder="Enter your requrement"
        value={requirement} // 현재 title 상태를 표시
        onChange={handleRequirementChange} // 입력값이 변경될 때 호출되는 함수
      />
      <br />
      <div className="buttons">
        <Button
          color="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
        {/* Done button outside the modal */}
        <Button color="success" onClick={handleDone}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default FirstPageContent;
