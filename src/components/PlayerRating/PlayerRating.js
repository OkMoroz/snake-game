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
      let player = null;
      try {
        const playerDataString = localStorage.getItem(name);
        console.log("Player data from localStorage:", playerDataString);

        // Перевірка на валідність JSON
        player = JSON.parse(playerDataString);
        if (!player || !player.playerDifficulty || !player.score) {
          throw new Error("Invalid player data");
        }
      } catch (error) {
        console.error(`Error parsing player data for ${name}:`, error);
        player = { name, difficulty: "easy", score: 0 };
      }

      return {
        name,
        difficulty: player?.playerDifficulty || "easy",
        score: player?.score || 0,
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
