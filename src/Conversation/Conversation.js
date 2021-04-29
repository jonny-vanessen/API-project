import React, { useState, useEffect } from 'react';
import './Conversation.css';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// const incoming = new Audio('./assets/iPhone-receive.mp3')


function Conversation(props) {
  let [voices, setVoices] = useState([]);
  let [convo, setConvo] = useState([]);
  //let [isTrump, setIsTrump] = useState(true);
  let [typing, setTyping] = useState(false);
  let [isSpeaking, setIsSpeaking] = useState(false);
  let [isSpeakingStyle, setIsSpeakingStyle] = useState({});
  let [canClickSend, setCanClickSend] = useState(true)

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

  //handle Listen Mic
  function beginListening() {
    setIsSpeakingStyle({
      backgroundColor: 'red',
    })
    setIsSpeaking(true)
    SpeechRecognition.startListening()
  }

  //handle End Mic Listen
  function doneListening() {
    setIsSpeaking(false)
    setIsSpeakingStyle({
      backgroundColor: '#007AFF',
    })
    SpeechRecognition.stopListening()
    console.log(transcript)
    setConvo([...convo, trumpQuotes(transcript.charAt(0).toUpperCase() + transcript.slice(1))])
    // incoming.play()
    //setIsTrump(false);
    setTimeout(() => {
      setTyping(true);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 1000)
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    setTimeout(async () => {
      const response = await axios.get('https://api.kanye.rest/');
      msg.text = response.data.quote;
      // msg.text = 'test';
      msg.voice = voices[0];
      setConvo(prevState => [...prevState, kanyeQuotes(response.data.quote)]);
      window.speechSynthesis.speak(msg);
      setTyping(false);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 2000)
  }


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

  //Handles click of Send button
  function handleSend() {
    //TODO: set "typing" animation here
    //TODO: state disable click send button

    //globals
    //const url = 'https://iron-cors-anywhere.herokuapp.com/https://mumble.stream/speak_spectrogram';
    const url = 'https://mumble.stream/speak_spectrogram';
    //TODO: speaker state set as var here
    let wait = 0;
    let wait2 = 0;


    //get second quote
    async function secondSpeakerQuote() {
      //fetch new quote for speaker 2 (kanye in this example)
      let response = await axios.get('https://api.kanye.rest/');
      return response.data.quote
    }

    //get first quote
    async function firstSpeakerQuote() {
      let names = ['Andres', 'Cody', 'Cynthia', 'Daniela', 'David', 'Dicky', 'Francisco',
        'Hunter', 'Jesper', 'Joey', 'Jonny', 'Juan', 'Robert', 'Sumeet', 'Niko', 'Val'];
      let name = names[Math.floor(Math.random() * names.length)];

      //random trump quote that uses student names
      const response = await axios.get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${name}`);
      return response.data.message;
    }

    //second speaker
    async function secondStartSpeak() {
      let quote = await secondSpeakerQuote();

      //realistic response time...
      setTimeout(() => {
        //bring up typing bubble
        setTyping(true);
      }, 1000);

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: quote,
          speaker: 'david-attenborough'
        }),
      }).then(res => res.json())
        .then(async res => {
          console.log(res);

          //handle speaker 2 data
          const data1 = `data:audio/wav;base64,${res.audio_base64}`;
          let snd1 = new Audio(data1);

          //set wait for allow click again
          snd1.onloadedmetadata = await function () {
            console.log(snd1, snd1.duration);
            wait2 = snd1.duration * 1000
          };
          console.log(wait2);

          //wait for talk
          setTimeout(() => {

            //stop typing bubble
            setTyping(false);
            scrollDiv.scrollTop = scrollDiv.scrollHeight;

            //fill message
            setConvo(prevState => [...prevState, kanyeQuotes(quote)]);
            scrollDiv.scrollTop = scrollDiv.scrollHeight;

            //play speaker 2
            snd1.play();

            //wait for allow click - AFTER TALKING of speaker 2
            setTimeout(() => {
              //TODO: enable button again here
            }, wait2 + 500);
          }, wait);
        });
    }

    //first speaker
    async function firstStartSpeak() {
      let quote = await firstSpeakerQuote();

      //fetch first speaker
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: quote,
          speaker: 'donald-trump'
        }),
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);

          //handle data from fetch
          const data = `data:audio/wav;base64,${res.audio_base64}`;
          let snd = new Audio(data);

          //set wait time
          snd.onloadedmetadata = function () {
            console.log(snd, snd.duration);
            wait = snd.duration * 1000
          };
          console.log(wait);

          //await setIsTrump(false);
          setConvo([...convo, trumpQuotes(quote)]);
          scrollDiv.scrollTop = scrollDiv.scrollHeight;

          //play sound
          snd.play();

          //TODO: stop 'typing' animation
          secondStartSpeak();
        });
    }

    firstStartSpeak()
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
      <button className='sendBtn' onClick={handleSend} >Send</button>
      <button style={isSpeakingStyle} className='textSpeechBtn'>
        <img src="./assets/microphone.png" alt="microphone" onClick={!isSpeaking ? beginListening : doneListening} />
      </button>
    </div>
  );
}

export default Conversation;
