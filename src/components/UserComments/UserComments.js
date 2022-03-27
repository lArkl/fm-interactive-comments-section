import React, { useState } from "react";
import Comment from "../Comment";
import AdditionalComment from "../AdditionalComment/AdditionalComment";
import { UseCommentsData } from "./UserCommentsHook";

function UserComments() {
  const [currentUser, comments, updateComment, deleteComment, addComment] =
    UseCommentsData();

  return (
    <section>
      <h1 className="sr-only">{currentUser?.username} comments and replies</h1>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            comment={comment}
            currentUser={currentUser}
            deleteComment={() => deleteComment(comment.id)}
            updateComment={(fieldObject) =>
              updateComment(fieldObject, comment.id)
            }
            addComment={(content) =>
              addComment(content, comment.id, comment.user.username)
            }
          />
          {comment.replies ? (
            <div className="replies">
              {comment.replies.map((reply) => (
                <Comment
                  comment={reply}
                  currentUser={currentUser}
                  key={reply.id}
                  deleteComment={() => deleteComment(comment.id, reply.id)}
                  updateComment={(fieldObject) =>
                    updateComment(fieldObject, comment.id, reply.id)
                  }
                  addComment={(content) => {
                    addComment(content, comment.id, reply.user.username);
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      ))}
      {currentUser && (
        <AdditionalComment user={currentUser} onAddComment={addComment} />
      )}
    </section>
  );
}

export default UserComments;
