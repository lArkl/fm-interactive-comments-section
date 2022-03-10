import React from "react";
import "./styles.css"
import images from "../../../images/avatars/*.webp";

function Header({ username, imgName, createdAt, isUser }) {
  return (
    <div className="header">
      <div className="header__image">
        <img src={images[imgName]} alt="user" />
      </div>
      <div className="header__user">{username}</div>
      {isUser && <div className="header__you">you</div>}
      <div className="header__date">{createdAt}</div>
    </div>
  );
}

export default Header;
