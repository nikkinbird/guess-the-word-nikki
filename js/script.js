const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLettersArray = [];

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
    message.innerText = "";
    let validInput = checkInput(guess);
    if (validInput != undefined) {
        makeGuess(validInput);
    }
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

//Function to capture input 
const makeGuess = function(letter) {
    let ucLetter = letter.toUpperCase();
    //console.log(ucLetter);
    if (guessedLettersArray.includes(ucLetter)) {
        message.innerText = `You already guessed the letter ${ucLetter}!`;
    } else {
        guessedLettersArray.push(ucLetter);
        //console.log(guessedLettersArray);
        showGuessedLetters();
        updateWord(guessedLettersArray);
    }
}

// Function to show the guessed letters on the page
const showGuessedLetters = function() {
    guessedLetters.innerHTML = "";
    guessedLettersArray.forEach(function(letter) {
        let li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    });
}

// Function to update the word in progress
const updateWord = function(guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const wordInProgArray = [];
    wordArray.forEach(function(letter){
        if (guessedLettersArray.includes(letter)) {
            wordInProgArray.push(letter);
        } else wordInProgArray.push("●");
        wordInProgress.innerText = wordInProgArray.join("");
    });
         
}

