//const socket = io.connect("http://localhost:4000");

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

class game {
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

function createGameButton() {
    firstPlayer=true;
    const playerName=$("input[name=p1name").val();
    socket.emit('createGame',{name:playerName});
}

function toggleDisplay() {
    element = document.getElementById('compGame');
    element.style.display = 'block';
}

const compGameBut = document.querySelector('#computer');
compGameBut.addEventListener('click', toggleDisplay);

const buttons = document.querySelectorAll('.option');
buttons.forEach(button => button.addEventListener('click', displayResult));

const createGameButton = document.querySelector('#createGame');
createGameButton.addEventListener('click', )
let match = new game();