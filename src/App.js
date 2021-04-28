import './App.css';
import Trump from './Trump';
import Conversation from './Conversation/Conversation';
// import STT from './Conversation/STT';

function App() {
  return (
    <div className="App flex-col align-center">
      <div className='body-container'>
        <div className='cartoon-contain'>
          <img id='kanye-img' src='../assets/kanye.jpg' alt='kanye' />
        </div>
        <div className='phone-container'>
          <Conversation />
          <img id='keyboard' src='../assets/keyboard.jpeg' />
        </div>
        <div className='cartoon-contain'>
          <img id='trump-img' src='../assets/trump.png' alt='trump' />
        </div>
      </div>

    </div>
  );
}

export default App;
