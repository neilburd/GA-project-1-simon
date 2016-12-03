/*jshint esversion: 6 */

// global namespace
let MYGAME = MYGAME || {};

  MYGAME.commonMethod = {
    sequence:  [], ///start new game with empty sequence
    clickCount:  0, // start with click count at 0
    currentRound: 0, /// keeps track of the rounds
    speed:  600, /// initial speed setting
    highScores:  [], /// track the high scores
    highScoreValue:  localStorage.getItem("highScore"), // pull the highScore from local

    newGame: function() {
      resetGame();
      newRound();
      },

    delayPlay: function(toDelay, time) {
      window.setTimeout(toDelay, time);
      },

    newRound: function(){
      currentRound++;
      clickCount = 1;
      speed = speed - 50;
      addToSequence();
      /////// ****** Delay the animation
      delayPlay(function(){
        animate(sequence)
        }, 300);

      $('.round').html('Round: ' + currentRound);
      },

      ////// ***** HIGH SCORE
    highScore: function(){
      highScores.push(currentRound-1);
      highScores.sort();
      highScores.reverse();
      highScoreValue = highScores[0];
      $('.highScores h3').html('Your High Score is: '+ highScoreValue);
      ////// ***** Save localy
      localStorage.setItem("highScore", highScoreValue);
      },

      /// ******** Resets the game if the user clicks an incorrect color
    resetGame: function() {
      sequence = [];
      currentRound = 0;
      clickCount = 1;
      speed = 600;
      },

    /// ******* adds a new number to the sequence
    addToSequence: function(){
      sequence.push(randomNumber());
      },

      ///******** creates a random number between 1-4
    randomNumber: function(){
      return  Math.floor((Math.random()*4));
      },

      // ******** will check if the to values passed into it are the same
    checkBoth: function(value1, value2) {
      if (value1 === value2){
        return true;
      }
      else {
        return false;
      }
      },

      ////// ********* AUDIO
    playAudio: function(audioID) {
      let audio = $('<audio autoplay></audio>');
      audio.append('<source src="sounds/'+audioID+'.mp3" type="audio/mp3"/>');
      },

      ////  used some of the code found here for the animate sequence
      /////   https://codeplanet.io/building-simon-says-javascript/
    animate: function(sequence) {
      let i = 0;
      let interval = setInterval(function(){
        lightUp(sequence[i]);
        playAudio(sequence[i]+1);
        i++;
        if (i === sequence.length) {
          clearInterval(interval);
        }
      }, speed);
      },

      /// the lightUp function
    lightUp: function(color) {
      let colorToLight = $('[data-color=' + color + ']').addClass('lightUp');
      window.setTimeout(function() {
        colorToLight.removeClass('lightUp');
      }, speed/2);
      },

      /////*********  cHECKS THE USER INPUT AGAINST THE SEQUENCE AT THE CORRECT INDEX  IMPORTANT FUNCTION
    checkCurrentClick: function(){
      let numbToCheck = sequence[clickCount-1];
      let colorClicked = $(this).data('color');
      let seqLength = sequence.length;
      let audioID = parseInt(colorClicked+1);
      playAudio(audioID);
      lightUp(colorClicked);
        if (clickCount < seqLength) { //// checks if under the sequence.length
          if (checkBoth(numbToCheck, colorClicked)){
              clickCount++;
          } else {  ///// triggers game over
              $('.round').html('Sorry Game Over')
              playAudio('buzzer');
              highScore();
              resetGame();
          }

        } else if (clickCount === seqLength){ // checks if the two are the same so that the next round can be triggered
          if (checkBoth(numbToCheck, colorClicked)){ ///if  undnder or equal to the sequence length  and numbToCheck and the color are correct
              newRound();

          } else {  ///// triggers game over
              $('.round').html('Sorry Game Over')
              playAudio('buzzer');
              highScore();
              resetGame();
          }
        }
      },
  };
