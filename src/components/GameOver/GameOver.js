import React, { useEffect } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";

const GameOver = ({
  playerName,
  score,
  playerDifficulty,
  isModalOpen,
  gameOver,
  setIsModalOpen,
}) => {
  useEffect(() => {
    if (gameOver) {
      const existingPlayerData = JSON.parse(localStorage.getItem(playerName));
      if (existingPlayerData) {
        existingPlayerData.score = score;
        existingPlayerData.rating = calculateNewRating(existingPlayerData);
        localStorage.setItem(playerName, JSON.stringify(existingPlayerData));
      }
    }
  }, [gameOver, playerName, score]);

  function calculateNewRating(playerData) {
    const score = playerData.score;
    const newRating = score;

    return newRating;
  }

  return (
    <>
      {gameOver && (
        <div className="game-over-modal">
          <h2>GAME OVER</h2>
          <p>Player: {playerName}</p>
          <p>Score: {score}</p>
          <p>Difficulty: {playerDifficulty}</p>
          {!isModalOpen && (
            <button
              onClick={() => setIsModalOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setIsModalOpen(true);
                }
              }}
              className="primary-button"
            >
              Restart
            </button>
          )}
          <ModalWindow
            isOpen={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false);
              window.location.reload();
            }}
          />
        </div>
      )}
    </>
  );
};

export default GameOver;
