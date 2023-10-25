import React, { useState, useEffect } from "react";
import "./PlayerRating.css";

const PlayerRating = () => {
  const [players, setPlayers] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  // Функція для фільтрації та сортування гравців
  const filterAndSortPlayers = (players, selectedDifficulty) => {
    const filteredPlayers = players.filter(
      (player) => player.difficulty === selectedDifficulty
    );

    filteredPlayers.sort((player1, player2) => player2.score - player1.score);

    return filteredPlayers;
  };

  const handleDifficultyChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDifficulty(selectedValue);
  };

  // Отримую списку імен гравців з localStorage

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

    // Рейтинг
    playerData.sort((player1, player2) => player2.score - player1.score);

    setPlayers(playerData);
  }, []);

  // Фільтрую гравців
  const filteredAndSortedPlayers = filterAndSortPlayers(
    players,
    selectedDifficulty
  );

  return (
    <div className="player-rating">
      <h2 className="second-title">PLAYER RATING</h2>
      <select
        value={selectedDifficulty}
        onChange={handleDifficultyChange}
        className="input-text"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <ol className="items">
        <li className="item header">
          <span className="place">PLACE</span>
          <span className="name">NAME</span>
          <span className="score">SCORE</span>
          <span className="difficulty">DIFFICULTY</span>
        </li>
        {filteredAndSortedPlayers.map((player, index) => (
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
