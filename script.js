/*jshint esversion: 6 */
$(document).ready(function(){
////// You can git add and commit right from atom
let sequence = [];
let clickCount = 0;
let currentRound = 0;
let speed = 600;
let audio ;
let highScores = [];
let highScoreValue = localStorage.getItem("highScore");
let keypress = false;
let keypressVal;
// let keyboard;

// let keyCode = {
//     87: function(){
//           console.log("87 = w this worked");
//         },
//     69: function(){
//           console.log("69 = e this worked");
//         },
//     83: function(){
//           console.log("83 = s this worked");
//         },
//     68: function(){
//           console.log("68 = d this worked");
//         }
// };

//// Gets the High Score from local storage and display it
if (highScoreValue > 0){
$('.highScores h3').html('Your High Score is: '+ highScoreValue);
} else {
$('.highScores h3').html('No High Score yet');
}

///// start buttom
$('#startGame').on('click', newGame);
///// color buttons
$(".red").on('click', checkCurrentClick);
$(".blue").on('click', checkCurrentClick);
$(".green").on('click', checkCurrentClick);
$(".yellow").on('click', checkCurrentClick);

// $('#keyboardInit').on('click', keyboardOnOff);

// $('.keyButton').hide(100, function(){
//   keyboard = false;
// });


/// ******* initialized on start button click
function newGame() {
  resetGame();
  newRound();
  }
///// ******* created a generic delay function // used for delaying the.animate so there is a brief pause between last click and animate,
function delayPlay(toDelay, time) {
  window.setTimeout(toDelay, time);
  }

///// ******** CREATES A NEW ROUND
function newRound(){
  currentRound++;
  clickCount = 1;
  speed = speed - 20;
  addToSequence();
  /////// ****** Delay the animation
  delayPlay(function(){animate(sequence);},300);

  $('.round').html('Round: ' + currentRound);
}

// function keyboardOnOff() { ///// SHows the letters on the screen
//   if (!keyboard) {
//     $('.keyButton').show(100, function(){
//       keyboard = true;
//       // keyboardPress();
//     });
//   } else if (keyboard) {
//     $('.keyButton').hide(100, function(){
//       keyboard = false;
//       // keyboardPress();
//     });
//   }
// }

$( document ).keypress( function( event ){
  let code = event.which;
  // console.log(code);

  if ( code == 119 ) {
      keyPressVal = 0;//// SETTING THE VALUE TO PASS INTO USER
      keypress = true;
      checkCurrentClick();
      // console.log($(this) + " w was pressed");
  } else if ( code == 101 ) {
      keyPressVal = 1;//// SETTING THE VALUE TO PASS INTO USER
      keypress = true;
      checkCurrentClick();
      // console.log($(this) + " e was pressed");
  } else if ( code == 115 ) {
      keyPressVal = 2;//// SETTING THE VALUE TO PASS INTO USER
      keypress = true;
      checkCurrentClick();
      // console.log($(this) + " s was pressed");
  } else if ( code == 100 ) {
      keyPressVal = 3;//// SETTING THE VALUE TO PASS INTO USER
      keypress = true;
      checkCurrentClick();
      // console.log($(this) + " d was pressed");
  }
  event.preventDefault();

  }
);
  ////// ***** HIGH SCORE
function highScore(){
  highScores.push(currentRound-1);
  highScores.sort();
  highScores.reverse();
  highScoreValue = highScores[0];
  if ( highScoreValue < 0 ){
    highScoreValue = 0;
  }
  $('.highScores h3').html('Your High Score is: '+ highScoreValue);
  ////// ***** Save localy
  localStorage.setItem("highScore", highScoreValue);
  }
/// ******** Resets the game if the user clicks an incorrect color
function resetGame() {
  sequence = [];
  currentRound = 0;
  clickCount = 1;
  speed = 600;
  }

/// ******* adds a new number to the sequence
function addToSequence(){
  sequence.push(randomNumber());
  }

///******** creates a random number between 1-4
function randomNumber(){
  return  Math.floor((Math.random()*4));
  }

// ******** will check if the to values passed into it are the same
function checkBoth(value1, value2) {
  if (value1 === value2){
    return true;
  }
  else {
    return false;
  }
  }


////// ********* AUDIO
function playAudio(audioID) {
  let audio = $('<audio autoplay></audio>');
    audio.append('<source src="sounds/'+audioID+'.mp3" type="audio/mp3"/>');
  }


/////*********  cHECKS THE USER INPUT AGAINST THE SEQUENCE AT THE CORRECT INDEX  IMPORTANT FUNCTION
function checkCurrentClick(){

  let colorClicked = $(this).data('color');
  let numbToCheck = sequence[clickCount - 1];
  let seqLength = sequence.length;
  // console.log(keyboard + " value of keyboard");

  if (keypress){
    colorClicked = keyPressVal;
  }


  let audioID = parseInt(colorClicked + 1);
  // console.log(audioID + " audioID");

  playAudio(audioID);
  lightUp(colorClicked);

  if (clickCount < seqLength) { //// checks if under the sequence.length
    if (checkBoth(numbToCheck, colorClicked)) {
        clickCount++;
    } else { ///// triggers game over
        $('.round').html('Sorry Game Over');
        playAudio('buzzer');
        highScore();
        resetGame();
    }
  } else if (clickCount === seqLength) { // checks if the two are the same so that the next round can be triggered
    if (checkBoth(numbToCheck, colorClicked)) { ///if  undnder or equal to the sequence length  and numbToCheck and the color are correct
        newRound();

      }
      else { ///// triggers game over
        $('.round').html('Sorry Game Over');
        playAudio('buzzer');
        highScore();
        resetGame();
      }
    }
  }

////  used some of the code found here for the animate sequence
/////   https://codeplanet.io/building-simon-says-javascript/
function animate(sequence){
  let i = 0;
  let interval = setInterval(function(){
    lightUp(sequence[i]);
    playAudio(sequence[i]+1);
    i++;
    if (i === sequence.length) {
      clearInterval(interval);
    }
  }, speed);
  }

/// the lightUp function
function lightUp(color) {
  let colorToLight = $('[data-color=' + color + ']').addClass('lightUp');
  window.setTimeout(function() {
    colorToLight.removeClass('lightUp');
  }, speed/2);
  }
////////////////////////////////////
});////****END OF DOCUMENT READY
