// Select Elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
    "airplane",
    "ball",
    "juice",
    "cake",
    "bad",
    "north",
    "warlike",
    "dependent",
    "steer",
    "quince",
    "eight",
    "feeble",
    "admit",
    "drag",
    "loving",
    "tense"
]

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;


// focus on text on start
text.focus()

// start counting down
const timeInterval = setInterval(updateTime, 1000);

addWordToDOM();


//!  ALL FUNCTIONS  !//
// random word 
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord
}

// update score 
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

// game over, show and screen
function gameOver() {
    endGameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your Final Score is ${score} </p>
        <button onclick="location.reload()">Reload</button>
    `
    endGameEl.style.display = "flex";
}

//! ALL EVENT LISTENERS !//
text.addEventListener("input", e => {
    const insertedText = e.target.value;
    console.log(insertedText);
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // clear
        e.target.value = "";
        time += 2;
        updateTime();
    }
})

// settings btn animation
settingsBtn.addEventListener("click", () => {
    settingsBtn.classList.add("pressAnimation")
    settingsBtn.addEventListener("animationend", () => {
        settingsBtn.classList.remove("pressAnimation")
    })
})