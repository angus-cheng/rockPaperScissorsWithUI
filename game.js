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

let game = function() {
    let playerScore = 0;
    let compScore = 0;

    for (i = 0; i < 5; i++) {
        let playerSelection = window.prompt('Rock, paper or scissors?');
        switch (playRound(playerSelection, computerPlay())) {
            case 'You win!':
                playerScore++;
                break;

            case 'You lose!':
                compScore++;
                break;
        }
        
        console.log(`Your score: ${playerScore}. Computer's score: ${compScore}`);
    }

    if (playerScore > compScore) return 'You are the winner';
    else if (playerScore < compScore) return 'You are the loser';
    else return 'You tie with a computer...';
}

console.log(game());