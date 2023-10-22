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
        <h1>Ласкаво просимо до гри Snake!</h1>
        <p>Виберіть своє ім'я та рівень складності, щоб почати гру.</p>
        <button onClick={openModal}>Почати гру</button>

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
