import React, { useState, useEffect } from 'react';
import './Conversation.css';
import Trump from '../Trump';
import axios from 'axios'

let isTrump = true;

function Conversation(props) {
  let [trumpQuote, setTrumpQuote] = useState('');
  let [kanyeQuote, setKanyeQuote] = useState('');
  let [voices, setVoices] = useState([]);
  let [loading, setLoading] = useState(true);
  let [convo, setConvo] = useState([]);


  //init tts
  let msg = new SpeechSynthesisUtterance();

  //get english voices
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      let allVoices = window.speechSynthesis.getVoices();
      console.log(allVoices);
      setVoices(allVoices.filter((voice) => {
        return voice.lang.includes('en')
      }))
    };

    props.log('from a child')
  }, []);

  function trumpQuotes(message) {
    return (
      <div className='outgoing'>
        <div className='outgoing-container'>
          <span className='outgoing-text message-box'>{message}</span>
          <span className='delivered'>Delivered</span>
        </div>
      </div>
    )
  }

  function kanyeQuotes(message) {
    return (
      <div className='incoming'>
        <div className='incoming-container'>
          <span className='incoming-text message-box'>{message} </span>
        </div>
      </div>
    )
  }

  function handleClick() {
    if (isTrump) {
      axios
        .get('http://tronalddump.io/random/quote')
        .then((response) => {
          setTrumpQuote(response.data.value);
          msg.text = 'test123';
          msg.voice = voices[Math.floor(Math.random() * voices.length)];
          setConvo([...convo, trumpQuotes(response.data.value)]);
          window.speechSynthesis.speak(msg);
        });
      isTrump = false;
    } else {
      axios
        .get('https://api.kanye.rest/')
        .then((response) => {
          setKanyeQuote(response.data.quote);
          msg.text = 'test456';
          msg.voice = voices[Math.floor(Math.random() * voices.length)];

          setConvo([...convo, kanyeQuotes(response.data.quote)]);
          window.speechSynthesis.speak(msg);
        });
      isTrump = true;
    }
  }

  return (
    <div style={{position: 'relative'}}>
      {convo}
      <img id='keyboard' src='../assets/keyboard.jpeg' />
      <button className='sendBtn' onClick={handleClick} >Send</button>
    </div>
  );
}

export default Conversation;




