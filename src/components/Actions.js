import React from "react";
import ReplyIcon from "../../images/icon-reply.svg";
import EditIcon from "../../images/icon-edit.svg";
import DeleteIcon from "../../images/icon-delete.svg";

function Actions({ isUser, turnEdition, isEditing, openDeleteModal }) {
  return isUser ? (
    <div className="actions">
      <button
        className="actions__delete"
        disabled={isEditing}
        onClick={openDeleteModal}
      >
        <img src={DeleteIcon} alt="delete" />
        Delete
      </button>
      <button
        className="actions__edit"
        onClick={() => turnEdition()}
        disabled={isEditing}
      >
        <img src={EditIcon} alt="edit" />
        Edit
      </button>
    </div>
  ) : (
    <div className="actions">
      <button className="actions__reply">
        <img src={ReplyIcon} alt="reply" />
        Reply
      </button>
    </div>
  );
}

export default Actions;
