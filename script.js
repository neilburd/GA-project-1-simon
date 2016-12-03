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
let keyPress;
let keyboard;

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

$('#keyboardInit').on('click', keyboardOnOff);
$('.keyButton').hide(100, function(){
  keyboard = false;
});
function keyboardOnOff() {
  if (!keyboard) {
    $('.keyButton').show(100, function(){
      keyboard = true;
      keyboardPress();
    });
  } else if (keyboard) {
    $('.keyButton').hide(100, function(){
      keyboard = false;
      keyboardPress();
    });
  }
}

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

function keyboardPress(){
  $( document ).keydown(function( event ) {
    if ( event.which == 87 ) {      /// d
        keyPress = 0;//// SETTING THE VALUE TO PASS INTO USER
        console.log(keyPress + " d was pressed");
        lightUp(5);
        checkCurrentClick();
        event.preventDefault();
    } else if (event.which == 69) { /// f
        keyPress = 1;//// SETTING THE VALUE TO PASS INTO USER
        event.preventDefault();
        lightUp(6);
        checkCurrentClick();
        console.log(keyPress + " f was pressed");
    } else if (event.which == 83) { /// j
        keyPress = 2;//// SETTING THE VALUE TO PASS INTO USER
        event.preventDefault();
        lightUp(7);
        checkCurrentClick();
        console.log(keyPress + " j was pressed");
    } else if (event.which == 68) { /// k
        keyPress = 3;//// SETTING THE VALUE TO PASS INTO USER
        event.preventDefault();
        lightUp(8);
        checkCurrentClick();
        console.log(keyPress + " k was pressed");
    }
  });
}
  ////// ***** HIGH SCORE
function highScore(){
  highScores.push(currentRound-1);
  highScores.sort();
  highScores.reverse();
  highScoreValue = highScores[0];
  if ( highScoreValue < 0 ){
    highScoreValue = 0;
  
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
  let colorClicked;
  let numbToCheck = sequence[clickCount - 1];
  let seqLength = sequence.length;
  // console.log(audioID + " AudioID ");
  console.log(keyboard + " value of keyboard");

  if (keyboard){
    colorClicked = keyPress;
    console.log(colorClicked + " colorClicked" + " " + keyPress + " keyPress");
  } else {
    colorClicked = $(this).data('color');
  }
  let audioID = parseInt(colorClicked + 1);

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
