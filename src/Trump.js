import React, { useEffect, useState } from 'react';
import axios from 'axios'



function Trump(props) {

  let voices;
  let msg = new SpeechSynthesisUtterance();

  speechSynthesis.addEventListener("voiceschanged", () => {
    voices = speechSynthesis.getVoices();
  });

  function speak() {
    if (voices.length) {
        msg.voice = voices[Math.floor(Math.random() * voices.length)];
        msg.text = "I am speaking";
        window.speechSynthesis.speak(msg);
    }
  }

  return (
    <div>
      <h1>Speech Ting</h1>
      <button onClick={speak}>Speech</button>
    </div>
  );
}

export default Trump;