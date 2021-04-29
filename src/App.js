import './App.css';
import Conversation from './Conversation/Conversation';

function App() {
  return (
    <div className="App flex-col align-center">
      <div className='body-container'>
        <div className='cartoon-contain'>
          <img id='kanye-img' src='../assets/kanye.jpg' alt='kanye' />
        </div>
        <div className='phone-container'>
          <Conversation />
          <img id='keyboard' src='../assets/keyboard.jpeg' alt='keyboard'/>
        </div>
        <div className='cartoon-contain'>
          <img id='trump-img' src='../assets/trump.png' alt='trump' />
        </div>
      </div>
    </div>
  );
}

export default App;


    // const sound = new Howl.Howl({
    //   src: [data],
    //   format: 'wav',
    //   // NB: Attempting to get this working on iPhone Safari
    //   // https://github.com/goldfire/howler.js/issues/1093
    //   // Other issues cite needing to cache a single player
    //   // across all user interaction events.
    //   html5: true,
    // });
    //
    // this.setState({
    //   howl: sound,
    // });
    //
    // sound.play();