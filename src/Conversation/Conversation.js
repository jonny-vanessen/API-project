import React, { useState, useEffect } from 'react';
import './Conversation.css';
import Trump from '../Trump';
import axios from 'axios';

function Conversation(props) {
  let [voices, setVoices] = useState([]);
  let [convo, setConvo] = useState([]);
  let [isTrump, setIsTrump] = useState(true);
  let [typing, setTyping] = useState(false);


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
    let names = ['Andres', 'Cody', 'Cynthia', 'Daniela', 'David', 'Dicky', 'Francisco',
      'Hunter', 'Jesper', 'Joey', 'Jonny', 'Juan', 'Robert', 'Sumeet'];
    let name = names[Math.floor(Math.random() * names.length)];
    const response = await axios.get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${name}`);
    let tQuote = response.data.message;

    if (tQuote.includes('http')) {
      tQuote = tQuote.split(/(\s+)/);

      for (let i = 0; i < tQuote.length; i++) {
        if (tQuote[i].substring(0, 4) === "http" || tQuote[i].substring(0, 5) === "https") {
          tQuote.splice(i, 1);
        }
      }
      tQuote.join(" ");
    }

    let scrollDiv = document.getElementById('msg-scroll');

    msg.text = 'test';
    // msg.text = tQuote;
    msg.voice = voices[0];
    setConvo([...convo, trumpQuotes(tQuote)]);
    window.speechSynthesis.speak(msg);
    setIsTrump(false);
    setTimeout(() => {
      setTyping(true);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 1000)
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    setTimeout(async () => {
      const response = await axios.get('https://api.kanye.rest/');
      // msg.text = response.data.quote;
      msg.text = 'test';
      msg.voice = voices[1];
      setConvo(prevState => [...prevState, kanyeQuotes(response.data.quote)]);
      console.log('was this 2 seconds?');
      window.speechSynthesis.speak(msg);
      setTyping(false);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 2000)
  }


  return (
    <div className='screenWrap'>
      <div className='bannerWrap'>
        <div className='clock'>4:12</div>
        <div className='contactName'>Kanye</div>
        <img src='../assets/textBanner.png' alt='kanye contact' />
      </div>
      <div id='msg-scroll' className='message-container' style={{ position: 'relative', textAlign: 'left' }}>
        {convo}
        {typing && <img id='dots' src='../assets/tenor.gif' />}
      </div>
      <button className='sendBtn' onClick={handleClick} >Send</button>
    </div>
  );
}

export default Conversation;
