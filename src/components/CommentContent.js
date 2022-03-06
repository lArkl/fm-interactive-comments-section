import React from "react";

function CommentContent({ isEditing, updateContent, children }) {
  return (
    <div className="comment-content">
      {isEditing ? (
        <textarea
          value={children}
          onChange={(e) => updateContent(e.target.value)}
        >
          {children}
        </textarea>
      ) : (
        <p>{children}</p>
      )}
    </div>
  );
}

export default CommentContent;
