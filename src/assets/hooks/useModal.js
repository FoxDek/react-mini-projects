import { useState } from 'react';

export function useModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    const modalRoot = document.getElementById("modal-root");
    setModalIsOpen(true);
    if (modalRoot) {
      modalRoot.className = "fixed inset-0 z-50";
    }
  };

  const closeModal = () => {
    const modalRoot = document.getElementById("modal-root");
    setModalIsOpen(false);
    if (modalRoot) {
      modalRoot.className = "";
    }
  };

  return {
    modalIsOpen,
    openModal,
    closeModal,
  };
}
