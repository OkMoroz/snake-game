import React, { useState } from "react";

import "./Login.css";
import Logo from "../../components/Logo/Logo";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playerNameFromLocalStorage = localStorage.getItem("playerName");

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Logo />
      <div className="login-container">
        <h1 className="title">Welcome to the Snake game!</h1>
        <p className="wrapper">
          Enter your name and choose the difficulty level to start the game.
        </p>
        <button onClick={openModal} className="primary-button">
          Login
        </button>

        <ModalWindow
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={(data) => {
            console.log("Дані для входу:", data);
          }}
          playerName={playerNameFromLocalStorage || "Player"}
        />
      </div>
    </>
  );
};

export default Login;
