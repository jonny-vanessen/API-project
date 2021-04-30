import React, { useState } from 'react';

function Dropdown(props) {
  let [speaker, setSpeaker] = useState('')
  const handleChange = (e) => {
    setSpeaker(e.target.value)
  }


  return (
    <select name="voices" id="voices" onChange={handleChange}>
      <option value="donald-trump">Donald Trump</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  );
}

export default Dropdown;