import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import QuitButton from "../QuitButton/QuitButton";

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

  // Зміна імені гравця
  const handlePlayerNameChange = (event) => {
    const newName = event.target.value;
    setPlayerName(newName);
    setIsPlayerNameEntered(newName !== "");
  };

  // Функція, яка виконується при натисканні на кнопку "Start game"
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

      // Зберігаю дані гравця в localStorage.
      localStorage.setItem(playerName, JSON.stringify(updatedPlayerData));

      // Закриваємю модальне вікно та йду на сторінку гри
      onRequestClose();
      navigate("/field", {
        state: { playerDifficulty, playerName },
      });
    }
  };

  // Функція, яка виконується при натисканні на кнопку "Quit"
  const handleQuit = () => {
    if (window.location.pathname === "/") {
      onRequestClose();
    } else {
      navigate("/", { state: { fromRestart: true } });
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
      <div className="buttons">
        <button onClick={handleSubmit} className="primary-button">
          Start game
        </button>
        <QuitButton onQuit={handleQuit} />
      </div>
      {error && <p className="error">{error}</p>}
    </Modal>
  );
};

export default ModalWindow;
