import React, { useState } from "react";

import "./Login.css";
import Logo from "../../components/Logo/Logo";
import logo from "../../assets/image/logo.png";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функція для відкриття модального вікна
  const openModal = () => {
    setIsModalOpen(true);
  };

  const onSubmit = (playerData) => {
    console.log("Дані для входу:", playerData);
  };

  return (
    <>
      <Logo />
      <div className="login-container">
        <h1 className="title">Welcome to the Snake game!</h1>
        <div className="snakes">
          <img src={logo} alt="snake" className="snake-left" />
          <img src={logo} alt="snake" className="snake-right" />
        </div>
        <p className="wrapper">
          Enter your name and choose the difficulty level to start the game.
        </p>
        <button
          onClick={openModal}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              openModal();
            }
          }}
          className="primary-button"
        >
          Login
        </button>

        <ModalWindow
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default Login;
