import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import LandingPage from "./LandingPage.css";

function Land(props) {
  let [animate, setAnimate] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 100);
  }, []);

  return (
    <div id='land-wrapper'>
      <div className='title-wrapper'>
        <div className={animate ? `start titleLine1 title` : `titleLine1 title`}>War of Words</div>

        {/*<div className={animate ? `start titleLine3 title` : `titleLine3 title`}></div>*/}
      </div>
      <div className='instructions'>
        <div className='description'>
          Have a funny text conversation with Kanye West.
        </div>
        <div className='description'>
          Select your speaker, and have personalized quotes genererated by things actually said by your selected speaker.
        </div>
        <div className='description'>
          See what Kanye has to say in response.
        </div>
      </div>
      <Link to='/home'>
        <button id='submit'>Got it!</button>
      </Link>
    </div>
  );
}

export default Land;