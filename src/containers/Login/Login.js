import React, { useState } from "react";

import "./Login.css";
import Logo from "../../components/Logo/Logo";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
