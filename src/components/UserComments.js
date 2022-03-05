import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import images from "../../images/avatars/*.webp";

function UserComments (props) {

  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const data = require('../../data.json');
    setComments(data.comments);
    setCurrentUser(data.currentUser);
  }, []);
  return (
    <section>
      {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
    </section>
  )
}

export default UserComments;