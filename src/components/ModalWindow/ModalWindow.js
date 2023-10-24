import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
Modal.setAppElement("#root");

const ModalWindow = ({ isOpen, onRequestClose, playerData }) => {
  const [playerName, setPlayerName] = useState(
    playerData ? playerData.playerName : ""
  );
  const [playerDifficulty, setPlayerDifficulty] = useState(
    playerData ? playerData.playerDifficulty : "easy"
  );
  const [error, setError] = useState("");
  const [isPlayerNameEntered, setIsPlayerNameEntered] = useState(false);
  const navigate = useNavigate();

  const handlePlayerNameChange = (event) => {
    const newName = event.target.value;
    setPlayerName(newName);
    setIsPlayerNameEntered(newName !== "");
  };

  const handleSubmit = () => {
    if (playerName === "") {
      setError("You haven't entered a name. Enter your name");
    } else {
      const updatedPlayerData = {
        playerName,
        playerDifficulty,
        score: 0,
        rating: 0,
      };

      localStorage.setItem(playerName, JSON.stringify(updatedPlayerData));

      onRequestClose();
      navigate("/field", {
        state: { playerDifficulty, playerName },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Login"
      className="login-window"
    >
      <div className="input">
        <div>
          <label className="title-input">Name: </label>
          <input
            type="text"
            value={playerName}
            placeholder="Enter your name"
            onChange={handlePlayerNameChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
            className="input-text"
          />
        </div>
        <div>
          <label className="title-input">Level: </label>
          <select
            value={playerDifficulty}
            onChange={(event) => setPlayerDifficulty(event.target.value)}
            className="input-text"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <button onClick={handleSubmit} className="primary-button">
        Start game
      </button>
      {error && <p className="error">{error}</p>}
    </Modal>
  );
};

export default ModalWindow;
