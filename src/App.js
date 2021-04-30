import "./App.css";
import Trump from "./Trump";
import Conversation from "./Conversation/Conversation";
import LandingPage from "./Conversation/LandingPage";
import React, { useEffect, useState } from "react";
import Dictaphone from "./Conversation/Dictaphone";

function App() {
  return (
    <div>
      <LandingPage />

      <div className="App flex-col align-center">
        <div className="body-container">
          <div className="cartoon-contain">
            <img id="kanye-img" src="../assets/kanye.jpg" alt="kanye" />
          </div>
          <div className="phone-container">
            <Conversation />
            <img id="keyboard" src="../assets/keyboard.jpeg" />
          </div>
          <div className="cartoon-contain">
            <img id="trump-img" src="../assets/trump.png" alt="trump" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
