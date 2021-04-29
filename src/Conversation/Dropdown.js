import React, { useState } from 'react';
import './Dropdown.css';

function Dropdown(props) {
  let [speaker, setSpeaker] = useState('')
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setSpeaker(e.target.value)
  }


  return (
    <div className='dropdown-container'>
      <select name="cars" id="cars" onChange={handleChange}>
        <option value="david-attenborough">David Attenborough</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>

    </div>
  );
}

export default Dropdown;