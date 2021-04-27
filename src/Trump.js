import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Trump(props) {
  let [quote, setQuote] = useState('');
  let [voices, setVoices] = useState([]);

  //init tts
  let msg = new SpeechSynthesisUtterance();

  //get english voices
  useEffect(() => {
    async function getVoices() {
      let allVoices = await speechSynthesis.getVoices();
      console.log(allVoices)
      setVoices(allVoices.filter((voice) => {
        return voice.lang.includes('en')
      }))
    }
    getVoices();
  }, []);

  //talk and set text quote for use on page
  function handleClick() {
    axios
      .get('http://tronalddump.io/random/quote')
      .then((response) => {
        setQuote(response.data.value);
        msg.text = response.data.value;
        msg.voice = voices[Math.floor(Math.random() * voices.length)];
        console.log(msg.text, msg.voice)
        window.speechSynthesis.speak(msg);
      });
  }

  let tempStyles = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '300px',
    height: '20px',
    marginTop: '20px'
  };

  return (
    <div style={tempStyles}>
      {/*<span>{quote}</span>*/}
      <button onClick={handleClick}>Speech</button>
    </div>
  );
}

export default Trump;