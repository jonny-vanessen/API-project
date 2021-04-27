import React, { useEffect, useState } from 'react';
import axios from 'axios'



function Trump(props) {
  const [quote, setQuote] = useState('')
  // const [loading, setLoading] = useState(false)

  async function getTrumpQuotes() {
    const response = await axios.get('http://tronalddump.io/random/quote')
    setQuote(response.data.value)
    console.log(response)
  }


  // async function getSpeakers() {
  //   msg = new SpeechSynthesisUtterance();
  //   voices = await window.speechSynthesis.getVoices();
  // }

  useEffect(() => {
    getTrumpQuotes()
    // getSpeakers()
  }, [])

  async function speak() {
    // msg.voice = voices[Math.floor(Math.random() * voices.length)];
    let msg = new SpeechSynthesisUtterance();
    let voices = await window.speechSynthesis.getVoices();
    msg.voice = voices[0];
    msg.text = quote;
    window.speechSynthesis.speak(msg);
  }




  return (
    <div>
      <h1>Speech Ting</h1>
      <button onClick={speak}>Speech</button>
    </div>
  );
}

export default Trump;