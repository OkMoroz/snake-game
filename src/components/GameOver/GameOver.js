import React from "react";
import ModalWindow from "../ModalWindow/ModalWindow";

const GameOver = ({
  playerName,
  score,
  playerDifficulty,
  isModalOpen,
  gameOver,
  setIsModalOpen,
}) => {
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
