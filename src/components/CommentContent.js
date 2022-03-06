import React from "react";

function CommentContent({ isEditing, updateContent, children }) {
  return (
    <div className="comment-content">
      {isEditing ? (
        <textarea
          defaultValue={children}
          onChange={(e) => updateContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{children}</p>
      )}
    </div>
  );
}

export default CommentContent;
