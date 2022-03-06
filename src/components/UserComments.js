import React, { useEffect, useState } from "react";
import Comment from "./Comment";

function UserComments(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const data = require("../../data.json");
    setComments(data.comments);
    setCurrentUser(data.currentUser);
  }, []);

  const deleteComment = (commentId, replyId) => {
    const auxComments = [...comments];
    const commentIdx = auxComments.findIndex((c) => c.id === commentId);
    if (replyId) {
      const replyIdx = auxComments[commentIdx].replies.findIndex(
        (r) => r.id === replyId
      );
      delete auxComments[commentIdx].replies[replyIdx];
    } else {
      delete auxComments[commentIdx];
    }
    setComments(auxComments);
  };

  const updateComment = (content, commentId, replyId) => {
    const auxComments = [...comments];
    const comment = auxComments.find((c) => c.id === commentId);
    if (replyId) {
      const reply = comment.replies.find((r) => r.id === replyId);
      reply.content = content;
    } else {
      comment.content = content;
    }
    console.log(auxComments);
    setComments(auxComments);
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
          />
          {comment.replies ? (
            <div className="replies">
              {comment.replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  deleteComment={() => deleteComment(comment.id, reply.id)}
                  updateComment={(content) =>
                    updateComment(content, comment.id, reply.id)
                  }
                  currentUsername={currentUser.username}
                />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </section>
  );
}

export default UserComments;
