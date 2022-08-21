console.log("The javascript is correctly connected.");
localStorage.clear();

let colorArray = ["violet", "indigo", "blue", "green", "yellow", "orange", "red", "white", "crimson", "grey"];
let colorSelectionArray = [false, false, false, false, false, false, false, false, false, false];
let numSelectionArray = [false, false, false, false, false, false, false, false, false, false];
let valueArray = [];
let scoreValue = 0;
if (localStorage.getItem("maxScoreValue") == null) {
    localStorage.setItem("maxScoreValue", "0");
}
let maxScore = document.getElementById("maxScore");
maxScore.innerHTML = maxScore.innerHTML + localStorage.getItem("maxScoreValue");
let numArray = [];
let result;
let symArray = [];
let roundsCounter = 0;
let rounds = 0;
let cards = document.getElementById("cards");
let insertCardNumber = 0;
let showCardNumber = 0;
let container = document.getElementById("container");
container.style.display = "none";
let instructions = document.getElementById("instructions");
let startButton = document.getElementById("start");
let timeOfCards = 0;
let timeNextRound = 600;

let ans = document.getElementById("answer");
ans.style.display = "none";
ans.addEventListener("keypress", waitTillEnterKeyIsPressed);

function waitTillEnterKeyIsPressed() {
    if (event.key === "Enter") {
        console.log("Enter key is pressed.");
        if (ans.value == result) {
            console.log("Correct Answer");
            ++scoreValue;
            let score = document.getElementById("score");
            score.innerHTML = "Score: " + scoreValue;
            if (scoreValue > JSON.parse(localStorage.getItem("maxScoreValue")))
                localStorage.setItem("maxScoreValue", JSON.stringify(JSON.parse(localStorage.getItem("maxScoreValue")) + 1));
            maxScore.innerHTML = "Max Score: " + localStorage.getItem("maxScoreValue");
            ans.style.display = "none";
            clearCards();
            cards.innerHTML = "CORRECT";
            cards.classList.add("correct");
            start();
        }
        else {
            console.log("Game Over");
            gameOver();
        }
    }
}

function resultCalculate() {
    for (let i = 0; i < numArray.length - 1; ++i) {
        if (symArray[i] == 0) {
            result = parseInt(numArray[i] + numArray[i + 1], 10);
            numArray[i + 1] = result;
        }
        else if (symArray[i] == 1) {
            result = parseInt(numArray[i] - numArray[i + 1], 10);
            numArray[i + 1] = result;
        }
        else if (symArray[i] == 2) {
            result = parseInt(numArray[i] * numArray[i + 1], 10);
            numArray[i + 1] = result;
        }
        else if (symArray[i] == 3) {
            result = parseInt(numArray[i] / numArray[i + 1], 10);
            numArray[i + 1] = result;
        }
        else {
            result = parseInt(numArray[i] % numArray[i + 1], 10);
            numArray[i + 1] = result;
        }
    }

    result = parseInt(result, 10);
    console.log(result);
}

async function clearCardsDelay(time) {
    await new Promise(resolve => setTimeout(resolve, time));
    clearCards();
}

async function showCardsDelay(time, showCardNumber) {
    await new Promise(resolve => setTimeout(resolve, time));
    showCards(showCardNumber);
}

let startGame = document.getElementById("start");
startGame.addEventListener("click", start);

function insertCard(insertCardNumber) {
    let x;
    for (let i = 0; i < insertCardNumber; ++i) {
        console.log("insertCard" + i + " is running");
        do { x = Math.floor((Math.random() * 10)); }
        while (!colorSelectionArray[x] == false);
        colorSelectionArray[x] = true;
        cards.innerHTML = cards.innerHTML + '<div class="card" id="card' + i + '"></div>';
        let card = document.getElementById("card" + i);
        card.style.backgroundColor = colorArray[x];
        let color = colorArray[x];
        valueArray.push(color);
        do { x = Math.floor((Math.random() * 10) + 1); }
        while (!numSelectionArray[x] == false);
        numSelectionArray[x] = true;
        card.innerHTML = '<span class="num">' + x + '</span>';
        valueArray.push(x);
    }
}

function showCards(showCardNumber) {
    ans.value = "";
    ans.style.display = "flex";
    let x;
    let sym;
    for (let i = 0; i < showCardNumber; ++i) {
        console.log("showCards" + i + " is running");
        do { x = Math.floor((Math.random() * 10)); }
        while (colorSelectionArray[x] == false);
        colorSelectionArray[x] = false;
        cards.innerHTML = cards.innerHTML + '<div class="card" id="card' + i + '"></div>';
        let card = document.getElementById("card" + i);
        card.style.backgroundColor = colorArray[x];
        let pos = -1;
        for (let j = 0; j < valueArray.length; ++j)
            if (valueArray[j] == colorArray[x])
                pos = j;
        numArray.push(valueArray[++pos]);
        if (i != showCardNumber - 1) {
            x = Math.floor((Math.random() * 10));
            if (x <= 1) { sym = "+"; symArray.push(0); }
            else if (x <= 3) { sym = "-"; symArray.push(1); }
            else if (x <= 5) { sym = "*"; symArray.push(2); }
            else if (x <= 7) { sym = "/"; symArray.push(3); }
            else { sym = "%"; symArray.push(4); }
            cards.innerHTML = cards.innerHTML + '<div class="symCard">' + sym + '</div>';
        }
    }
    resultCalculate();
}

function clearCards() {
    cards.innerHTML = "";
}

function start() {
    ++roundsCounter;
    if(roundsCounter!=1)
    timeNextRound = 2000;
    if (roundsCounter <= 5) {
        if (roundsCounter == 1) {
            rounds = 1;        }
        insertCardNumber = 3;
        timeOfCards = 5000;
        if (roundsCounter <= 2)
            showCardNumber = 2;
        else showCardNumber = 3;
    }
    else if (roundsCounter <= 15) {
        if (roundsCounter == 6) {
            rounds = 2;
            cards.innerHTML = "ROUND " + rounds;
        }
        insertCardNumber = 4;
        timeOfCards = 6000;
        if (roundsCounter <= 9)
            showCardNumber = 2;
        else if (roundsCounter <= 12)
            showCardNumber = 3;
        else showCardNumber = 4;
    }
    else {
        if (roundsCounter == 16) {
            rounds = 3;
            cards.innerHTML = "ROUND " + rounds;
        }
        insertCardNumber = 5;
        timeOfCards = 7000;
        if (roundsCounter <= 18)
            showCardNumber = 2;
        else if (roundsCounter <= 22)
            showCardNumber = 3;
        else if (roundsCounter <= 27)
            showCardNumber = 4;
        else showCardNumber = 5;
    }
    console.log("Started the game.");
    colorSelectionArray = [false, false, false, false, false, false, false, false, false, false];
    numSelectionArray = [false, false, false, false, false, false, false, false, false, false];
    valueArray = [];
    numArray = [];
    symArray = [];
    startButton.style.visibility = "hidden";
    timeDelay(timeNextRound);
}

async function timeDelay(time) {
    await new Promise(resolve => setTimeout(resolve, time));
    instructions.style.display = "none";
    container.style.display = "block";
    cards.classList.remove("correct");
    clearCards();
    insertCard(insertCardNumber);
    clearCardsDelay(timeOfCards);
    showCardsDelay(timeOfCards, showCardNumber);
}

function gameOver() {
    clearCards();
    ans.style.display = "none";
    cards.innerHTML = '<span class="GameOver">GAME OVER<span>';
    insertCardNumber = 0;
    rounds = 0;
    roundsCounter = 0;
    startButton.style.visibility = "visible"
    startButton.innerHTML = "Restart Game";
    scoreValue = 0;
    score.innerHTML = "Score: 0";
}
