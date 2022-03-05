import React, { useState } from "react";
import ReplyImg from "../../images/icon-reply.svg";
import images from "../../images/avatars/*.webp";
import Scoring from "./Scoring";
import Header from "./Header";
import Actions from "./Actions";

function Comment({ comment, currentUsername }) {
  const { content, createdAt, user, score, replies } = comment;
  const imgName = user.image.webp.match(/[-a-z]+(?=.webp$)/);
  return (
    <>
      <article className="comment">
        <Header
          username={user.username}
          imgName={imgName}
          createdAt={createdAt}
        />
        <div className="comment-content">
          <p>{content}</p>
        </div>
        <div className="options">
          <Scoring score={score} />
          <Actions isUser={user.username === currentUsername} />
        </div>
      </article>
      {replies && (
        <div className="replies">
          {replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply.id}
              currentUsername={currentUsername}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Comment;
