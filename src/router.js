import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import Field from "./containers/Field/Field";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/field" element={<Field />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
