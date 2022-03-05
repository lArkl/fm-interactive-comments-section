import React from "react";
import ReplyIcon from "../../images/icon-reply.svg";
import EditIcon from "../../images/icon-edit.svg";
import DeleteIcon from "../../images/icon-delete.svg";

function Actions({ isUser }) {
  return isUser ? (
    <div className="actions">
      <button className="actions__delete">
        <img src={DeleteIcon} alt="delete" />
        Delete
      </button>
      <button className="actions__edit">
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
