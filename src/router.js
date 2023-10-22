import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import Field from "./containers/Field/Field";

const App = () => {
  const [playerDifficulty, setPlayerDifficulty] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/field"
          element={
            <Field
              playerDifficulty={playerDifficulty}
              playerName={playerName}
              setPlayerName={setPlayerName} 
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
