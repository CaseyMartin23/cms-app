import React, { useEffect } from "react";

import { Modal, ModalContent } from "./styledComps";

type DialogPropsType = {
  isOpen: boolean;
};

const Dialog: React.FC<DialogPropsType> = ({ isOpen, children }) => {
  useEffect(() => {
    toggleModal();
  }, [isOpen]);

  const toggleModal = () => {
    const modal = document.getElementById("modal");

    if (modal && isOpen) {
      modal.style.display = "grid";
    } else if (modal && !isOpen) {
      modal.style.display = "none";
    }
  };

  return (
    <Modal id="modal">
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export default Dialog;
