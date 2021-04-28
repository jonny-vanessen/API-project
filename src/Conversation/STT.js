// import React from 'react';
// import './STT.css'

// function STT(props) {
//   let [TextBox, setTextBox] = useState()
//   let [instructions, setInstructions] = useState()
//   let [content, setContent] = useState('')

//   let SpeechRecognition = window.webkitSpeechRecognition;
//   let recognition = new SpeechRecognition();

//   let Textbox = $('#textbox');
//   let instructions = $('instructions');
//   let Content = '';

//   recognition.continuous = true;
//   recognition.onresult = function (event) {
//     let current = event.resultIndex;
//     let transcript = event.results[current][0].transcript;
//     Content += transcript;
//     Textbox.val(Content);
//   };

//   recognition.onstart = function () {
//     instructions.text('Voice recognition is ON.');
//   }

//   recognition.onspeechend = function () {
//     instructions.text('No activity.');
//   }

//   recognition.onerror = function (event) {
//     if (event.error == 'no-speech') {
//       instructions.text('Try again.');
//     }
//   }

//   $('#start-btn').on('click', function (e) {
//     if (Content.length) {
//       Content += ' ';
//     }
//     recognition.start();
//   });

//   Textbox.on('input', function () {
//     Content = $(this).val();
//   })



//   return (
//     <div>
//       <div className="mycontainer">
//         <h1>Speech to text conversion using JavaScript</h1>
//         <div className="mywebapp">
//           <div className="input">
//             <textarea id="textbox" rows="6"></textarea>
//           </div>
//           <button id="start-btn" title="Start">Start</button>
//           <p id="instructions">Press the Start button</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default STT;









