/*jshint esversion: 6 */
$(document).ready(function(){
console.log("Hello World!");

let sequence = [];
let clickCount = 0;
let currentRound = 0;
let speed = 600;
let audio ;
let highScores = [];
let score = 0;

///// start buttom
$('#startGame').on('click', newGame);
///// color buttons
$(".red").on('click', checkCurrentClick);
$(".blue").on('click', checkCurrentClick);
$(".green").on('click', checkCurrentClick);
$(".yellow").on('click', checkCurrentClick);

/// ******* initialized om start button click
function newGame() {
  resetGame();
  newRound();
}


function delayPlay(toDelay, time) {
  window.setTimeout(toDelay, time);
}

///// ******** CREATES A NEW ROUND
function newRound(){
  currentRound++;
  clickCount = 1;
  speed = speed - 50;

  addToSequence();

/////// ****** Delay the animation
  delayPlay(function(){animate(sequence)},300);
  $('p').html('Round: ' + currentRound);
}

function highScore(){

  highScores.push(currentRound-1);
  highScores.sort();
  highScores.reverse();

  $('.highScores h3').html('Your High Score is: '+ highScores[0])

}


/// ******** Resets the game if the user clicks an incorrect color
function resetGame() {
  sequence = [];
  currentRound = 0;
  clickCount = 1;
  speed = 600;
  score = 0;
  // console.log("--------  RESET THE GAME -------------");
}
// console.log(sequence + " sequence");

/// ******* adds a new number to the sequence
function addToSequence(){
  //// push in a rendom number 1-4 from the randomNumber function
  sequence.push(randomNumber());
  // console.log(sequence);
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
    // console.log(checkedSequence + " " + color + " checkedSequence and color");
    // console.log(clickCount + " clickCount @ checkBoth");
    // console.log(sequence.length + " sequence length @ checkBoth");
}


////// AUDIO

function playAudio(audioID) {

        let audio = $('<audio autoplay></audio>');
          audio.append('<source src="sounds/'+audioID+'.mp3" type="audio/mp3" />');

}


/////*********  cHECKS THE USER INPUT AGAINST THE SEQUENCE AT THE CORRECT INDEX  IMPORTANT FUNCTION
function checkCurrentClick(){
  let numbToCheck = sequence[clickCount-1];
  let colorClicked = $(this).data('color');
  let seqLength = sequence.length;
  let audioID = parseInt(colorClicked+1);
// console.log(audioID + " AudioID ");
  playAudio(audioID);
  lightUp(colorClicked);
    if (clickCount < seqLength) { //// checks if under the sequence.length
      if (checkBoth(numbToCheck, colorClicked)){
          clickCount++;
          // score++;
      } else {  ///// triggers game over
          $('p').html('Sorry Game Over')
          highScore();
          resetGame();
      }

    } else if (clickCount === seqLength){ // checks if the two are the same so that the next round can be triggered
      if (checkBoth(numbToCheck, colorClicked)){ ///if  undnder or equal to the sequence length  and numbToCheck and the color are correct
          // score++;
          newRound();

      } else {  ///// triggers game over
          $('p').html('Sorry Game Over')
          highScore();

          resetGame();
      }
    }
}

////  used some of the code found here for the animate sequence
/////   https://codeplanet.io/building-simon-says-javascript/
function animate(sequence){
  // console.log(sequence); /// returns sequence
  let i = 0;
  let interval = setInterval(function(){

    lightUp(sequence[i]);
    playAudio(sequence[i]+1);
    // console.log(sequence[i] + " What is being lite up"); /// returning to console the number with after time
    // console.log("------------- END OF LIGHT UP ___");
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
