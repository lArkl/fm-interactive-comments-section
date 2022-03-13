import React, { useState } from "react";
import Comment from "../Comment";
import AdditionalComment from "../AdditionalComment/AdditionalComment";
import { UseCommentsData } from "./UserCommentsHook";

function UserComments() {
  const [currentUser, comments, updateComment, deleteComment, addComment] =
    UseCommentsData();

  const [showAddComment, updateShowAddComment] = useState(false);
  const [replyInfo, updateReplyInfo] = useState({ replyTo: "", commentId: "" });

  const onReply = (replyTo, commentId) => {
    updateShowAddComment(true);
    updateReplyInfo({ replyTo, commentId });
  };

  return (
    <section>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            comment={comment}
            deleteComment={() => deleteComment(comment.id)}
            updateComment={() => updateComment(comment.id)}
            currentUsername={currentUser.username}
            onReply={onReply}
          />
          {comment.replies ? (
            <div className="replies">
              {comment.replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  deleteComment={() => deleteComment(comment.id, reply.id)}
                  updateComment={(fieldObject) =>
                    updateComment(fieldObject, comment.id, reply.id)
                  }
                  onReply={onReply}
                  currentUsername={currentUser.username}
                />
              ))}
            </div>
          ) : null}
          {showAddComment && replyInfo.commentId === comment.id && (
            <AdditionalComment
              user={currentUser}
              replyTo={replyInfo.replyTo}
              onAddComment={(content) => {
                addComment(content, comment.id);
                updateShowAddComment(false);
              }}
            />
          )}
        </div>
      ))}
      {currentUser && (
        <AdditionalComment user={currentUser} onAddComment={addComment} />
      )}
    </section>
  );
}

export default UserComments;
