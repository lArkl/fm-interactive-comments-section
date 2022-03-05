import React, { useState } from 'react';
import PlusImg from "../../images/icon-plus.svg";
import MinusImg from "../../images/icon-minus.svg";
import ReplyImg from "../../images/icon-reply.svg";
import images from "../../images/avatars/*.webp";


function Comment (props) {
  const { content, createdAt, user, replies } = props.comment;
  const imgName = user.image.webp.match(/[-a-z]+(?=.webp$)/);
  const [score, updateScore] = useState(props.score);
  return (
    <>
    <div>
      <article className="comment">
        <div className="comment-header">
          <div className="comment-header__image">
            <img src={images[imgName]} alt="user" />
          </div>
          <div className="comment-header__user">{user.username}</div>
          <div className="comment-header__date">{createdAt}</div>
        </div>
        <div className="comment-content">
          <p>
            {content}
          </p>
        </div>
        <div className="comment-scoring">
          <div><img src={PlusImg} alt="plus"/></div>
          <div>{score}</div>
          <div><img src={MinusImg} alt="minus"/></div>
        </div>
        <div className="comment-actions">
          <div className="comment-actions__reply">
            <img src={ReplyImg} alt="reply" />
            Reply
          </div>
        </div>
      </article>
    </div>
    <div className='replies'>
      {replies && replies.map(reply => (
        <Comment comment={reply} key={reply.id}/>
      ))}
    </div>
    </>
  )
}

export default Comment;