import { useEffect, useState } from "react";

const DATA_KEY = "data";
const USE_LOCAL_STORAGE = false;

function UseCommentsData() {
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const localData = USE_LOCAL_STORAGE && localStorage.getItem(DATA_KEY);
    const data = localData
      ? JSON.parse(localData)
      : require("../../../data.json");
    setComments(data.comments);
    setCurrentUser(data.currentUser);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      DATA_KEY,
      JSON.stringify({
        comments,
        currentUser,
      })
    );
  }, [comments]);

  function deleteComment(commentId, replyId) {
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
  }

  function updateComment(fieldObject, commentId, replyId) {
    const auxComments = [...comments];
    let comment = auxComments.find((c) => c.id === commentId);
    if (replyId) {
      comment = comment.replies.find((r) => r.id === replyId);
    }
    Object.entries(fieldObject).forEach(([field, value]) => {
      comment[field] = value;
    });
    setComments(auxComments);
  }

  function addComment(content, commentId = -1) {
    const newComment = {
      id: Math.floor(Math.random() * 100) + 10,
      content,
      createdAt: new Date().toLocaleString(),
      score: 0,
      user: currentUser,
    };
    const newComments = [...comments];
    if (commentId > -1) {
      const comment = newComments.find((c) => c.id === commentId);
      newComment.replyingTo = comment.user.username;
      comment.replies.push(newComment);
    } else {
      newComment.replies = [];
      newComments.push(newComment);
    }
    setComments(newComments);
  }

  return [currentUser, comments, updateComment, deleteComment, addComment];
}

export { UseCommentsData };
