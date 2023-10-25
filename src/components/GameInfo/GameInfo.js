import React from "react";

const GameInfo = ({ playerName, score, playerDifficulty }) => {
  return (
    <div className="game-info">
      <div className="game-name">Player: {playerName}</div>
      <div className="game-name">Score: {score}</div>
      <div className="game-name">Difficulty: {playerDifficulty}</div>
    </div>
  );
};

export default GameInfo;
