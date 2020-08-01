import '../style/style.scss';
import randomWords from 'random-words';

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

// init word
let randomWord = randomWords();

// init score
let score = 0;

// init time
let time = 10;

// init difficulty
let difficulty = localStorage.getItem("difficulty") !== null ?
    localStorage.getItem("difficulty") : "medium";

// set difficulty select value 
difficultySelect.value = difficulty;

// start counting down
const timeInterval = setInterval(updateTime, 1000);

//!  ALL FUNCTIONS  !//

// add word to DOM
function addWordToDOM() {
    word.innerHTML = randomWord;
}

// update score 
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
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
    const insertedText = e.target.value.trim();
    if (insertedText === randomWord) {
        randomWord = randomWords();
        addWordToDOM();
        updateScore();

        // clear
        e.target.value = "";

        // + time for difficulty 
        switch (difficulty) {
            case "easy":
                time += 4;
                randomWord = randomWords().toString();
                addWordToDOM();
                break;
            case "medium":
                time += 5;
                randomWord = randomWords({exactly:1, wordsPerString:2}).toString();
                addWordToDOM();
                break;
            case "hard":
                time += 6;
                randomWord = randomWords({exactly:1, wordsPerString:3}).toString();
                addWordToDOM();
                break;
            default:
                time += 5;
                break;
        }
        updateTime();
    }
})

// settings btn click
settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
})

// settings select 
settingsForm.addEventListener("change", e => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
    text.focus();
})

// settings btn animation
settingsBtn.addEventListener("click", () => {
    settingsBtn.classList.add("pressAnimation")
    settingsBtn.addEventListener("animationend", () => {
        settingsBtn.classList.remove("pressAnimation")
    })
})

document.addEventListener("DOMContentLoaded", () => {
    addWordToDOM();
    text.focus()
})