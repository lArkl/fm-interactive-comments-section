import React from "react";
import "./styles.css";

function Scoring({ scoreInfo, updateScore }) {
  const { score, scoreStatus } = scoreInfo;
  return (
    <div className="scoring">
      <button
        isPressed={(scoreStatus === SCORE_STATUS.PLUS).toString()}
        onClick={() => {
          const delta =
            scoreStatus === SCORE_STATUS.MINUS
              ? 2
              : scoreStatus === SCORE_STATUS.PLUS
              ? -1
              : 1;
          const newStatus =
            scoreStatus === SCORE_STATUS.PLUS
              ? SCORE_STATUS.NONE
              : SCORE_STATUS.PLUS;
          updateScore(score + delta, newStatus);
        }}
      ></button>
      <div>{score}</div>
      <button
        isPressed={(scoreStatus === SCORE_STATUS.MINUS).toString()}
        disabled={score < 1 && scoreStatus !== SCORE_STATUS.MINUS}
        onClick={() => {
          const delta =
            scoreStatus === SCORE_STATUS.MINUS
              ? 1
              : scoreStatus === SCORE_STATUS.PLUS
              ? -2
              : -1;
          const newStatus =
            scoreStatus === SCORE_STATUS.MINUS
              ? SCORE_STATUS.NONE
              : SCORE_STATUS.MINUS;
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
