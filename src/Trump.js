import React from 'react';
import Speech from 'react-speech';
import axios from 'axios'

function Trump(props) {






  return (
    <div>
      <h1>Speech Ting</h1>
      <Speech
        textAsButton={true}
        displayText="Hello"
        text="I have text displayed as a button" />

    </div>
  );
}

export default Trump;