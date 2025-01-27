export function generateFoodPosition(snake, boardSize) {
  let foodPosition;

  const isFoodOnSnake = (foodPosition) => {
    return snake.some(
      (segment) =>
        segment.row === foodPosition.row && segment.col === foodPosition.col
    );
  };
  
  do {
    foodPosition = {
      row: Math.floor(Math.random() * boardSize),
      col: Math.floor(Math.random() * boardSize),
    };
  } while (isFoodOnSnake(foodPosition));

  return foodPosition;
}
