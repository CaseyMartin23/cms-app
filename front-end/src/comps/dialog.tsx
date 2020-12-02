import React, { useEffect } from "react";

import styled from "styled-components";

const Modal = styled.div`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  padding: 10px;
  margin: auto;
  background-color: #8c8c8c;
  border: 1px solid #8c8c8c;
  border-radius: 4px;
`;

type DialogPropsType = {
  isOpen: boolean;
};

const Dialog: React.FC<DialogPropsType> = ({ isOpen, children }) => {
  useEffect(() => {
    const toggleModal = () => {
      const modal = document.getElementById("modal");

      if (modal && isOpen) {
        modal.style.display = "grid";
      } else if (modal && !isOpen) {
        modal.style.display = "none";
      }
    };
    toggleModal();
  }, [isOpen]);

  return (
    <Modal id="modal">
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export default Dialog;
