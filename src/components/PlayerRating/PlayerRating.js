import React, { useState, useEffect } from "react";
import "./PlayerRating.css";

const PlayerRating = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playerNames = Object.keys(localStorage);
    const playerData = playerNames.map((name) => {
      const player = JSON.parse(localStorage.getItem(name));
      return {
        name,
        difficulty: player.playerDifficulty,
        score: player.score || 0,
      };
    });

    playerData.sort((player1, player2) => player2.score - player1.score);

    setPlayers(playerData);
  }, []);

  return (
    <div className="player-rating">
      <h2 className="second-title">PLAYER RATING</h2>
      <ol className="items">
        <li className="item header">
          <span className="place">PLACE</span>
          <span className="name">NAME</span>
          <span className="score">SCORE</span>
          <span className="difficulty">DIFFICULTY</span>
        </li>
        {players.map((player, index) => (
          <li key={index} className="item">
            <span className="place">{index + 1}</span>
            <span className="name">{player.name}</span>
            <span className="score">{player.score}</span>
            <span className="difficulty">{player.difficulty}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PlayerRating;
