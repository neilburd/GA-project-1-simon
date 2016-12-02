/*jshint esversion: 6 */
$(document).ready(function(){
console.log("Hello World!");

let sequence = [];
let clickCount = 0;
let currentRound = 0;
let speed = 600;
let audio ;


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
// console.log("--------NEW GAME---------");
// console.log("-----------------------------------");
}

///// ******** CREATES A NEW ROUND
function newRound(){
  currentRound++;
  clickCount = 1;
  speed = speed - 20;
  addToSequence();
  animate(sequence);
  /// place the round on the board
  $('p').html('Round: ' + currentRound);
  // console.log(currentRound + " current Round @ newRound");
}

/// ******** Resets the game if the user clicks an incorrect color
function resetGame() {
  sequence = [];
  currentRound = 0;
  clickCount = 1;
  speed = 600;
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
      // console.log(sequence + " ///sequence on Click");
      // console.log(sequence[clickCount] + " ///sequence @ index clickCount");
      // console.log(clickCount + " clickcount @ time it checks"); ///returns 0
      // console.log(seqLength + " sequence length variable");
    /// check sequence length to click count length
    if (clickCount < seqLength) { //// checks if under the sequence.length
      if (checkBoth(numbToCheck, colorClicked)){
          clickCount++;
          // console.log(clickCount + " clickCount after the values equate to the same");
          // console.log("Under Length of sequence and correct");
          // console.log("-----------------------------------");
      } else {  ///// triggers game over
          $('p').html('Sorry Game Over')
          resetGame();
          // console.log("Under Length of sequence and incorrect");
          // console.log("-----------------------------------");
      }

    } else if (clickCount === seqLength){ // checks if the two are the same so that the next round can be triggered
      if (checkBoth(numbToCheck, colorClicked)){ ///if  undnder or equal to the sequence length  and numbToCheck and the color are correct
          newRound();
          console.log("clicks equal to Length of sequence and correct");
          console.log("-----------------------------------");
      } else {  ///// triggers game over
          $('p').html('Sorry Game Over')

          resetGame();
          console.log("clicks equal to Length of sequence and incorrect");
          console.log("-----------------------------------");
      }
    }
  console.log(clickCount + " clickCount");
  console.log("----------- END OF CLICK ----------------");
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
