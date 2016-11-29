$(document).ready(function(){
  console.log("Hello World!");

////set variable colors
  let red;
  let blue;
  let green;
  let yellow;

let sequenceLength = 5;

let number = Math.random();
let number4 = Math.floor(number*4);

let sequence = [];

console.log(number);
console.log(number4);

let createSequence = function() {
  for (let i = 0; i <= sequenceLength; i++) {
    sequence.push(Math.floor(Math.random()*4))
  }
  console.log(sequence);
};
createSequence();




});
