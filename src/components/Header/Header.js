import React from "react";
import "./styles.css";
import images from "../../../images/avatars/*.webp";

function Header({ username, imgName, createdAt, localDate, isUser, children }) {
  const date = localDate ? formatDate(localDate) : createdAt;
  return (
    <div className="header">
      <div className="header__data">
        <div className="header__image">
          <img src={images[imgName]} alt="user" />
        </div>
        <div className="header__user">{username}</div>
        {isUser && <div className="header__you">you</div>}
        <div className="header__date">{date}</div>
      </div>
      <div className="header__action">{children}</div>
    </div>
  );
}

export default Header;

const rtf1 = new Intl.RelativeTimeFormat("en", { style: "narrow" });
const dateUnits = [
  { ratio: 60, unit: "seconds" },
  { ratio: 60, unit: "minute" },
  { ratio: 24, unit: "hour" },
  { ratio: 30, unit: "day" },
  { ratio: 12, unit: "month" },
];

function formatDate(localDate) {
  const date = new Date(localDate);
  let diff = (date - Date.now()) / 1000;
  let unitIndex = 0;
  while (unitIndex < dateUnits.length && -diff > dateUnits[unitIndex].ratio) {
    diff /= dateUnits[unitIndex].ratio;
    unitIndex++;
  }
  const unit = dateUnits[Math.max(unitIndex - 1, 0)].unit;
  return rtf1.format(Math.floor(diff), unit);
}
