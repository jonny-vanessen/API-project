import React from 'react';
import Conversation from "./Conversation/Conversation";

function Home() {
  return (
    <div className='body-container'>
      <div className='cartoon-contain'>
        <img id='kanye-img' src='../assets/kanye.jpg' alt='kanye' />
      </div>
      <div className='phone-container'>
        <Conversation />
      </div>
      <div className='cartoon-contain'>
        <img id='trump-img' src='../assets/trump.png' alt='trump' />
      </div>
    </div>
  )
}

export default Home;