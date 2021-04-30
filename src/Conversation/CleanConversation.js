

async function getQuotes() {
  let names = ['Andres', 'Cody', 'Cynthia', 'Daniela', 'David', 'Dicky', 'Francisco',
    'Hunter', 'Jesper', 'Joey', 'Jonny', 'Juan', 'Robert', 'Sumeet', 'Niko', 'Val'];
  let name = names[Math.floor(Math.random() * names.length)];
  //random trump quote that uses student names
  const firstQuoteResponse = await axios.get(`https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=${name}`);
  const firstQuote = firstQuoteResponse.data.message

  let secondQuoteResponse = await axios.get('https://api.kanye.rest/');
  let secondQuote = secondQuoteResponse.data.quote

  return { firstQuote, secondQuote };
}

async function getAudio(quote, speaker) {
  const url = 'https://mumble.stream/speak_spectrogram';
  let speakerAudio = await axios.post(url, {
    text: quote,
    speaker: speaker
  })

  return speakerAudio
}

async function playAudio(speakerAudio) {
  const data = `data:audio/wav;base64,${speakerAudio.audio_base64}`;
  let audio = new Audio(data);

  //set wait time
  audio.onloadedmetadata = function () {
    audioLength = audio.duration * 1000
  };

  //play sound
  audio.play();
  return audioLength;
}

async function handleMessages() {
  const { firstQuote, secondQuote } = await getQuotes();
  const firstSpeakerAudio = await getAudio(firstQuote, 'donald-trump');
  let audioLength = playAudio(firstSpeakerAudio);
  console.log(audioLength)
  setConvo([...convo, trumpQuotes(firstQuote)]);

  const secondSpeakerAudio = await getAudio(secondQuote, 'david-attenborough');
  // scrollDiv.scrollTop = scrollDiv.scrollHeight;

  //TODO: stop 'typing' animation
  setTyping(true);

  setTimeout(() => {
    playAudio(secondSpeakerAudio);
    setTyping(false);
    // scrollDiv.scrollTop = scrollDiv.scrollHeight;


    setConvo(prevState => [...prevState, kanyeQuotes(secondQuote)]);
    // scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }, audioLength + 500)
}