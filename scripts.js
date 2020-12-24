const numberOfCards = 25;
let isAnswerVisible = false;

let randomWords = [];

const getRandomWords = () => {
    while (randomWords.length < numberOfCards) {
        let number = Math.floor(Math.random() * (words.length - 1) ); 
        if (!randomWords.includes(words[number])) {
            randomWords.push(words[number]);
        }
    }
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

// Create board
const createBoard = () => {
    const container = document.getElementById('container');
    let ul = document.createElement('ul');
    container.appendChild(ul);
    for (i = 0; i < numberOfCards; i++) {
        var li = document.createElement('li');
        li.setAttribute('class', 'card');
        li.innerText = randomWords[i];
        ul.appendChild(li);
    }
}

// Flip Card

const flipCard = (card) => {
    card.classList.add('flipped');    
    
    if (card.getAttribute('team') === 'assassin') {
        let capitalizedTeam = capitalize(currentPlayer);
        alert(`${capitalizedTeam} Lost ☠️`);
    } else {
        checkScore();
    }
}

// Assign teams and assassins
const teams = ['blue', 'red'];
let currentPlayer = teams[Math.floor(Math.random() * (teams.length))];
document.getElementById('currentPlayer').innerText += currentPlayer;
const cardsPerTeam = 9; 
const assassinCards = 1; 

const assignCards = () => {
    const cards = document.querySelectorAll('.card');

    // Add listener event o cards
    cards.forEach(card => {
        card.addEventListener("click", function(){ 
            flipCard(card);
         });
    })

    let unassignedTeamCards = cardsPerTeam; 
    let unassignedAssassinCards = assassinCards;
    let target = 0;
    
    teams.forEach(team => {
        if (team === currentPlayer) {
            target = 0;
        } else {
            target = 1;
        }
        while (unassignedTeamCards !== target) {
            let randomNumber = Math.floor(Math.random() * (cards.length - 1)); 
            if (cards[randomNumber].getAttribute('team') === null ) {
                cards[randomNumber].setAttribute('team', `${team}`)
                cards[randomNumber].classList.add(`${team}`)
                unassignedTeamCards -= 1;
            }
        }
        unassignedTeamCards = cardsPerTeam;
    })

    while (unassignedAssassinCards !== 0) {
        let randomNumber = Math.floor(Math.random() * (cards.length - 1)); 
        if (cards[randomNumber].getAttribute('team') === null ) {
            cards[randomNumber].setAttribute('team', 'assassin');
            cards[randomNumber].classList.add('assassin')
            unassignedAssassinCards -= 1;
        }
    }
}

//Update Score

const checkScore = () => {
    const cards = document.querySelectorAll('.card');
    const teamA = document.getElementById('teamA');
    const teamB = document.getElementById('teamB');
    let unflippedA = [];
    let unflippedB = [];
    cards.forEach(card => {
        if (card.getAttribute('team') === `${teams[0]}`) {
            if (!card.classList.contains('flipped')) {
                unflippedA.push(card);
            }
        } else if (card.getAttribute('team') === `${teams[1]}`){
            if (!card.classList.contains('flipped')) {
                unflippedB.push(card);
            }
        }
        teamA.innerText = `${unflippedA.length} agents left`;
        teamB.innerText = `${unflippedB.length} agents left`;
    });

    //Check for win
    if ( unflippedA.length === 0 ) {
        alert('Team Blue Won 🎉');
    } else if ( unflippedB.length === 0 ) {
        alert('Team Red Won 🎉');
    }
}

document.getElementById('endTurn').addEventListener("click", function(){ 
    console.log(currentPlayer);
    const teamA = document.getElementById('teamA');
    const teamB = document.getElementById('teamB');
    currentPlayer == teams[0] ? currentPlayer = teams[1] : currentPlayer = teams[0];
    document.getElementById('currentPlayer').innerText = `${currentPlayer}`;
    if (currentPlayer == teams[0]) {
        teamA.classList.add('active-turn');
        teamB.classList.remove('active-turn');
    } else {
        teamB.classList.add('active-turn');
        teamA.classList.remove('active-turn');
    }
})

document.getElementById('showAnswers').addEventListener("click", function(){ 
    const board = document.getElementById('board');

    if (isAnswerVisible) {
        board.classList.remove("answersVisible");
        isAnswerVisible = false;
        this.innerText="Show Answers (captains only)";
        
    } else {
        board.classList.add("answersVisible");
        isAnswerVisible = true;
        this.innerText="Hide Answers (captains only)";
    }   
})

getRandomWords();
createBoard();
assignCards();
checkScore();
