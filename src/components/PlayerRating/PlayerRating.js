import React, { useState, useEffect } from "react";

const PlayerRating = ({ setPlayerName }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [playerRatings, setPlayerRatings] = useState({
    easy: [],
    medium: [],
    hard: [],
  });

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("playerRatings"));
    if (storedRatings) {
      setPlayerRatings(storedRatings);
    }
  }, []);

  const sortPlayersByRating = (players) => {
    return players.slice().sort((a, b) => b.rating - a.rating);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  return (
    <div className="player-rating">
      <h2 className="second-title">Leaderboard</h2>
      <div>
        <label className="level">Select level: </label>
        <select
          className="input-text"
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <ul>
        {sortPlayersByRating(playerRatings[selectedDifficulty]).map(
          (player, index) => (
            <li key={index}>
              {player.name}: {player.rating}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default PlayerRating;
