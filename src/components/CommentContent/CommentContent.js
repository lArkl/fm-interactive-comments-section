import React from "react";
import "./styles.css";

function CommentContent({ isEditing, replyingTo, contentHook }, ref) {
  const [content, updateContent] = contentHook;
  return (
    <div className="comment-content">
      {isEditing ? (
        <textarea
          onChange={(ev) => updateContent(ev.target.value)}
          defaultValue={`@${replyingTo} ${replaceReply(content)}`}
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
