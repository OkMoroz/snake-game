export function generateFoodPosition(snake, boardSize) {
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
}
