import React from 'react';
import {Link} from "react-router-dom";
import LandingPage from "./LandingPage.css";

function Land(props) {
  return (
    <div>
      <Link to='/home'>
        <button onClick={() => {
          console.log('test')
        }}>test</button>
      </Link>
    </div>
  );
}

export default Land;