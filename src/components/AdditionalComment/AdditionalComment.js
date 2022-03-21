import React, { useState } from "react";
import images from "../../../images/avatars/*.png";
import "./styles.css";

function AdditionalComment({ replyTo, user, onAddComment }) {
  const [content, setContent] = useState("");
  const imgName = user.image.png.match(/[-a-z]+(?=.png$)/);
  return (
    <div className="additional">
      <textarea
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add comment..."
        value={content}
      ></textarea>
      <div className="additional__bar">
        <img src={images[imgName]} alt={user.username} />
        <button
          className="other-button"
          onClick={() => {
            onAddComment(content);
            setContent("");
          }}
        >
          {replyTo ? "REPLY" : "SEND"}
        </button>
      </div>
    </div>
  );
}

export default AdditionalComment;
