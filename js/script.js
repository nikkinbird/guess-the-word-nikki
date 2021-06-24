const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let word = "";
const guessedLettersArray = [];
let remainingGuesses = 8;

// Function to get a random word from txt file
const getWord = async function() {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //console.log(randomIndex);
    const randomWord = wordArray[randomIndex];
    word = randomWord.trim();
    inProgressSymbols(word);
}

getWord();

// Function to display circle symbols for letter spaces
const inProgressSymbols = function (word) {
    let wordArray = [];
    for (let letter of word) {
        wordArray.push("●");
        //console.log(wordArray);
    }
    wordInProgress.innerText = wordArray.join("");
};

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
        trackGuesses(ucLetter);
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
        } else {
            wordInProgArray.push("●");
        }
    });
    wordInProgress.innerText = wordInProgArray.join("");
    verifyWin(wordInProgArray);
}

//Function to track remaining guesses
const trackGuesses = function(letter) {
    const ucWord = word.toUpperCase();
    if (ucWord.includes(letter)) {
        message.innerText = `${letter} is in the word!`;
    } else {
        remainingGuesses -= 1;
        message.innerText = `Sorry, ${letter} is not in the word.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Sorry, you're all out of guesses.<br> The word was ${word.toUpperCase()}.`;
        startOver();
    } else remaining.innerHTML = `<p>You have <span>${remainingGuesses}</span> guesses left</p>`;
}

// Function to check and verify if player won
const verifyWin = function(array) {
    const checkWord = array.join("");
    const wordUpper = word.toUpperCase();
    if (checkWord === wordUpper) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        startOver();
    } // else console.log("womp womp");
}

const startOver = function() {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedLetters.classList.add("hide");
    playAgainButton.classList.remove("hide");
}


