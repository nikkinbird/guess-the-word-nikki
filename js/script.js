const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

// Function to display circle symbols for letter spaces
const inProgressSymbols = function (word) {
    let wordArray = [];
    for (let letter of word) {
        wordArray.push("●");
        //console.log(wordArray);
    }
    wordInProgress.innerText = wordArray.join("");
};

inProgressSymbols(word);

// Event listener for Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    let guess = letter.value;
    checkInput(guess);
    letter.value = "";
});

// Function to check player's input
const checkInput = function(letter) {
    const acceptedLetter = /[a-zA-Z]/;
    if (letter === "") {
        message.innerText = "Oops! Please enter a letter";
    } else if (letter.length > 1) {
        message.innerText = "Please enter only one letter at a time";
    } else if (!letter.match(acceptedLetter)) {
        message.innerText = "Please enter a letter";
    } else return letter;
}

