import React, { useState} from "react";
import { useLocation } from "react-router-dom";

import "./Game.css";
import GameOver from "../GameOver/GameOver";
import Keyboard from "../Keyboard/Keyboard";
import Collision from "../Collision/Collision";

const Game = () => {
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
  const { playerDifficulty, playerName, gameSpeed } = location.state;

  return (
    <div className="field">
      <div className="game-info">
        <div className="game-name">Player: {playerName}</div>
        <div className="game-name">Score: {score}</div>
        <div className="game-name">Difficulty: {playerDifficulty}</div>
      </div>
      <div className="board">
        {Array.from({ length: boardSize }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: boardSize }).map((_, colIndex) => {
              const isSnakeHead =
                rowIndex === snake[0].row && colIndex === snake[0].col;
              return (
                <div
                  key={colIndex}
                  className={`cell${
                    snake.some(
                      (segment) =>
                        segment.row === rowIndex && segment.col === colIndex
                    )
                      ? isSnakeHead
                        ? " snake-head"
                        : " snake-tail"
                      : food.row === rowIndex && food.col === colIndex
                      ? " food"
                      : ""
                  }`}
                ></div>
              );
            })}
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
            />
            <Keyboard direction={direction} setDirection={setDirection} />
            <GameOver
              playerName={playerName}
              score={score}
              playerDifficulty={playerDifficulty}
              isModalOpen={isModalOpen}
              gameOver={gameOver}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
