/*jshint esversion: 6 */
$(document).ready(function(){
  console.log("Hello World!");

let sequence = [];
let checkSequence = sequence;

let currentClick;
let whatToCheck = [];


let clickCount;

let currentRound = 1;

///// start buttom
$('#startGame').on('click', newGame);
///// color buttons
$(".red").on('click', checkCurrent);
$(".blue").on('click', checkCurrent);
$(".green").on('click', checkCurrent);
$(".yellow").on('click', checkCurrent);

/// initialized om start button click
function newGame() {
  /// adds one number to the sequence
  addToSequence();
  ///// Animates the sequence.
  animate(sequence);
  /// calls new Round /// changes the text to be what the round is
  newRound();

  console.log(sequence + " sequence @ start of round");
  console.log(checkSequence + " checkSequence");
}

function newRound(){
  /// place the round on the board
  $('p').html('Round: ' + currentRound);
  /// add one to the click count
  currentRound++;
  // console.log(currentRound);
  clickCount = 0;
}
// console.log(sequence + " sequence");

////  used some of the code found here for the animate sequence
/////   https://codeplanet.io/building-simon-says-javascript/

function animate(sequence){
  // console.log(sequence); /// returns sequence
  let i = 0;
  let interval = setInterval(function(){
    lightUp(sequence[i]);
    // console.log(sequence[i]); /// returning to console the number with after time
    i++;
    if (i > sequence.length) {
      clearInterval(interval);
    }
  }, 600);

}


/// the lightUp function
function lightUp(color) {
  let colorToLight = $('[data-color=' + color + ']').addClass('lightUp');
  // console.log(colorToLight + " colorToLight"); /// returns Object
  window.setTimeout(function() {
    colorToLight.removeClass('lightUp');
  }, 300);
}


////////////////////////////////////

/// adds a new number to the sequence
function addToSequence(){
  //// push in a rendom number 1-4
  sequence.push(randomNumber());
  // console.log(sequence);
}
// console.log(sequence);

/// creates a random number between 0-3
function randomNumber(){
  return  Math.floor(Math.random()*4);
}

 // let copy = sequence.slice(0);
 // console.log(copy);


function checkCurrent(){

  console.log(sequence + " sequence on Click");

  console.log(checkSequence[clickCount] + " checkSequence @ clickcount");

  let colorClicked = $(this).attr('class');
  console.log(colorClicked);

  switch (colorClicked) {
    case "color red":
      console.log("RED");
      break;
    case "color blue":
      console.log("BLUE");
      break;
    case "color green":
      console.log("GREEN");
      break;
    case "color yellow":
      console.log("YELLOW");
      break;

    // default:
  }
  // whatToCheck = checkSequence.slice(0,1);

  // whatToCheck = checkSequence.shift();
  //
  //
  // console.log(checkSequence + " checkSequence");
  //
  // console.log(whatToCheck + " whatToCheck");
  //
  // console.log(sequence + " sequence");




  clickCount++;
  console.log(clickCount + " clickCount");
  console.log("-----------------------------------");

};





});////****END OF DOCUMENT READY
// let keyValue = $(".color").data("color");
// let myClass = $(this).attr('data-color');
//
//   userArray.push(parseInt(myClass));
//   let lengthUser = userArray.length
//   // console.log(clickCount + " CLICK COUNT");
//   // console.log(userArray + " USER ARRAY"); //records what the user clicks\
//   // console.log(sequence + " SEQUENCE");
//   // console.log(keyValue + " KEYVALUE"); /// always returning 0
//   //
//
//   //// get the 0 indexed item in the sequece
//
