import React from "react";
import { createPortal } from "react-dom";
import "./modal.css";

const Modal = ({ children, open, onClose }) => {
  if (!open) return null;
  return createPortal(
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal-wrapper">
        <div onClick={onClose} className="close">
          &#10006;
        </div>
        {children}
      </div>
    </>,
    document.getElementById("root-modal")
  );
};

export default Modal;
