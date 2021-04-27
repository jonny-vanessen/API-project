import React, { useEffect, useState } from 'react';
import axios from 'axios'



function Trump(props) {
  const [speaker, setSpeaker] = useState([])
  // const [speech, setSpeech] = useState('')
  // const [loading, setLoading] = useState(false)
  let msg;
  let voices;

  async function getSpeakers() {
    msg = new SpeechSynthesisUtterance();
    voices = await window.speechSynthesis.getVoices();
  }

  useEffect(() => {
    getSpeakers()
  }, [])

  function speak() {
    msg.voice = voices[Math.floor(Math.random() * voices.length)];
    msg.text = "I am speaking";
    window.speechSynthesis.speak(msg);
  }



  // let voices = window.speechSynthesis.getVoices();
  // window.speechSynthesis.onvoiceschanged = function () {

  // }
  // setSpeaker(msg.voices)

  // setTimeout(() => {
  //   console.log(msg);
  //   console.log(voices);
  // }, 500)








  // function speak() {
  //   console.log(msg.voice)
  //   // console.log(voices(currSpeaker))
  //   setSpeaker(Math.floor(Math.random() * voices.length))
  //   console.log('speaker', speaker)
  //   // console.log(currSpeaker)
  //   setSpeech(`My name is`)
  //   console.log('speech', speech)
  // msg.voice = voices[Math.floor(Math.random() * voices.length)];
  // msg.text = "I am speaking";
  // window.speechSynthesis.speak(msg);
  //   setLoading(false)
  // }

  // speechSynthesis.getVoices().forEach(function (voice, i) {
  //   console.log(i, voice.name, voice.default ? voice.default : '');
  // });


  return (
    <div>
      <h1>Speech Ting</h1>
      <button onClick={speak}>Speech</button>
    </div>
  );
}

export default Trump;