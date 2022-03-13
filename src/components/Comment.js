import React, { useState, useRef } from "react";
import Scoring from "./Scoring/Scoring";
import Header from "./Header/Header";
import Actions from "./Actions/Actions";
import CommentContent, { replaceReply } from "./CommentContent/CommentContent";
import Modal from "./Modal/Modal";

function Comment({
  comment,
  currentUsername,
  updateComment,
  deleteComment,
  onReply,
}) {
  const { createdAt, user, score, id, replyingTo } = comment;
  const [showDeleteModal, updateShowDeleteModal] = useState(false);
  const contentHook = useState(comment.content);
  const [content] = contentHook;
  const [isEditing, updateIsEditing] = useState(false);
  const imgName = user.image.webp.match(/[-a-z]+(?=.webp$)/);
  const isUser = user.username === currentUsername;
  return (
    <>
      <article className="comment">
        <Header
          username={user.username}
          imgName={imgName}
          createdAt={createdAt}
          isUser={isUser}
        />
        <CommentContent
          isEditing={isEditing}
          contentHook={contentHook}
          replyingTo={replyingTo}
        />
        <div className="options">
          <Scoring score={score} />
          <Actions
            isUser={isUser}
            turnEdition={() => {
              updateIsEditing(true);
            }}
            openDeleteModal={() => updateShowDeleteModal(true)}
            isEditing={isEditing}
            onReply={() => onReply(user.username, id)}
          />
        </div>
        {isEditing ? (
          <div className="action__update">
            <button
              className="other-button"
              onClick={() => {
                updateComment({ content: replaceReply(content) });
                updateIsEditing(false);
              }}
            >
              UPDATE
            </button>
          </div>
        ) : null}
      </article>
      {showDeleteModal ? (
        <Modal
          closeDeleteModal={() => updateShowDeleteModal(false)}
          onDeleteComment={() => {
            deleteComment(id);
            updateShowDeleteModal(false);
          }}
        />
      ) : null}
    </>
  );
}

export default Comment;
