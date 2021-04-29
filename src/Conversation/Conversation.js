import React, { useState, useEffect } from 'react';
import './Conversation.css';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// const incoming = new Audio('./assets/iPhone-receive.mp3')


function Conversation(props) {
  let [voices, setVoices] = useState([]);
  let [convo, setConvo] = useState([]);
  let [isTrump, setIsTrump] = useState(true);
  let [typing, setTyping] = useState(false);
  let [isSpeaking, setIsSpeaking] = useState(false);
  // let [time, setTime] = useState(today.getHours() + ":" + today.getMinutes())

  // Speech To Text
  let scrollDiv = document.getElementById('msg-scroll');

  let { transcript, resetTranscript } = useSpeechRecognition()

  function printTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    if (hours > 12) hours = hours - 12;
    if (minutes < 10) minutes = `0${minutes}`
    return (`${hours}:${minutes}`)
  }





  // setInterval(() => {
  //   setTime(today.getHours() + ":" + today.getMinutes())
  // }, 60000)



  function beginListening() {
    setIsSpeaking(true)
    SpeechRecognition.startListening()
  }

  function doneListening() {
    setIsSpeaking(false)
    SpeechRecognition.stopListening()
    console.log(transcript)
    setConvo([...convo, trumpQuotes(transcript)])
    // incoming.play()
    setIsTrump(false);
    setTimeout(() => {
      setTyping(true);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 1000)
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    setTimeout(async () => {
      const response = await axios.get('https://api.kanye.rest/');
      msg.text = response.data.quote;
      // msg.text = 'test';
      msg.voice = voices[1];
      setConvo(prevState => [...prevState, kanyeQuotes(response.data.quote)]);
      window.speechSynthesis.speak(msg);
      setTyping(false);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 2000)
  }



  // return (
  //   <div>
  //     <button onClick={SpeechRecognition.startListening}>Start</button>
  //     <button onClick={SpeechRecognition.stopListening}>Stop</button>
  //     <button onClick={resetTranscript}>Reset</button>
  //     <p style={{ color: 'white', fontSize: '2rem' }}>{transcript}</p>
  //   </div>
  // )


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

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }


  async function handleClick() {
    // setDictation(false)
    let names = ['Andres', 'Cody', 'Cynthia', 'Daniela', 'David', 'Dicky', 'Francisco',
      'Hunter', 'Jesper', 'Joey', 'Jonny', 'Juan', 'Robert', 'Sumeet', 'Niko', 'Val'];
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



    // msg.text = 'test';
    msg.text = tQuote;
    msg.voice = voices[3];
    msg.rate = 0.9;
    msg.pitch = 0.9;
    setConvo([...convo, trumpQuotes(tQuote)]);
    let res = await axios.get(`http://localhost:5000/voice/donald-trump/${tQuote}`);
    console.log(res);
    let {url} = res.data;
    console.log(url);
    new Audio('http://localhost:5000/test.webm').play();

    //window.speechSynthesis.speak(msg);
    setIsTrump(false);
    setTimeout(() => {
      setTyping(true);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 1000)
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    setTimeout(async () => {
      const response = await axios.get('https://api.kanye.rest/');
      msg.text = response.data.quote;
      // msg.text = 'test';
      msg.voice = voices[1];
      setConvo(prevState => [...prevState, kanyeQuotes(response.data.quote)]);
      //window.speechSynthesis.speak(msg);
      setTyping(false);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 2000)
  }

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


  return (
    <div className='screenWrap'>
      <div className='bannerWrap'>
        <div className='clock'>{printTime()}</div>
        <div className='contactName'>Kanye</div>
        <img src='../assets/textBanner.png' alt='kanye contact' />
      </div>
      <div id='msg-scroll' className='message-container' style={{ position: 'relative', textAlign: 'left' }}>
        {convo}
        {typing && <img id='dots' src='../assets/tenor.gif' />}
      </div>
      <button className='sendBtn' onClick={handleClick} >Send</button>
      <button className='textSpeechBtn'><img src="./assets/microphone.png" alt="microphone" onClick={!isSpeaking ? beginListening : doneListening} /></button>
    </div>
  );
}

export default Conversation;
