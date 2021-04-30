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
  let [canClickSend, setCanClickSend] = useState(true);
  let [audioLength, setAudioLength] = useState(2000)
  let [speaker, setSpeaker] = useState('')

  // let [time, setTime] = useState(today.getHours() + ":" + today.getMinutes())

  // Speech To Text
  let scrollDiv = document.getElementById('msg-scroll');

  useEffect(() => {

  }, []);


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


  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }



  async function getQuotes() {
    let names = ['Andres', 'Cody', 'Cynthia', 'Daniela', 'David', 'Dicky', 'Francisco',
      'Hunter', 'Jesper', 'Joey', 'Jonny', 'Juan', 'Robert', 'Sumeet', 'Niko', 'Val'];
    let name = names[Math.floor(Math.random() * names.length)];
    //random trump quote that uses student names
    const firstQuoteResponse = await axios.get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${name}`);
    const firstQuote = firstQuoteResponse.data.message

    let secondQuoteResponse = await axios.get('https://api.kanye.rest/');
    let secondQuote = secondQuoteResponse.data.quote

    return { firstQuote: firstQuote, secondQuote: secondQuote };
  }

  async function getAudio(quote, speaker) {
    const url = 'https://mumble.stream/speak_spectrogram';
    let speakerAudio = await axios.post(url, {
      text: quote,
      speaker: speaker
    })
    return speakerAudio
  }

  function playAudio(speakerAudio) {
    const data = `data:audio/wav;base64,${speakerAudio.data.audio_base64}`;
    let audio = new Audio(data);

    //set wait time
    audio.onloadedmetadata = function () {
      setAudioLength(audio.duration * 1000)
    };

    //play sound
    audio.play();
    return audioLength;
  }

  async function handleMessages() {
    setCanClickSend(false)
    const { firstQuote, secondQuote } = await getQuotes();
    const firstSpeakerAudio = await getAudio(firstQuote, 'donald-trump');
    playAudio(firstSpeakerAudio);
    setConvo([...convo, trumpQuotes(firstQuote)]);

    setTimeout(() => {
      setTyping(true);
    }, 500)

    const delay = audioLength > 5000 ? audioLength + 500 : audioLength;

    const secondSpeakerAudio = await getAudio(secondQuote, 'spongebob-squarepants');
    // scrollDiv.scrollTop = scrollDiv.scrollHeight;

    //TODO: stop 'typing' animation


    setTimeout(() => {
      playAudio(secondSpeakerAudio);
      setTyping(false);
      // scrollDiv.scrollTop = scrollDiv.scrollHeight;


      setConvo(prevState => [...prevState, kanyeQuotes(secondQuote)]);
      // scrollDiv.scrollTop = scrollDiv.scrollHeight;
      setCanClickSend(true)
    }, delay)
  }


  const handleChange = (e) => {
    setSpeaker(e.target.value)
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
      <button className='sendBtn' disabled={!canClickSend} onClick={handleMessages}>Send</button>
      <button style={isSpeakingStyle} className='textSpeechBtn'>
        <img src="./assets/microphone.png" alt="microphone" onClick={!isSpeaking ? beginListening : doneListening} />
      </button>
      <select name="voices" id="voices" onChange={handleChange}>
        <option value="donald-trump">Donald Trump</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </div>
  )
}

export default Conversation;
