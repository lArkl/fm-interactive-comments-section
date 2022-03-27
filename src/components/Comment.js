import React, { useState } from "react";
import Scoring from "./Scoring/Scoring";
import Header from "./Header/Header";
import Actions from "./Actions/Actions";
import AdditionalComment from "./AdditionalComment/AdditionalComment";
import CommentContent, { replaceReply } from "./CommentContent/CommentContent";
import Modal from "./Modal/Modal";

function Comment({
  addComment,
  comment,
  currentUser,
  updateComment,
  deleteComment,
}) {
  const { createdAt, user, score, scoreStatus, id, replyingTo, localDate } =
    comment;
  const [showDeleteModal, updateShowDeleteModal] = useState(false);
  const contentHook = useState(comment.content);
  const [content] = contentHook;
  const [isEditing, updateIsEditing] = useState(false);
  const [showAddComment, updateShowAddComment] = useState(false);

  const imgName = user.image.webp.match(/[-a-z]+(?=.webp$)/);
  const isUser = user.username === currentUser.username;

  const actions = (
    <Actions
      username={currentUser.username}
      isUser={isUser}
      turnEdition={() => {
        updateIsEditing(true);
      }}
      openDeleteModal={() => updateShowDeleteModal(true)}
      isEditing={isEditing}
      onReply={() => updateShowAddComment(true)}
    />
  );

  const scoring = (
    <Scoring
      scoreInfo={{ score, scoreStatus }}
      updateScore={(score, scoreStatus) =>
        updateComment({ score, scoreStatus })
      }
    />
  );
  return (
    <>
      <article className="comment">
        <div className="side-scoring">{scoring}</div>
        <div className="side-comment">
          <Header
            username={user.username}
            imgName={imgName}
            createdAt={createdAt}
            localDate={localDate}
            isUser={isUser}
          >
            {actions}
          </Header>
          <CommentContent
            isEditing={isEditing}
            contentHook={contentHook}
            replyingTo={replyingTo}
          />
          <div className="options">
            {scoring}
            {actions}
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
        </div>
      </article>
      {showAddComment && (
        <AdditionalComment
          user={currentUser}
          replyTo={true}
          onAddComment={(content) => {
            addComment(content);
            updateShowAddComment(false);
          }}
        />
      )}
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
