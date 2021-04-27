import React, { useState, useEffect } from 'react';
import './Conversation.css';
import Trump from '../Trump';
import axios from 'axios';

function Conversation(props) {
  let [voices, setVoices] = useState([]);
  let [convo, setConvo] = useState([]);
  let [isTrump, setIsTrump] = useState(true)
  let [typing, setTyping] = useState(false)


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

  async function handleClick() {
    const response = await axios.get('http://tronalddump.io/random/quote')
    msg.text = 'test';
    msg.voice = voices[Math.floor(Math.random() * voices.length)];
    setConvo([...convo, trumpQuotes(response.data.value)]);
    window.speechSynthesis.speak(msg);
    setIsTrump(false);
    setTyping(true)
    setTimeout(async () => {
      const response = await axios.get('https://api.kanye.rest/')
      msg.text = 'test';
      msg.voice = voices[Math.floor(Math.random() * voices.length)];
      setConvo(prevState => [...prevState, kanyeQuotes(response.data.quote)]);
      console.log('was this 2 seconds?')
      window.speechSynthesis.speak(msg);
      setTyping(false)
    }, 2000)
  }


  return (
    <div style={{ position: 'relative', textAlign: 'left' }}>
      {convo}
      {typing && <img id='dots' src='../assets/tenor.gif' />}
      <img id='keyboard' src='../assets/keyboard.jpeg' />
      <button className='sendBtn' onClick={handleClick} >Send</button>
    </div>
  );
}

export default Conversation;




