import React, { useState, useRef } from "react";
import Scoring from "./Scoring";
import Header from "./Header";
import Actions from "./Actions";
import CommentContent from "./CommentContent";
import Modal from "./Modal";

function Comment({ comment, currentUsername, updateComment, deleteComment }) {
  const { createdAt, user, score, id, replyingTo } = comment;
  const [showDeleteModal, updateShowDeleteModal] = useState(false);
  const [content, updateContent] = useState(comment.content);
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
        <CommentContent isEditing={isEditing} updateContent={updateContent}>
          {replyingTo && <span className="replying">@{replyingTo}</span>}{" "}
          {content}
        </CommentContent>

        <div className="options">
          <Scoring score={score} />
          <Actions
            isUser={isUser}
            turnEdition={() => {
              updateIsEditing(true);
            }}
            openDeleteModal={() => updateShowDeleteModal(true)}
            isEditing={isEditing}
          />
        </div>
        {isEditing ? (
          <div className="action__update">
            <button
              className="other-button"
              onClick={() => {
                updateComment(content);
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
