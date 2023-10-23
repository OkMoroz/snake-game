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

  return (
    <div className="player-rating">
      <h2 className="second-title">Leaderboard</h2>
      <div>
        <label className="level">Select level: </label>
        <select
          className="input-text"
          value={selectedDifficulty}
          onChange={(event) => setSelectedDifficulty(event.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <ul>
        {playerRatings[selectedDifficulty].map((player, index) => (
          <li key={index}>
            {player.name}: {player.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerRating;
