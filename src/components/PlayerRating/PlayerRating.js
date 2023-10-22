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
      <h2>Рейтинг гравців</h2>
      <div>
        <label>Select Difficulty: </label>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
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
