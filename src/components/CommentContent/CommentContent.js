import React from "react";
import "./styles.css";

function CommentContent({ isEditing, replyingTo, contentHook }, ref) {
  const [content, updateContent] = contentHook;
  const formatedContent = formatContent(content, replyingTo, isEditing);
  return (
    <div className="comment-content">
      {isEditing ? (
        <textarea
          onChange={(ev) => {
            const replacedContent = formatContent(
              ev.target.value,
              replyingTo,
              false
            );
            updateContent(replacedContent);
          }}
          defaultValue={formatedContent}
        ></textarea>
      ) : (
        <p>
          {replyingTo && <span className="replying">@{replyingTo} </span>}
          {formatedContent}
        </p>
      )}
    </div>
  );
}

export default CommentContent;

function formatContent(content, replyingTo, isEditing) {
  if (isEditing) {
    return `@${replyingTo} ${content}`;
  }
  return content.replace(/@\w+/, "").trim();
}
