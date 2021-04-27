import React, { useEffect, useState } from 'react';
import axios from 'axios'



function Trump(props) {
  let voices;
  let quote;
  let msg = new SpeechSynthesisUtterance();

  speechSynthesis.addEventListener("voiceschanged", () => {
    voices = speechSynthesis.getVoices();
    const response = axios.get('http://tronalddump.io/random/quote')
      .then((response) => {
        quote = response.data.value;
      });
  });

  function speak() {
    axios.get('http://tronalddump.io/random/quote')
      .then((response) => {
        quote = response.data.value;
        if (voices.length) {
          msg.voice = voices[Math.floor(Math.random() * voices.length)];
          msg.text = quote;
          window.speechSynthesis.speak(msg);
        }
        console.log(voices);
        console.log(quote);
      });
  }

  return (
    <div>
      <h1>Speech Ting</h1>
      <button>Speech</button>
    </div>
  );
}

export default Trump;