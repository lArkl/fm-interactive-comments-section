import React from "react";
import "./styles.css";

function Modal({ closeDeleteModal, onDeleteComment }) {
  return (
    <div className="modal">
      <div className="modal__dialog">
        <h3>Delete comment</h3>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modal__buttons">
          <button className="modal__cancel" onClick={closeDeleteModal}>
            NO, CANCEL
          </button>
          <button className="modal__delete" onClick={onDeleteComment}>
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
