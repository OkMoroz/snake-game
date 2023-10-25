import React from "react";

const Board = ({ boardSize, snake, food }) => {
  return (
    <div className="board">
      {Array.from({ length: boardSize }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: boardSize }).map((_, colIndex) => {
            // Визначаю, чи є ця комірка головою змії
            const isSnakeHead =
              rowIndex === snake[0].row && colIndex === snake[0].col;
            return (
              <div
                key={colIndex}
                className={`cell${
                  // Додаю класи в залежності від стану комірки (змія, голова, їжа)
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
  );
};

export default Board;
