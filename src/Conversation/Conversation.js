import React, { useState, useEffect } from 'react';
import './Conversation.css';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import celebrityQuotes from '../celebrityQuotes'
// const incoming = new Audio('./assets/iPhone-receive.mp3')


function Conversation(props) {

  console.log('component refreshes');

  let [voices, setVoices] = useState([]);
  let [convo, setConvo] = useState([]);
  //let [isTrump, setIsTrump] = useState(true);
  let [typing, setTyping] = useState(false);
  let [isSpeaking, setIsSpeaking] = useState(false);
  let [isSpeakingStyle, setIsSpeakingStyle] = useState({});
  let [canClickSend, setCanClickSend] = useState(true);
  let [audioLength, setAudioLength] = useState(2000)
  let [currentSpeaker, setCurrentSpeaker] = useState('donald-trump')
  let [name, setName] = useState('Hunter');
  let [kImg, setKImg] = useState(1);
  let [randomType, setRandomType] = useState(Math.floor((Math.random() * 100) + 50));
  let [firstReady, setFirstReady] = useState(false);

  let scrollDiv = document.querySelector('#msg-scroll');

  // let [time, setTime] = useState(today.getHours() + ":" + today.getMinutes())

  let keyboardType;


  useEffect(() => {

  }, []);

  function dashToCamel(celebrity) {
    return celebrity.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }


  let { transcript, resetTranscript } = useSpeechRecognition()

  function printTime() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    if (hours > 12) hours = hours - 12;
    if (minutes < 10) minutes = `0${minutes}`
    return (`${hours}:${minutes}`)
  }


  let receiveMessageAudio = new Audio('../assets/iPhone-receive.mp3');
  let typingClick = new Audio('../assets/typingClick.mp3');

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
      scrollDiv = document.querySelector('#msg-scroll');
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 1000)
    scrollDiv = document.querySelector('#msg-scroll');
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    setTimeout(async () => {
      const response = await axios.get('https://api.kanye.rest/');
      receiveMessageAudio.play()
      // msg.text = 'test';
      setTyping(false);
      setConvo(prevState => [...prevState, kanyeQuotes(response.data.quote)]);
      scrollDiv = document.querySelector('#msg-scroll');
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, 2000)
  }



  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  async function getQuotes() {
    let firstQuote = '';
    if (currentSpeaker === 'donald-trump') {
      let names = ['Andres', 'Cody', 'Cynthia', 'Daniela', 'David', 'Dicky', 'Francisco',
        'Hunter', 'Jesper', 'Joey', 'Jonny', 'Juan', 'Robert', 'Sumeet', 'Niko', 'Val'];
      setName(names[Math.floor(Math.random() * names.length)]);
      //random trump quote that uses student names
      const firstQuoteResponse = await axios.get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${name}`);
      firstQuote = firstQuoteResponse.data.message
    } else {
      let celebrityName = dashToCamel(currentSpeaker)
      console.log(celebrityQuotes[celebrityName][0])
      console.log(typeof celebrityName)


      const firstQuoteResponse = await celebrityQuotes[celebrityName][Math.floor(Math.random() * celebrityQuotes[celebrityName].length)];
      console.log(firstQuoteResponse)
      firstQuote = firstQuoteResponse
    }


    let secondQuoteResponse = await axios.get('https://api.kanye.rest/');
    let secondQuote = secondQuoteResponse.data.quote

    return { firstQuote: firstQuote, secondQuote: secondQuote };
  }

  async function getAudio(quote, speaker) {
    console.log(speaker)
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
    setFirstReady(false)
    setCanClickSend(false)

    // function typing() {
    //   if (!firstReady) {
    //     setTimeout(() => {
    //       //setRandomType(Math.floor((Math.random() * 100) + 50));
    //
    //       typingClick.currentTime = 0;
    //       //TODO: deleteClick.currentTime = 0
    //       if (kImg > 27) {
    //         //TODO: deleteClick.play()
    //       } else {
    //         if (kImg % 2 === 0 ) {
    //           typingClick.play();
    //           console.log('click: ', kImg, randomType);
    //         }
    //       }
    //       kImg > 37 ? setKImg(1) : setKImg(++kImg);
    //
    //     }, 100)
    //
    //     typing();
    //   }
    // }
    // typing();

    keyboardType = setInterval(() => {

      typingClick.currentTime = 0;
      //TODO: deleteClick.currentTime = 0
      if (kImg > 27) {
        //TODO: deleteClick.play()
      } else {
        if (kImg % 2 === 0 ) {
          typingClick.play();
          console.log('click: ', kImg, randomType);
        }
      }
      kImg > 37 ? setKImg(1) : setKImg(++kImg);
    }, 100);


    const { firstQuote, secondQuote } = await getQuotes();
    const firstSpeakerAudio = await getAudio(firstQuote, currentSpeaker);

    setFirstReady(true);
    playAudio(firstSpeakerAudio);
    setConvo([...convo, trumpQuotes(firstQuote)]);

    clearInterval(keyboardType);
    setKImg(1);

    const delay = audioLength > 3000 ? audioLength + 1000 : audioLength;

    setTimeout(() => {
      setTyping(true);
    }, delay)
    scrollDiv = document.querySelector('#msg-scroll');
    scrollDiv.scrollTop = scrollDiv.scrollHeight;


    setTimeout(() => {
      receiveMessageAudio.play();
      setTyping(false);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;


      setConvo(prevState => [...prevState, kanyeQuotes(secondQuote)]);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
      setCanClickSend(true)
    }, delay + 2000)
  }


  const handleChange = (e) => {
    setCurrentSpeaker(e.target.value)
    console.log(currentSpeaker)
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
        <option value="george-w-bush">George W Bush</option>
        <option value="bill-clinton">Bill Clinton</option>
        <option value="dr-phil-mcgraw">Dr Phil</option>
        <option value="arnold-schwarzenegger">Arnold Schwarzenegger</option>
        <option value="gilbert-gottfried">Gilbert Gottfried</option>
      </select>
      <img id='keyboard' src={`../assets/imgs/k${kImg}.jpeg`} alt='keyboard' />
    </div>
  )
}

export default Conversation;
