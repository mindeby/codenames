// Assign words
const words = ['atlantis', 'noite', 'roma', 'lago', 'redondo', 'hotel', 'sitio', 'coroa', 'caixa', 'calças', 'comboio', 'piramide', 'telescopio', 'veneno', 'soldado', 'bruxa', 'chao', 'cenoura', 'advogado', 'danca', 'ninja', 'botao', 'cauda', 'aranha', 'pau', 'penguim', 'traseira', 'america', 'agua', 'papel', 'menta', 'missil', 'embaixada', 'pistola', 'cientista', 'kiwi', 'correio', 'genio', 'ladrao', 'lesma', 'estado', 'cama', 'espiao', 'narrativa', 'inglaterra', 'templo', 'maça', 'oleo', 'cozinheiro','voar', 'urso', 'pin', 'cheque', 'bar', 'frio', 'hollywood', 'ecra', 'jogar', 'dinossauro', 'gato', 'jogo', 'vida', 'sorte', 'gancho', 'cobre', 'alma', 'canada', 'concerto', 'chocolate', 'jet', 'shakespeare', 'carro', 'sombra', 'luva', 'milionario', 'bomba', 'casino', 'arranha-ceus', 'acçoes','escova', 'relva', 'saturno', 'vestido', 'ventoinha', 'anao', 'alien', 'chicote', 'antartica', 'abobora', 'moscovo', 'viagem', 'floresta', 'capital', 'foca', 'lua', 'bloco', 'peixe', 'tubo', 'ferro', 'doutor', 'roleta', 'nivel', 'acordar', 'agulha', 'linha', 'guerra', 'mel', 'compota', 'banco', 'mesa', 'espinha', 'veterinario', 'capa', 'raio', 'belt', 'coelho', 'agente', 'baleia', 'presunto', 'bateria', 'penhasco', 'faixa', 'igreja', 'tablet', 'tarte', 'verde', 'dragao', 'nova-iorque', 'australia', 'março', 'gota', 'baralho', 'quintal', 'estrela', 'ponte', 'fogo', 'anel', 'tampa', 'limao', 'enfermeira', 'vento', 'leao', 'londres', 'outono', 'bota', 'dados', 'olho', 'tabuleiro', 'interruptor', 'bermuda', 'mudança', 'tokyo', 'egipto', 'batimento', 'coraçao', 'corno', 'primavera', 'ar', 'jupiter', 'tempo', 'ouro', 'carregar', 'alpes', 'clube', 'figura', 'cao', 'mergulhador', 'lochness', 'cano', 'prego', 'torneira', 'garfo', 'sapato', 'massa', 'porto', 'baloiço', 'gelo', 'servidor', 'china','berlim', 'meia', 'cavalo', 'quadrado', 'centro'];

const numberOfCards = 25;

let randomWords = [];

const getRandomWords = () => {
    while (randomWords.length < numberOfCards) {
        let number = Math.floor(Math.random() * (words.length + 1) ); 
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

// Assign teams and assassins

const teams = ['blue', 'red'];
const cardsPerTeam = 9; 
const assassinCards = 1; 

const assignCards = () => {
    const cards = document.querySelectorAll('.card');
    let unassignedTeamCards = cardsPerTeam; 
    let unassignedAssassinCards = assassinCards; 
    teams.forEach(team => {
        while (unassignedTeamCards !== 0) {
            let randomNumber = Math.floor(Math.random() * (cards.length - 1)); 
            if (cards[randomNumber].getAttribute('team') === null ) {
                cards[randomNumber].setAttribute('team', `${team}`)
                cards[randomNumber].style.color = `${team}`, 
                unassignedTeamCards -= 1;
            }
        }
        unassignedTeamCards = cardsPerTeam;
    })
    while (unassignedAssassinCards !== 0) {
        let randomNumber = Math.floor(Math.random() * (cards.length - 1)); 
        if (cards[randomNumber].getAttribute('team') === null ) {
            cards[randomNumber].setAttribute('team', 'assassin');
            cards[randomNumber].style.color = 'purple', 
            unassignedAssassinCards -= 1;
        }
    }


}


getRandomWords();
createBoard();
assignCards();