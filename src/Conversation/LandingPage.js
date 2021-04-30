import React, { useEffect, useState } from "react";
import "./LandingPage.css";
// import ReactCSSTransitionGroup from "react-transition-group";
// import { Transition, CSSTransition } from "react-transition-group";

const LandingPage = () => {
  let [animate, setAnimate] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 100);
  }, []);
  return (
    <div>
      <div
        className="titleContainer"
        style={{ backgroundImage: `url("assets/NYTTrump.jpg")` }}
      >
        <div className={animate ? `start titleLine1` : `titleLine1`}>War</div>

        <div className={animate ? `start titleLine2` : `titleLine2`}>of</div>

        <div className={animate ? `start titleLine3` : `titleLine3`}>Words</div>
      </div>
    </div>
  );
};

export default LandingPage;
