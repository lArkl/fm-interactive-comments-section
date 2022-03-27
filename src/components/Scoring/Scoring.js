import React from "react";
import "./styles.css";

function Scoring({ scoreInfo, updateScore }) {
  const { score, scoreStatus } = scoreInfo;
  return (
    <div className="scoring">
      <button
        aria-pressed={scoreStatus === SCORE_STATUS.PLUS}
        onClick={() => {
          const [delta, newStatus] = getPlusScore(scoreStatus);
          updateScore(score + delta, newStatus);
        }}
      ></button>
      <div>{score}</div>
      <button
        aria-pressed={scoreStatus === SCORE_STATUS.MINUS}
        disabled={score < 1 && scoreStatus !== SCORE_STATUS.MINUS}
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
