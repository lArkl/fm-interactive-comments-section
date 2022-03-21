import React from "react";
import ReplyIcon from "../../../images/icon-reply.svg";
import EditIcon from "../../../images/icon-edit.svg";
import DeleteIcon from "../../../images/icon-delete.svg";
import "./styles.css";

export function UserActions({ turnEdition, isEditing, openDeleteModal }) {
  return (
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
  );
}

export function ReplyAction({ onReply }) {
  return (
    <div className="actions">
      <button className="actions__reply" onClick={onReply}>
        <img src={ReplyIcon} alt="reply" />
        Reply
      </button>
    </div>
  );
}
