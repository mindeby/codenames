// Assign words
const words = ['atlantis', 'noite', 'roma', 'lago', 'redondo', 'hotel', 'sitio', 'coroa', 'caixa', 'calças', 'comboio', 'piramide', 'telescopio', 'veneno', 'soldado', 'bruxa', 'chao', 'cenoura', 'advogado', 'danca', 'ninja', 'botao', 'cauda', 'aranha', 'pau', 'penguim', 'traseira', 'america', 'agua', 'papel', 'menta', 'missil', 'embaixada', 'pistola', 'cientista', 'kiwi', 'correio', 'genio', 'ladrao', 'lesma', 'estado', 'cama', 'espiao', 'narrativa', 'inglaterra', 'templo', 'maça', 'oleo', 'cozinheiro','voar', 'urso', 'pin', 'cheque', 'bar', 'frio', 'hollywood', 'ecra', 'jogar', 'dinossauro', 'gato', 'jogo', 'vida', 'sorte', 'gancho', 'cobre', 'alma', 'canada', 'concerto', 'chocolate', 'jet', 'shakespeare', 'carro', 'sombra', 'luva', 'milionario', 'bomba', 'casino', 'arranha-ceus', 'acçoes','escova', 'relva', 'saturno', 'vestido', 'ventoinha', 'anao', 'alien', 'chicote', 'antartica', 'abobora', 'moscovo', 'viagem', 'floresta', 'capital', 'foca', 'lua', 'bloco', 'peixe', 'tubo', 'ferro', 'doutor', 'roleta', 'nivel', 'acordar', 'agulha', 'linha', 'guerra', 'mel', 'compota', 'banco', 'mesa', 'espinha', 'veterinario', 'capa', 'raio', 'belt', 'coelho', 'agente', 'baleia', 'presunto', 'bateria', 'penhasco', 'faixa', 'igreja', 'tablet', 'tarte', 'verde', 'dragao', 'nova-iorque', 'australia', 'março', 'gota', 'baralho', 'quintal', 'estrela', 'ponte', 'fogo', 'anel', 'tampa', 'limao', 'enfermeira', 'vento', 'leao', 'londres', 'outono', 'bota', 'dados', 'olho', 'tabuleiro', 'interruptor', 'bermuda', 'mudança', 'tokyo', 'egipto', 'batimento', 'coraçao', 'corno', 'primavera', 'ar', 'jupiter', 'tempo', 'ouro', 'carregar', 'alpes', 'clube', 'figura', 'cao', 'mergulhador', 'lochness', 'cano', 'prego', 'torneira', 'garfo', 'sapato', 'massa', 'porto', 'baloiço', 'gelo', 'servidor', 'china','berlim', 'meia', 'cavalo', 'quadrado', 'centro'];

const numberOfCards = 25;

let randomWords = [];

const getRandomWords = () => {
    while (randomWords.length < numberOfCards) {
        let number = Math.floor(Math.random() * (words.length - 1) ); 
        if (!randomWords.includes(words[number])) {
            randomWords.push(words[number]);
        }
    }
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
        alert(`${currentPlayer} LOST`);
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
                // cards[randomNumber].style.color = `${team}`, 
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
            // cards[randomNumber].style.color = 'purple', 
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
        alert('TEAM A WON');
    } else if ( unflippedB.length === 0 ) {
        alert('TEAM B WON');
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


getRandomWords();
createBoard();
assignCards();
checkScore();
