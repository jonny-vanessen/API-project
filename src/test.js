// // import React from 'react';

// // function App(props) {
// //     return (
// //         <div>
// //          <div>
// //   <h1 className="animate_animated animate_bounce">An animated element</h1>
// // </div>;
// //         </div>
// //     );
// // }

// // export default App.js;

// const AComponent = ({ in: inProp }) => (
//     <Transition
//       in={inProp}
//       timeout={{ appear: 100, enter: 300, exit: 3000 }}
//       appear
//       unmountOnExit
//     >
//       {(state) => (
//         <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
//           I am {state}
//         </div>
//       )}
//     </Transition>
//   );

//   function App() {
//     const [entered, setEntered] = useState(true);
//     return (
//       <div>
//         <Test in={entered} />
//         <button
//           onClick={() => {
//             setEntered(!entered);
//           }}
//           style={{ marginTop: "10rem" }}
//         >
//           Toggle Entered
//         </button>
//         <div>
//           <img id="newsBG" src="../assets/newspaper.png" alt="backgroundImg" />
//         </div>
//         ;
//       </div>
//     );
//   }

//   const defaultStyle = {
//     transition: `transform 200ms, opacity 200ms ease`,
//     opacity: 1,
//   };

//   const transitionStyles = {
//     entering: { transform: "scale(0.5)", opacity: 0 },
//     entered: { transform: "scale(2.0)", opacity: 1 },
//     exiting: { opacity: 0 },
//     exited: { opacity: 0 },
//   };

//   const Test = ({ in: inProp }) => {
//     return (
//       <CSSTransition
//         in={inProp}
//         timeout={{ appear: 100, enter: 100, exit: 2000 }}
//         className="roll"
//         unmountOnExit
//         appear
//       >
//         <div>
//           <div className="titleContainer">
//             <div className="titleLine1">War</div>

//             <div className="titleLine2">of</div>

//             <div className="titleLine3">Words</div>
//           </div>
//         </div>
//       </CSSTransition>
//     );
//   };

// .roll {
//     font-family: "Bungee Inline", cursive;
//     font: bold;
//     color: red;
//     font-size: 150px;
//     position: absolute;
//     z-index: 1;
//     align-items: center;
//     justify-content: center;
//     border: blue dashed;
//   }

//   .roll-appear {
//     opacity: 0;
//   }

//   .roll-enter {
//     opacity: 0;
//   }

//   .roll-enter-done {
//     transform: rotate(720deg) scale(3);
//     opacity: 1;
//     transition: transform 1000ms, opacity 1000ms;
//   }

//   .roll-exit {
//     transform: rotate(720deg) scale(3);
//     opacity: 1;
//   }

//   .roll-exit-active {
//     transform: rotate(0deg) scale(1);
//     opacity: 0;
//     transition: transform 1000ms, opacity 1000ms;
//   }

/* ANIMTAE.CSS TRANSITIONS */

//   .animate_animated.animate_bounce {
//     display: inline-block;
//     margin: 0 0.5rem;
//     overflow: hidden;
//     animation: bounce;
//     animation-duration: 5000s;
//   }

//   .animate_animated.animate_flash {
//     animation: flash;
//     animation-duration: 4000s;
//   }

/* h1 {
    animation-duration: 8s;
    animation-name: slidein;
    animation-iteration-count: infinite;
  }
  
  @keyframes slidein {
    0% {
      margin-left: 0%;
    }
    50% {
      margin-left: 300px;
    }
    100% {
      margin-left: 0%;
    }
  } */

//mport React, { useState } from "react";
// import ReactCSSTransitionGroup from "react-transition-group";
// import { Transition } from "react-transition-group";

// const AComponent = ({ in: inProp }) => (
//   <Transition in={inProp} timeout={{ appear: 500, enter: 300, exit: 500 }}>
//     {(state) => <div>I am {state}</div>}
//   </Transition>
// );

// function App() {
//   const [entered, setEntered] = useState(false);
//   return (
//     <div>
//       <AComponent in={entered} />

//       <button
//         onClick={() => {
//           setEntered(!entered);
//         }}
//       >
//         Toggle Entered
//       </button>
//     </div>
//   );
//   console.log(App());
// }

// function LandingPage(props) {
//   return (
//     <div>
//       <h1 className="animate_animated animate_bounce">An animated element</h1>
//     </div>
//   );
// }

// export default LandingPage;
// ReactCSSTransitionGroup;

// function App(props) {
//   return (
//     <div>
//       <div>Testing.... testing</div>
//       {/* <div>
//         <h1 className="animate_animated flash">hello</h1>
//       </div>
//       <div>
//         <h1 className="animate_animated animate_bounce">An animated element</h1>
//       </div> */}
//     </div>
//   );
// }
//

/* 
.titleLine1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 300px;
  padding-left: 500px;
}

.titleLine2 {
  display: flex;
  align-items: center;
  padding-top: 50px;
  padding-left: 500px;
}

.titleLine3 {
  display: flex;
  align-items: center;
  padding-top: 50px;
  padding-left: 450px;
} */

/* #newsBG {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed red;
  background-size: cover;
  position: absolute;
} */

/* .App {
  text-align: center;
}

.rs-play {
  padding: 100px;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.align-center {
  align-items: center;
} */

/* REACT TRANSITION GROUP API */

/* .titleContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
} */
