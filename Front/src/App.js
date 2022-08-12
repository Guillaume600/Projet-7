import Home from "Pages/Home/Home";
import Login from "Pages/Login/login";
import Signup from "Pages/Signup/signup";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Private from "Shared/Guard/private";
import Public from "Shared/Guard/public";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Private><Home /></Private>} />
        <Route path="login" element={<Public><Login /></Public>} />
        <Route path="signup" element={<Public><Signup /></Public>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
