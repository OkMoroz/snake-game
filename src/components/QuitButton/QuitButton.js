import React from "react";

const QuitButton = ({ onQuit }) => {
  return (
    <button onClick={onQuit} className="primary-button">
      Quit
    </button>
  );
};

export default QuitButton;
