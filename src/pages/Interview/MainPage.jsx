// // MainPage.jsx
// import React, { useState } from "react";
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
// import { useNavigate } from "react-router-dom";
// import FirstPageContent from "./FirstPageContent";
// import SecondPage from "./SecondPage";

// const MainPage = () => {
//   const [isAinterviewModalOpen, setIsAinterviewModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const openAinterviewModal = () => {
//     setIsAinterviewModalOpen(true);
//   };

//   const closeAinterviewModal = () => {
//     setIsAinterviewModalOpen(false);
//   };

//   const goToNextPage = () => {
//     navigate("/second-page");
//   };

//   return (
//     <div>
//       <Button onClick={openAinterviewModal}>HELO</Button>

//       {/* 모달 */}
//       <Modal isOpen={isAinterviewModalOpen} toggle={closeAinterviewModal}>
//         <ModalBody>
//           {/* 1페이지 내용 */}
//           {/* <FirstPageContent /> */}
//           <SecondPage />
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={goToNextPage}>
//             다음
//           </Button>
//           <Button color="success" onClick={closeAinterviewModal}>
//             완료
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default MainPage;

// MainPage.jsx
import React, { useContext, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate, Routes, Route } from "react-router-dom";
import FirstPageContent from "./FirstPageContent";
import SecondPage from "./SecondPage";
// import "./MainPage.css";
// import { AccountStateContext } from "../../App";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  // 로그인 여부
  // const { isLoggedIn } = useContext(AccountStateContext);

  const openModal = () => {
    // if (isLoggedIn) {
    //   setIsModalOpen(true);
    //   navigate("/main/first-page");
    // } else {
    //   alert("로그인이 필요합니다.");
    // }
    setIsModalOpen(true);
    navigate("/main/first-page");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal}>AInterview</Button>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} toggle={closeModal} className="custom-modal">
        <ModalBody>
          <Routes>
            <Route
              path="/main/first-page"
              element={
                <FirstPageContent
                  onNext={() => navigate("/main/second-page")}
                  onCancel={closeModal}
                />
              }
            />
            <Route
              path="/main/second-page"
              element={
                <SecondPage
                  onBack={() => navigate("/main/first-page")}
                  onComplete={closeModal}
                />
              }
            />
          </Routes>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MainPage;
