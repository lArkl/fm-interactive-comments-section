import { useEffect, useState } from "react";

const DATA_KEY = "data";
const ID_KEY = "maxId";
const USE_LOCAL_STORAGE = true;

function calcMaxId(data) {
  const ids = data.comments
    .map((e) => e.replies.map((r) => r.id).concat([e.id]))
    .flat();
  return Math.max(...ids);
}

function UseCommentsData() {
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentId, updateCurrentId] = useState(-1);

  useEffect(() => {
    const localData = USE_LOCAL_STORAGE && localStorage.getItem(DATA_KEY);
    let data = {};
    let maxId = 0;
    if (localData) {
      data = JSON.parse(localData);
      maxId = parseInt(localStorage.getItem(ID_KEY));
    } else {
      data = require("../../../data.json");
      maxId = calcMaxId(data);
    }
    setComments(data.comments);
    setCurrentUser(data.currentUser);
    updateCurrentId(maxId);
  }, []);

  useEffect(() => {
    if (USE_LOCAL_STORAGE) {
      localStorage.setItem(
        DATA_KEY,
        JSON.stringify({
          comments,
          currentUser,
        })
      );
    }
  }, [comments]);

  function deleteComment(commentId, replyId) {
    const auxComments = [...comments];
    const commentIdx = auxComments.findIndex((c) => c.id === commentId);
    if (replyId) {
      const replyIdx = auxComments[commentIdx].replies.findIndex(
        (r) => r.id === replyId
      );
      auxComments[commentIdx].replies.splice(replyIdx, 1);
    } else {
      auxComments.splice(commentIdx, 1);
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

  function addComment(content, commentId = -1, replyingTo = false) {
    const newCurrentId = currentId + 1;
    const newComment = {
      id: newCurrentId,
      content,
      localDate: Date.now(),
      score: 0,
      user: currentUser,
    };
    const newComments = [...comments];
    if (commentId > -1) {
      const comment = newComments.find((c) => c.id === commentId);
      newComment.replyingTo = replyingTo ?? comment.user.username;
      comment.replies.push(newComment);
    } else {
      newComment.replies = [];
      newComments.push(newComment);
    }
    setComments(newComments);
    updateCurrentId(newCurrentId);
    if (USE_LOCAL_STORAGE) {
      localStorage.setItem(ID_KEY, newCurrentId);
    }
  }

  return [currentUser, comments, updateComment, deleteComment, addComment];
}

export { UseCommentsData };
