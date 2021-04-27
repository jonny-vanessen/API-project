import React from 'react';
import './Conversation.css'

function Conversation(props) {

  return (
    <div className='body-container'>
      <div>
        <img src='../assets/kanye.jpg' alt='kanye' />
      </div>
      <div className='message-container'>
        <div className='outgoing'>
          <div className='outgoing-container'>
            <span className='outgoing-text message-box'>My name is donald trump and I am texting</span>
            <span className='delivered'>Delivered</span>
          </div>
        </div>
        <div className='incoming'>
          <div className='incoming-container'>
            <span className='incoming-text message-box'>My name is Kanye and I am texting </span>
          </div>
        </div>
        <img id='keyboard' src='../assets/keyboard.jpeg' />
      </div>
      <div>
        <img src='../assets/trump.png' alt='trump' />
      </div>
    </div>
  );
}

export default Conversation;