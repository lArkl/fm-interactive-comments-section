import React from "react";
import images from "../../images/avatars/*.webp";

function Header({ username, imgName, createdAt }) {
  return (
    <div className="header">
      <div className="header__image">
        <img src={images[imgName]} alt="user" />
      </div>
      <div className="header__user">{username}</div>
      <div className="header__date">{createdAt}</div>
    </div>
  );
}

export default Header;
