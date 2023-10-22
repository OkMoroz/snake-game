import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalWindow = ({ isOpen, onRequestClose, onSubmit }) => {
  const [playerName, setPlayerName] = useState("");
  const [playerDifficulty, setPlayerDifficulty] = useState("easy");
  const [error, setError] = useState("");
  const [isPlayerNameEntered, setIsPlayerNameEntered] = useState(false);
  const navigate = useNavigate();

  const handlePlayerNameChange = (event) => {
    const newName = event.target.value;
    setPlayerName(newName);
    setIsPlayerNameEntered(newName !== "");
  };

  const handleSubmit = () => {
    const existingPlayerData = JSON.parse(localStorage.getItem(playerName));

    if (existingPlayerData) {
      setError("Таке ім'я вже існує. Виберіть інше ім'я.");
    } else if (playerName === "") {
      setError("Ви не ввели ім'я.");
    } else {
      const newPlayerData = {
        playerName,
        playerDifficulty,
        rating: 0,
      };

      const speedOptions = {
        easy: 1000,
        medium: 500,
        hard: 250,
      };
      const gameSpeed = speedOptions[playerDifficulty];

      onSubmit({ ...newPlayerData, gameSpeed });

      localStorage.setItem(playerName, JSON.stringify(newPlayerData));
      onRequestClose();
      navigate("/field");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Логін">
      <h2>Логін</h2>
      <div>
        <label>Ім'я:</label>
        <input
          type="text"
          value={playerName}
          placeholder="Введіть ім'я гравця"
          onChange={handlePlayerNameChange}
        />
      </div>
      <div>
        <label>Рівень складності:</label>
        <select
          value={playerDifficulty}
          onChange={(event) => setPlayerDifficulty(event.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Почати гру</button>
      {error && <p className="error">{error}</p>}
    </Modal>
  );
};

export default ModalWindow;
