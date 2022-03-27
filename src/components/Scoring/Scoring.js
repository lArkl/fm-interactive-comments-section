import React from "react";
import "./styles.css";

function Scoring({ scoreInfo, updateScore, isUser }) {
  const { score, scoreStatus } = scoreInfo;
  return (
    <div className="scoring">
      <button
        disabled={isUser}
        className={`scoring__button ${
          scoreStatus === SCORE_STATUS.PLUS ? "scoring__button--pressed" : ""
        }`}
        onClick={() => {
          const [delta, newStatus] = getPlusScore(scoreStatus);
          updateScore(score + delta, newStatus);
        }}
      ></button>
      <div>{score}</div>
      <button
        className={`scoring__button ${
          scoreStatus === SCORE_STATUS.MINUS ? "scoring__button--pressed" : ""
        }`}
        disabled={isUser || (score < 1 && scoreStatus !== SCORE_STATUS.MINUS)}
        onClick={() => {
          const [delta, newStatus] = getMinusScore(scoreStatus);
          updateScore(score + delta, newStatus);
        }}
      ></button>
    </div>
  );
}

export default Scoring;

const SCORE_STATUS = {
  PLUS: 1,
  NONE: 0,
  MINUS: -1,
};

function getPlusScore(scoreStatus) {
  if (scoreStatus === SCORE_STATUS.PLUS) {
    return [-1, SCORE_STATUS.NONE];
  }
  if (scoreStatus === SCORE_STATUS.MINUS) {
    return [2, SCORE_STATUS.PLUS];
  }
  return [1, SCORE_STATUS.PLUS];
}

function getMinusScore(scoreStatus) {
  if (scoreStatus === SCORE_STATUS.MINUS) {
    return [1, SCORE_STATUS.NONE];
  }
  if (scoreStatus === SCORE_STATUS.PLUS) {
    return [-2, SCORE_STATUS.MINUS];
  }
  return [-1, SCORE_STATUS.MINUS];
}
