import React from "react";

import "./Field.css";
import Logo from "../../components/Logo/Logo";
import Game from "../../components/Game/Game";
import PlayerRating from "../../components/PlayerRating/PlayerRating";

const Field = () => {
  return (
    <div>
      <Logo />
      <div className="field-container">
        <div className="left-section">
          <Game />
        </div>
        <div className="right-section">
          <PlayerRating />
        </div>
      </div>
    </div>
  );
};

export default Field;
