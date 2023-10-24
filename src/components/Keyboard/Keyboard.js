import { useEffect } from "react";

const Keyboard=({ direction, setDirection })=> {
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
}
export default Keyboard;
