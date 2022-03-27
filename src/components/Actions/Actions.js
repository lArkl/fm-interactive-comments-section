import React from "react";
import ReplyIcon from "../../../images/icon-reply.svg";
import EditIcon from "../../../images/icon-edit.svg";
import DeleteIcon from "../../../images/icon-delete.svg";
import "./styles.css";

function Actions({
  username,
  isUser,
  turnEdition,
  isEditing,
  openDeleteModal,
  onReply,
}) {
  return isUser ? (
    <div className="actions">
      <button
        className="actions__delete"
        disabled={isEditing}
        onClick={openDeleteModal}
      >
        <img src={DeleteIcon} alt={`delete-${username}`} />
        Delete
      </button>
      <button
        className="actions__edit"
        onClick={() => turnEdition()}
        disabled={isEditing}
      >
        <img src={EditIcon} alt={`edit-${username}`} />
        Edit
      </button>
    </div>
  ) : (
    <div className="actions">
      <button className="actions__reply" onClick={onReply}>
        <img src={ReplyIcon} alt={`reply-${username}`} />
        Reply
      </button>
    </div>
  );
}

export default Actions;
