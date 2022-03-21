import React from "react";
import "./styles.css";

function CommentContent({ isEditing, replyingTo, contentHook }) {
  const [content, updateContent] = contentHook;
  const defaultValue =
    (replyingTo ? `@${replyingTo} ` : "") + `${replaceReply(content)}`;
  return (
    <div className="comment-content">
      {isEditing ? (
        <textarea
          onChange={(ev) => {
            updateContent(ev.target.value);
          }}
          defaultValue={defaultValue}
        ></textarea>
      ) : (
        <p>
          {replyingTo && <span className="replying">@{replyingTo} </span>}
          {replaceReply(content)}
        </p>
      )}
    </div>
  );
}

export default CommentContent;

export function replaceReply(content) {
  return content.replace(/@\w+/, "").trim();
}
