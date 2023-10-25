import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./Game.css";
import GameOver from "../GameOver/GameOver";
import Keyboard from "../Keyboard/Keyboard";
import GameInfo from "../GameInfo/GameInfo";
import Board from "../Board/Board";
import Collision from "../Collision/Collision";

const Game = ({ onSubmit }) => {
  const boardSize = 25;
  const [snake, setSnake] = useState([
    { row: 0, col: 4 },
    { row: 0, col: 3 },
    { row: 0, col: 2 },
    { row: 0, col: 1 },
    { row: 0, col: 0 },
  ]);
  const [food, setFood] = useState({ row: 5, col: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { playerDifficulty, playerName } = location.state;
  const handleStartNewGameWithPlayer = () => {
    setSnake([
      { row: 0, col: 4 },
      { row: 0, col: 3 },
      { row: 0, col: 2 },
      { row: 0, col: 1 },
      { row: 0, col: 0 },
    ]);
    setFood({ row: 5, col: 5 });
    setDirection("RIGHT");
    setScore(0);
    setIsModalOpen(true);
    onSubmit();
  };

  return (
    <div className="field">
      <GameInfo
        playerName={playerName}
        score={score}
        playerDifficulty={playerDifficulty}
      />
      <Board boardSize={boardSize} snake={snake} food={food} />
      <Collision
        snake={snake}
        setSnake={setSnake}
        food={food}
        setFood={setFood}
        boardSize={boardSize}
        direction={direction}
        setGameOver={setGameOver}
        score={score}
        setScore={setScore}
        playerDifficulty={playerDifficulty}
      />
      <Keyboard direction={direction} setDirection={setDirection} />
      <GameOver
        playerName={playerName}
        score={score}
        playerDifficulty={playerDifficulty}
        isModalOpen={isModalOpen}
        gameOver={gameOver}
        setIsModalOpen={setIsModalOpen}
        onSubmit={handleStartNewGameWithPlayer}
      />
    </div>
  );
};

export default Game;
