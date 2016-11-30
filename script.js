/*jshint esversion: 6 */
$(document).ready(function(){
  console.log("Hello World!");

////set variable colors
  const red = 0;
  const blue = 1;
  const green = 2;
  const yellow = 3;

let sequenceLength = 0;

let sequence = [];
let sequenceWords = [];

let userArray = [];
let currentClick;
let clickCount;

function newGame() {
  addToSequence();

  animate(sequence);
}


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

function lightUp(color) {
  let colorToLight = $('[data-color=' + color + ']').addClass('lightUp');

  // console.log(colorToLight + " colorToLight"); /// returns Object

  window.setTimeout(function() {
    colorToLight.removeClass('lightUp');
  }, 300);
}

function addToSequence(){

  sequence.push(Math.floor(Math.random()*4));

  console.log(sequence);


}
// newGame();
// let createSequence = function() {
//   for (let i = 0; i <= sequenceLength; i++) {
//     let rand = Math.floor(Math.random()*4);
//     sequence.push(rand);
//
//     if ( rand === red ){
//       // console.log("red")
//       sequenceWords.push("red ");
//     } else if ( rand === green ){
//       // console.log("green");
//       sequenceWords.push("green ");
//     } else if ( rand === blue ){
//       // console.log("blue");
//       sequenceWords.push("blue ");
//     } else if ( rand === yellow ){
//       // console.log("yellow");
//       sequenceWords.push("yellow ");
//     };
//
//   };
// };

// createSequence();
console.log(sequence);
/// put the sequence on the screen
$("h2").html(sequenceWords);

$('#startGame').on('click', newGame);

let pushUserserArray = function(){

  if ($(this).hasClass('red')){
    console.log("RED");
    userArray.push(red);
    currentClick = red;
    checkLength();
    // checkIfSame();

  } else if ($(this).hasClass('blue')) {
    console.log("BLUE");
    userArray.push(blue);
    currentClick = blue;
    checkLength();
    // checkIfSame();

  } else if ($(this).hasClass('green')) {
    console.log("GREEN");
    userArray.push(green);
    currentClick = green;
    checkLength();
    // checkIfSame();

  } else if ($(this).hasClass('yellow')){
    console.log("YELLOW");
    userArray.push(yellow);
    currentClick = yellow;

    checkLength();
    // checkIfSame();
  }
};

$(".red").on('click', pushUserserArray);
$(".blue").on('click', pushUserserArray);
$(".green").on('click', pushUserserArray);
$(".yellow").on('click', pushUserserArray);

/// CHECK IF CURRENT CLICK IS SAME
// checkIfSame = function(){
//   whatToCheck = userArray.length;
//   console.log(whatToCheck);
//
//   if (sequence[clickCount] === currentClick){
//     console.log("YOU GOT IT RIGHT");
//
//   } else {
//     console.log("INCORRECT");
//   };
// };
//// check if click completes the sequence

checkLength = function(){
  if (sequence.length === userArray.length){
    console.log("SAME LENGTH!");
  } else {
    console.log("Keep Going!");
  }
}

});////****END OF DOCUMENT READY
