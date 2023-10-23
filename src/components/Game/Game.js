import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Game.css";
import ModalWindow from "../ModalWindow/ModalWindow";

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
  const [lastPlayerName, setLastPlayerName] = useState("");
  const location = useLocation();
  const { playerDifficulty, playerName, gameSpeed } = location.state;
  

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "a":
        case "ArrowLeft":
          if (direction !== "DOWN") setDirection("UP");
          break;

        case "w":
        case "ArrowUp":
          if (direction !== "RIGHT") setDirection("LEFT");

          break;
        case "d":
        case "ArrowRight":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "s":
        case "ArrowDown":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    const checkCollision = () => {
      const head = snake[0];

      if (head.row < 0) {
        head.row = boardSize - 1;
      } else if (head.row >= boardSize) {
        head.row = 0;
      }
      if (head.col < 0) {
        head.col = boardSize - 1;
      } else if (head.col >= boardSize) {
        head.col = 0;
      }

      const newSnake = [...snake];
      const newHead = { ...newSnake[0] };
      const endGame = () => {
        setGameOver(true);
      };
      for (let i = 2; i < newSnake.length; i++) {
        if (head.row === newSnake[i].row && head.col === newSnake[i].col) {
          endGame();
          return;
        }
      }

      if (newHead.row === food.row && newHead.col === food.col) {
        setScore(score + 1);
        setFood(generateFoodPosition(newSnake));
        newSnake.unshift({ ...newHead });
      } else {
        newSnake.pop();
        switch (direction) {
          case "UP":
            newHead.row -= 1;
            break;
          case "RIGHT":
            newHead.col += 1;
            break;
          case "DOWN":
            newHead.row += 1;
            break;
          case "LEFT":
            newHead.col -= 1;
            break;
          default:
            break;
        }
        newSnake.unshift(newHead);
      }

      setSnake(newSnake);
    };

    const gameInterval = setInterval(checkCollision, 200);

    return () => {
      clearInterval(gameInterval);
    };
  }, [snake, food, direction, score]);

  const generateFoodPosition = (snake) => {
    let foodPosition;
    do {
      foodPosition = {
        row: Math.floor(Math.random() * boardSize),
        col: Math.floor(Math.random() * boardSize),
      };
    } while (
      snake.some(
        (segment) =>
          segment.row === foodPosition.row && segment.col === foodPosition.col
      )
    );
    return foodPosition;
  };

  const handleRestart = () => {
    if (playerName) {
      setLastPlayerName(playerName);
    }
    setGameOver(false);
    setScore(0);
    setDirection("RIGHT");
    setSnake([
      { row: 0, col: 4 },
      { row: 0, col: 3 },
      { row: 0, col: 2 },
      { row: 0, col: 1 },
      { row: 0, col: 0 },
    ]);
    setFood(generateFoodPosition(snake));
  };

  return (
    <div className="field">
      <div className="game-info">
        <div className="game-name">Player: '{playerName}'</div>
        <div className="game-name">Score: {score}</div>
        <div className="game-name">Difficulty: {playerDifficulty}</div>
      </div>
      {gameOver && (
        <div className="game-over-modal">
          <h2>GAME OVER</h2>
          <p>Player: {playerName}</p>
          <p>Score: {score}</p>
          <p>Difficulty: {playerDifficulty}</p>
          {!isModalOpen && (
            <button
              className="primary-button"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Restart
            </button>
          )}
          <ModalWindow
            isOpen={isModalOpen}
            onRequestClose={() => {
              setIsModalOpen(false);
              window.location.reload();
            }}
          />
        </div>
      )}

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
