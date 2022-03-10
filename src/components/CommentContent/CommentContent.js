import React, { forwardRef } from "react";
import "./styles.css";

function CommentContent({ isEditing, replyingTo, contentHook }, ref) {
  
  const [content, updateContent] = contentHook;
  return (
    <div className="comment-content">
      <p
        ref={ref}
        contentEditable={isEditing}
        onBlur={(e) => updateContent(e.currentTarget.textContent)}
        suppressContentEditableWarning
      >
        {replyingTo && <span className="replying">@{replyingTo}</span>} {content}
      </p>
    </div>
  );
}

export default forwardRef(CommentContent);
