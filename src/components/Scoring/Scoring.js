import React, { useState } from "react";
import PlusImg from "../../../images/icon-plus.svg";
import MinusImg from "../../../images/icon-minus.svg";
import "./styles.css";

function Scoring(props) {
  const [score, updateScore] = useState(props.score);
  return (
    <div className="scoring">
      <button onClick={() => updateScore((score) => score + 1)}>
        <img src={PlusImg} alt="plus" />
      </button>
      <div>{score}</div>
      <button
        onClick={() => updateScore((score) => score - 1)}
        disabled={score < 1}
      >
        <img src={MinusImg} alt="minus" />
      </button>
    </div>
  );
}

export default Scoring;
