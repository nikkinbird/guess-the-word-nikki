const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

const inProgressSymbols = function (word) {
    let wordArray = [];
    for (let letter of word) {
        wordArray.push("●");
        //console.log(wordArray);
    }
    wordInProgress.innerText = wordArray.join("");
};

inProgressSymbols(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    let guess = letter.value;
    console.log(guess);
    letter.value = "";
});