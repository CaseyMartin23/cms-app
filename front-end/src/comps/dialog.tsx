import React, { useEffect } from "react";

import { Modal, ModalContent } from "./styledComps";

type DialogPropsType = {
  title: string;
  isOpen: boolean;
  onClose(): void;
};

const Dialog: React.FC<DialogPropsType> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
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
    <Modal id="modal" onClick={onClose}>
      <ModalContent>
        <h4>{title}</h4>
        {children}
      </ModalContent>
    </Modal>
  );
};

export default Dialog;
