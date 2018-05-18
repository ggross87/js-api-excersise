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
var blanksAndSuccesses = [];

// Holds all wrong guesses.
var wrongGuesses = [];

//Holds the letters guessed.
var letterGuessed = "";

// Game Counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTIONS (These functions are bits of code the I call upon to run when needed).
// ################################################################################

// startGame() function
// It's how the game will start and reset the Game.

function startGame() {
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
  blanksAndSuccesses = [];

  // Here I reset the wrong guesses from each previous round.
  wrongGuesses = [];

  // Filling up the blanksAndSuccess list with the appropriate number of blanks.
  // This is based on the number of letters in a solution.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }
  // Printing the initial blanks in the console
  console.log(blanksAndSuccesses);

  // Reprints the guessesLeft to 9.
  document.getElementById("guesses-Left").innerHTML = numGuesses;

  // Prints the blanks at the beginning of each round in the HTMl.
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

  // Clears the worng guesses from previous round.
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// checkLetters() function
// It's where the game will do all the comparison for matches.

function checkLetters(letter) {
  // This boolean will be called based on whether or not a letter is found anywhere in the word.
  var lettersInWord = false;

  // Checks if the letter exists inside the array at all
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      // If letter exists then toggle this boolean to true
      lettersInWord = true;
    }
  }

    // If letter in the word exist somewhere then figure out where and which indices.
    if (lettersInWord) {
      // Looping through the word.
      for (var j = 0; j < numBlanks; j++) {
        // Populate the blanksAndSuccess with every instance of the letter
        if (chosenWord[j] === letter) {
          // Setting specific blan spaces to equal the correct letter when there is a matches
          blanksAndSuccesses[j] = letter;
        }
      }
      // Printing the current blanks and successes for testing
      console.log(blanksAndSuccesses);
    }

    // if the letter doesn't exist at all...
    else {
      // Then I add the letter to the list of wrong letters.
      wrongGuesses.push(letter);

      // I also subtract one the of guesses.
      numGuesses--;
    }

}

// roundComplete() function
// Here I will have all oof the code that needs to be ran after ech guess is made.

function roundComplete() {
  // First, I'll log an intial status update in the console log to tell how many wins,
  // losses and guesses are left.
  console.log("WinCount: " + winCounter + " |LossCount: " + lossCounter + " |NumGuesses: " + numGuesses );

  // HTML UPDATES
  // ============

  // Update the HTML to reflect the new number of guesses.
  document.getElementById("guesses-Left").innerHTML = numGuesses;

  // This will print the array of guesses and blanks onto the page.
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

  // This will print the wrong guesses onto the page.
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

  // If my hangman string equals the solution...
  if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {

    // Add to the win counter.
    winCounter++;

    // Alert user of win.
    alert("You win!");

    // Update win counter in HTML.
    document.getElementById("win-counter").innerHTML = winCounter;

    // Restart the game
    startGame();
  }
    // If the user runs out of guesses.
    else if (numGuesses === 0) {

      // Add to the loss counter.
      lossCounter++;

      // Alert user of loss.
      alert("You lose!");

      // Update the loss counter in HTML.
      document.getElementById("loss-counter").innerHTML = lossCounter;

      // Restart the game.
      startGame();

    }
}

// MAIN PROCESS ( This is the code that controls what is ran and when).
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Starts the game by running the startGame() function.
startGame();

// Then initiates the function for capturing key clicks
document.onkeyup = function(event) {

  // Converts all key clicks to lowercase letters.
  letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

  // Runs the code to check for the correct guess.
  checkLetters(letterGuessed);

  // Runs the code that ends each round.
  roundComplete();
};
