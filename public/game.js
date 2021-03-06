// const socket = io.connect("http://localhost:4000");

let firstPlayer=false;
let roomID;

function computerPlay() {
    const options = ['Rock', 'Paper', 'Scissors'];
    return options[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    playerSelection.toLowerCase();
    switch (playerSelection) {
        case 'rock':
            if (computerSelection == 'Rock') return 'You tie!';
            else if (computerSelection == 'Paper') return  'You lose!';
            else return 'You win!';

        case 'paper':
            if (computerSelection == 'Rock') return 'You win!';
            else if (computerSelection == 'Paper') return  'You tie!';
            else return 'You lose!';

        case 'scissors':
            if (computerSelection == 'Rock') return 'You lose!';
            else if (computerSelection == 'Paper') return  'You win!';
            else return 'You tie!';

        default:
            'Please enter rock, paper or scissors. You have played before, yes?'
    }

}

class compGame {
    constructor() {
        this.playerScore = 0;
        this.computerScore = 0;
    }

    addToPlayerScore() {
        this.playerScore += 1;
    }

    addToComputerScore() {
        this.computerScore += 1;
    }

    getPlayerScore() {
        return this.playerScore;
    }

    getComputerScore() {
        return this.computerScore;
    }

    checkWin() {
        if (this.playerScore >= 5 || this.computerScore >= 5) {
            return true;
        }

        return false;
    }
}

let match = new compGame();

function displayPlayerOption(playerChoice) {
    let option = document.querySelector('.playerOption');
    option.textContent = `You played ${playerChoice.id}`;
}

function changeScore() {
    let score = document.querySelector('.score');
    score.textContent = `The score is ${match.getPlayerScore()}-${match.getComputerScore()} (player-computer)`
    if (match.checkWin()) {
        if (match.getPlayerScore() > match.getComputerScore()) score.textContent = 'You are the winner';
        else if (match.getPlayerScore() < match.getComputerScore()) score.textContent = 'You are the loser';
        else score.textCOntent = 'You tie with a computer...';
    }
}

function displayResult() {
    displayPlayerOption(this);

    let computersHand = computerPlay();    
    let resultClass = document.querySelector('.result');
    let result = playRound(this.id, computersHand);

    if (result == 'You tie!') {
        resultClass.textContent = `The computer played ${computersHand}. You tie!`;
    } else if (result == 'You win!') {
        resultClass.textContent = `The computer played ${computersHand}. You win!`;
        match.addToPlayerScore();
        changeScore();
    } else {
        resultClass.textContent = `The computer played ${computersHand}. You lose!`;
        match.addToComputerScore();
        changeScore();
    }
}

function createGame() {
    firstPlayer=true;
    //const playerName=$("input[name=p1name").val();
    const playerName = "Steve"
    socket.emit('createGame',{name:playerName});
}

function toggleDisplay(id) {
    element = document.getElementById(id);
    element.style.opacity = 1;
}

/*
    BUTTONS
*/
const playerGameBtn = document.querySelector('#multiplayer');
playerGameBtn.addEventListener('click', () => {toggleDisplay('playerGame')});

const compGameBtn = document.querySelector('#computer');
compGameBtn.addEventListener('click', () => {toggleDisplay('compGame')});

const rockPaperScissorBtns = document.querySelectorAll('#compGame .option');
rockPaperScissorBtns.forEach(button => button.addEventListener('click', displayResult));

const createGameBtn = document.querySelector('#create');
createGameBtn.addEventListener('click', createGame);

const startGameBtn = document.querySelector('.titleBg');
const content = document.querySelector('.contentBg');
startGameBtn.addEventListener('click', () => {
    startGameBtn.setAttribute('style', 'opacity: 0; transition: 0.6s linear');
    content.setAttribute('style', 'opacity: 1; transition: 0.6s linear; transition-delay: 1s') 
});
startGameBtn.addEventListener('transitionend', () => {
    startGameBtn.setAttribute('style', 'display: none');
});

//New Game Created Listener
socket.on("newGame", (data) => {
    document.querySelector("#message").innerText = "Waiting for player 2, room ID is " + data.roomID;
    roomID = data.roomID;
});
