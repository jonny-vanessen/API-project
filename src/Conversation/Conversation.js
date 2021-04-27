import React, { useState, useEffect } from 'react';
import './Conversation.css';
import Trump from '../Trump';
import axios from 'axios'


function Conversation(props) {

  let [quote, setQuote] = useState('');
  let [voices, setVoices] = useState([]);
  let [loading, setLoading] = useState(true)


  //init tts
  let msg = new SpeechSynthesisUtterance();




  //get english voices
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      let allVoices = window.speechSynthesis.getVoices();
      console.log(allVoices)
      setVoices(allVoices.filter((voice) => {
        return voice.lang.includes('en')
      }))
    }

    props.log('from a child')
  }, []);


  function printText() {

  }


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

  // function handleClick() {
  //   axios
  //     .get('https://api.kanye.rest/')
  //     .then((response) => {
  //       setQuote(response.data.value);
  //       msg.text = response.data.value;
  //       msg.voice = voices[Math.floor(Math.random() * voices.length)];
  //       console.log(msg.text, msg.voice)
  //       window.speechSynthesis.speak(msg);
  //     });
  // }

  return (
    <>
      <div className='outgoing'>
        <div className='outgoing-container'>
          <span className='outgoing-text message-box'>{quote}</span>
          <span className='delivered'>Delivered</span>
        </div>
      </div>
      <div className='incoming'>
        <div className='incoming-container'>
          <span className='incoming-text message-box'>My name is Kanye and I am texting </span>
        </div>
      </div>
      <img id='keyboard' src='../assets/keyboard.jpeg' />
      <button onClick={handleClick} >Send</button>
    </>
  );
}

export default Conversation;




