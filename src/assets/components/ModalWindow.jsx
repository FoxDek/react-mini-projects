import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";

const modalWindowOverlay = cva(
  "modalOverlay fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
);

function ModalWindow({ children, onClose }) {

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={modalWindowOverlay()} onClick={onClose}>
      {children}
    </div>,
    document.getElementById("modal-root")
  );
}

export default ModalWindow;
