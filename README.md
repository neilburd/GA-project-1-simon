#Simon Says

Simon says is a memory skill game in which the user repeats the pattern created by the computer.
My aproach to this game was to first break down step by step how the game was played. I diagramed gameplay to understand what I would need to program. This game is deceptively easy, but there are more steps to this than it seems.

1. the user needs to start the game somehow
2. the user is then presented with a pattern, in this game:
    1. the colors light up
    2. a sound is played for each color
    3. this is done in a random sequence
        1. that sequence keeps increasing in length as the game progresses.
        2. the sequence increases in speed as the game progresses.
3. the user then repeats the pattern.
    1.  if the user gets anything wrong the game is over
        1. the game resets and the user needs to click the start over button
    2. if the user gets the pattern correct the game advances to the next round
        1. the game goes back to the first step

I wanted my version of this game to look similar to the electronic game from the 80’s so I made a round board with four color tiles and a start button in the center this is what initializes the game and begins the pattern to be repeated. I decided to store the sequence in an array and push a new random number each round. I also realized that every click the user makes does not need to be stored as an array. I needed to check the current click against the corresponding index number of the sequence array. At this point I realized there are only 3 possible outcomes I would need to take into consideration. ‘

    A. the user clicks the correct answer and the sequence is complete.
    B. the user clicks the correct answer and the sequence is not complete.
    C. the user clicks the wrong answer.

I was then struggling with how to get the colors to light up and repeat the patten, I looked at other peoples examples of how they were able to do this and found a piece of code I reused in my game.

Once everything was working on a basic level I began styling the board. But I quickly became frustrated with having to click and decided to add the ability for the user to use the keyboard to repeat the pattern. Over a few versions I boiled down the functionality to be persistent from the load of the game and changed the shape of the board slightly to incorporate the letters to use for the game.

Overall I’m happy with how my game turned out, I’m happy I was able to add the keyboard functionality to it. I would like to change some of the styling, although I happy for now.
