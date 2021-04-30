import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
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
          Lorem Ipsum: As of React Router 5.1, if you are using React 16 you should not need this prop because we forward the ref to the underlying a tag. Use a normal ref instead.
        </div>
        <div className='description'>
          When true, the trailing slash on a location’s pathname will be taken into consideration when determining if the location matches the current URL.
        </div>
      </div>
      <Link to='/home'>
        <button id='submit'>Got it!</button>
      </Link>
    </div>
  );
}

export default Land;