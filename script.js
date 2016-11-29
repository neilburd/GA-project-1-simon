$(document).ready(function(){
  console.log("Hello World!");

////set variable colors
  let red = 0;
  let blue = 1;
  let green = 2;
  let yellow = 3;

let sequenceLength = 4;

let number = Math.random();
let number4 = Math.floor(number*4);

let sequence = [];
let sequenceWords = [];

userArray = [];

console.log(number);
console.log(number4);

let createSequence = function() {
  for (let i = 0; i <= sequenceLength; i++) {

    sequence.push(Math.floor(Math.random()*4))
  }
  console.log(sequence);
};
createSequence();
console.log(sequence);


 let playSequence = function(){

   for (let i = 0; i <= sequence.length; i++) {
      if ( sequence[i] === red ){
        console.log("red")
        sequenceWords.push("red ");
        ////animate the play in and out size of div of color
      } else if ( sequence[i] === green ){
        console.log("green");
        sequenceWords.push("green ");
        ////animate the play in and out size of div of color
      } else if ( sequence[i] === blue ){
        console.log("blue");
        sequenceWords.push("blue ");
        ////animate the play in and out size of div of color
      } else if ( sequence[i] === yellow ){
        console.log("yellow");
        sequenceWords.push("yellow ");
        ////animate the play in and out size of div of color
      }
   }
 };
playSequence();
console.log(sequenceWords);
$("h2").html(sequenceWords)

let pushUserserArray = function(){

    console.log("RED");
  }
  console.log($(this));
  // userArray.push($(this));
  // console.log(userArray);
}




$(".red").on('click', pushUserserArray);
$(".blue").on('click', pushUserserArray);
$(".green").on('click', pushUserserArray);
$(".yellow").on('click', pushUserserArray);




});
//  $( "red" ).toggleClass( "red" );
//  $( "green" ).toggleClass( "green" );
//  $( "blue" ).toggleClass( "blue" );
//  $( "yellow" ).toggleClass( "yellow" );
//  if ( sequence[i] === red ){
//    $( "red" ).toggleClass( "redPlay" );
//  } else if ( sequence[i] === green ){
//    $( "green" ).toggleClass( "greenPlay" );
//  } else if ( sequence[i] === blue ){
//    $( "blue" ).toggleClass( "bluePlay" );
//  } else if ( sequence[i] === yellow ){
//    $( "yellow" ).toggleClass( "yellowPlay" );
//  }
