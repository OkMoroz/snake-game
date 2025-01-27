import { useEffect } from "react";
import { generateFoodPosition } from "../FoodPosition/FoodPosition";

const Collision = ({
  snake,
  setSnake,
  food,
  setFood,
  boardSize,
  direction,
  setGameOver,
  score,
  setScore,
  playerDifficulty,
}) => {
  useEffect(() => {
    const checkCollision = () => {
      const head = snake[0];

      // Зіткнень з межами гри
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

      // Зіткнень з самим собою
      for (let i = 2; i < newSnake.length; i++) {
        if (head.row === newSnake[i].row && head.col === newSnake[i].col) {
          endGame();
          return;
        }
      }

      // Поїдання їжі та збільшення рахунку
      if (newHead.row === food.row && newHead.col === food.col) {
        setScore(score + 1);
        setFood(generateFoodPosition(newSnake));
        const newFoodPosition = generateFoodPosition(newSnake, boardSize);

        setFood(newFoodPosition);

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

    // Визначаю швидкості гри залежно від рівня складності гравця
    let gameSpeed = 0;

    if (playerDifficulty === "easy") {
      gameSpeed = 500;
    } else if (playerDifficulty === "medium") {
      gameSpeed = 200;
    } else if (playerDifficulty === "hard") {
      gameSpeed = 100;
    }

    const gameInterval = setInterval(checkCollision, gameSpeed);

    return () => {
      clearInterval(gameInterval);
    };
  }, [
    snake,
    setSnake,
    food,
    setFood,
    boardSize,
    direction,
    setGameOver,
    score,
    setScore,
    playerDifficulty,
  ]);
};

export default Collision;
