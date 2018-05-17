// GLOBAL VARIABLES (Accessible by all functions)
// ==============================================

// Array of word options (all lowercase)
var wordlist = ["variables","function","script","array","braces",
"quotes","semicolon","scope","string","numbers","boolean","parentheses"];

// Computer selected solution will be held here.
var chosenWord = "";

// This will break the solution into to individual letters to be stored in an array.
var lettersInChosenWord = [];

// This will be the number of blanks I show based on the solution.
var numBlanks = 0;

// Holds a mix of blank and solved letter (ex: 's, _ _, n, _').
var blanksAndSuccess = [];

// Holds all wrong guesses.
var wrongGuesses = [];

//Holds the letters guessed.
var letterGuessed = "";

// Game Counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTIONS (These functions are bits of code the I call upon to run when needed).
// ################################################

// startgame()
// It's how the game will start and reset the Game.

function startgame() {
  // Reset the guesses back to 0.
  numGuesses = 9;

  // Solution chaosen randomly from wordlist.
  chosenWord = wordlist[Math.floor(Math.random() * wordlist.length)];

  // The words are broken into individual letters.
  lettersInChosenWord = chosenWord.split("");

  // The game will count the number of letters in the word.
  numBlanks = lettersInChosenWord.length;

  // Printing the soution in the console for testing.
  console.log(chosenWord);

  // Here I reset the guess and success array at each round.
  blanksAndSuccess = [];

  // Here I reset the wrong guesses from each previous round.
  wrongGuesses = [];

  // Filling up the blanksAndSuccess list with the appropriate number of blanks.
  // This is based on the number of letters in a solution.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccess.push("_");
  }
  // Printing the initial blanks in the console
  console.log(blanksAndSuccess);

  // Reprints the guessesLeft to 9.
  document.getElementById("guesses-Left").InnerHTML = numGuesses;

  // Prints the blanks at the beginning of each round in the HTMl.
  document.getElementById("word-blanks").InnerHTML = blanksAndSuccess.join(" ");

  // Clears the worng guesses from previous round.
  document.getElementById("wrong-guesses").InnerHTML = wrongGuesses.join(" ");
}
