const cube = document.querySelector('.cube');
const time = 3;
let currentPlayer = 1; // Empieza el Jugador 1

// Variables para guardar el resultado y suma de cada jugador
let scoreP1 = 0, posP1 = 0;
let scoreP2 = 0, posP2 = 0;

const questions = [
    { question: "What is the past tense of 'go'?", options: ["goed", "went", "gone"], answer: 1 },
    { question: "Choose the correct preposition: 'I am interested ___ music.'", options: ["on", "in", "at"], answer: 1 },
    { question: "Which one is a synonym of 'happy'?", options: ["sad", "angry", "joyful"], answer: 2 },
    { question: "What is the opposite of 'hot'?", options: ["warm", "cold", "cool"], answer: 1 },
    { question: "What is the plural of 'child'?", options: ["childs", "children", "childes"], answer: 1 },
    { question: "Choose the correct form: 'He ___ to the store yesterday.'", options: ["goes", "gone", "went"], answer: 2 },
    { question: "Which word is spelled correctly?", options: ["definately", "definitely", "definatly"], answer: 1 },
    { question: "Complete the sentence: 'I have ___ books.'", options: ["any", "some", "none"], answer: 1 },
    { question: "Choose the correct verb: 'They ___ dinner when I arrived.'", options: ["were having", "had", "has"], answer: 0 },
    { question: "Which sentence is in the future tense?", options: ["I will study tomorrow", "I studied yesterday", "I am studying now"], answer: 0 },
    { question: "What is the correct order: 'She ___ breakfast every morning.'", options: ["has", "is having", "have"], answer: 0 },
    { question: "Which is the comparative form of 'big'?", options: ["biger", "biggest", "bigger"], answer: 2 },
    { question: "Choose the correct article: 'She is ___ doctor.'", options: ["a", "the", "an"], answer: 2 },
    { question: "Which sentence is correct?", options: ["She don't like pizza.", "She doesn't like pizza.", "She isn't like pizza."], answer: 1 },
    { question: "What is the past participle of 'eat'?", options: ["eated", "eats", "eaten"], answer: 2 },
    { question: "Which one is a countable noun?", options: ["water", "book", "sugar"], answer: 1 },
    { question: "Complete the sentence: 'I have lived here ___ 5 years.'", options: ["since", "for", "at"], answer: 1 },
    { question: "What is the superlative form of 'good'?", options: ["better", "best", "goodest"], answer: 1 },
    { question: "Choose the correct form: 'She ___ finished her homework yet.'", options: ["hasn't", "haven't", "didn't"], answer: 0 },
    { question: "What is the correct form: 'They ___ going to the park now.'", options: ["is", "are", "was"], answer: 1 },
    { question: "Which word is a noun?", options: ["run", "quick", "teacher"], answer: 2 },
    { question: "Choose the correct sentence:", options: ["He like to play soccer.", "He likes to play soccer.", "He liking to play soccer."], answer: 1 },
    { question: "What is the past tense of 'buy'?", options: ["buys", "buyed", "bought"], answer: 2 },
    { question: "Which is the correct preposition: 'The book is ___ the table.'", options: ["on", "in", "at"], answer: 0 },
    { question: "Which one is an adjective?", options: ["quickly", "quick", "quicker"], answer: 1 },
    { question: "What is the opposite of 'noisy'?", options: ["loud", "silent", "quiet"], answer: 2 },
    { question: "Choose the correct form: 'She ___ watching TV when I called.'", options: ["were", "was", "is"], answer: 1 },
    { question: "What is the plural of 'mouse'?", options: ["mouses", "mice", "mices"], answer: 1 },
    { question: "Which word is a verb?", options: ["play", "playful", "played"], answer: 0 },
    { question: "Complete the sentence: 'It is ___ than I thought.'", options: ["bad", "worse", "worst"], answer: 1 },
    { question: "Which one is a pronoun?", options: ["he", "book", "quick"], answer: 0 },
    { question: "What is the correct order: 'They ___ dinner by 8 PM.'", options: ["will finish", "will have finished", "finish"], answer: 1 },
    { question: "Which sentence is correct?", options: ["She can sings.", "She can sing.", "She can to sing."], answer: 1 },
    { question: "Which word is an adverb?", options: ["happy", "happily", "happiness"], answer: 1 },
    { question: "Choose the correct preposition: 'We arrived ___ the airport early.'", options: ["to", "in", "at"], answer: 2 },
    { question: "Which sentence is in the present continuous tense?", options: ["He plays football.", "He is playing football.", "He played football."], answer: 1 },
    { question: "What is the past tense of 'teach'?", options: ["teached", "taught", "teach"], answer: 1 },
    { question: "Choose the correct option: '___ you like coffee?'", options: ["Do", "Does", "Are"], answer: 0 },
    { question: "What is the opposite of 'difficult'?", options: ["easy", "hard", "soft"], answer: 0 },
    { question: "Which one is an uncountable noun?", options: ["milk", "apples", "chairs"], answer: 0 }
];

const scoreP1Element = document.getElementById('scoreP1');
const scoreP2Element = document.getElementById('scoreP2');

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');

const tableroArray = [];
let player1Token, player2Token;

document.addEventListener('DOMContentLoaded', () => {
    const tablero = document.getElementById('tablero');
    const filas = 6, columnas = 6;

    let valor = 0; // p/ los numeros que se escriben en las casillas
    let inicioFila = 0, finFila = filas - 1, inicioColumna = 0, finColumna = columnas - 1;

    // Generar tablero en espiral
    while (inicioFila <= finFila && inicioColumna <= finColumna) {
        for (let i = inicioColumna; i <= finColumna; i++) tableroArray[inicioFila * columnas + i] = valor++;
        inicioFila++;
        for (let i = inicioFila; i <= finFila; i++) tableroArray[i * columnas + finColumna] = valor++;
        finColumna--;
        for (let i = finColumna; i >= inicioColumna; i--) tableroArray[finFila * columnas + i] = valor++;
        finFila--;
        for (let i = finFila; i >= inicioFila; i--) tableroArray[i * columnas + inicioColumna] = valor++;
        inicioColumna++;
    }

    // Crear las casillas del tablero
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const casilla = document.createElement('div');
            casilla.classList.add('casilla');
            casilla.textContent = tableroArray[i * columnas + j];
            casilla.id = `casilla-${i * columnas + j}`;
            tablero.appendChild(casilla);
            if (i === 0 && j === 0) {
                casilla.classList.add('inicio'); // amarillo
                casilla.textContent = "Start";
            } else if (i === 3 && j === 2) {
                casilla.classList.add('final'); // rojo
                casilla.textContent = "End";
            } else if (i == 0 || i == 5 || j == 0 || j == 5) { // NIVEL 1
                casilla.classList.add('nivel1'); // 
            } else if (i == 1 || i == 4 || j == 1 || j == 4) { // NIVEL 2
                casilla.classList.add('nivel2'); // 
            } else if (i == 2 || i == 3 || j == 2 || j == 4) { // NIVEL 3
                casilla.classList.add('nivel3'); // 
            }
        }
    }

    // Añadir fichas de jugadores
    player1Token = document.createElement('div');
    player1Token.classList.add('token', 'player1');
    document.getElementById('casilla-0').appendChild(player1Token);

    player2Token = document.createElement('div');
    player2Token.classList.add('token', 'player2');
    document.getElementById('casilla-0').appendChild(player2Token);
});

cube.addEventListener('click', () => {
    cube.style.transition = '';
    cube.style.transform = `translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;

    setTimeout(() => {
        highlightCurrentPlayer();
        cube.style.transition = `transform ${time}s`;
        const randomValue = Math.floor((Math.random() * 6) + 1);
        // Actualizar estado del jugador
        if (currentPlayer === 1) {
            movePlayer(1, randomValue);
        } else {
            movePlayer(2, randomValue);
        }

        // Cambia la rotación del cubo según el resultado
        switch (randomValue) {
            case 1:
                cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 2:
                cube.style.transform = `translateY(400px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 3:
                cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                break;
            case 4:
                cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                break;
            case 5:
                cube.style.transform = `translateY(400px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 6:
                cube.style.transform = `translateY(400px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                break;
        }
        // currentPlayer = currentPlayer === 1 ? 2 : 1;

    }, time * 100);
});

// Definir la secuencia en espiral
const spiralSequence = [
    0, 1, 2, 3, 4, 5, 11, 17, 23, 29, 35, 34, 33, 32, 31, 30, 24, 18, 12, 6, 7, 8, 9, 10, 16, 22, 28, 27, 26, 25, 19, 13, 14, 15, 21, 20
];

function movePlayer(playerNameElement, randomValue) {
    let currentPos, token, scoreElement;
    if (currentPlayer === 1) {
        currentPos = posP1;
        token = player1Token;
        posP1 = Math.min(currentPos + randomValue, 35);
        playerNameElement = player1Name;
        scoreElement = scoreP1Element;
    } else {
        currentPos = posP2;
        token = player2Token;
        posP2 = Math.min(currentPos + randomValue, 35);
        playerNameElement = player2Name;
        scoreElement = scoreP2Element;
    }
    const newSpiralPos = spiralSequence[currentPlayer === 1 ? posP1 : posP2];
    const currentCell = document.getElementById(`casilla-${spiralSequence[currentPos]}`);
    setTimeout(() => {
        const newCell = document.getElementById(`casilla-${newSpiralPos}`);
        currentCell.removeChild(token);
        newCell.appendChild(token);
        setTimeout(() => {
            askQuestion(playerNameElement, scoreElement);
            checkWinner();
        }, 500);
    }, 3500);
}

function askQuestion() {
    const questionIndex = Math.floor(Math.random() * questions.length);
    const question = questions[questionIndex];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index, question.answer));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        if (currentPlayer === 1) {
            scoreP1++;
            scoreP1Element.textContent = scoreP1;
        } else {
            scoreP2++;
            scoreP2Element.textContent = scoreP2;
        }
    }
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    questionElement.textContent = ''; // Limpiar pregunta después de la respuesta
    optionsElement.innerHTML = ''; // Limpiar opciones después de la respuesta
    highlightCurrentPlayer();
}

function highlightCurrentPlayer() {
    if (currentPlayer === 1) {
        player1Name.classList.add('active-turn1');
        player2Name.classList.remove('active-turn2');
    } else {
        player1Name.classList.remove('active-turn1');
        player2Name.classList.add('active-turn2');
    }
}

function checkWinner() {
    if (posP1 === 35 || posP2 === 35) {
        let winner, secondPlace, winnerScore, secondScore;
        if (scoreP1 === scoreP2) {
            alert(`It is a draw. Decide with rock, paper or scissors`);
        } else if (scoreP1 > scoreP2) {
            winner = 'Player 1';
            winnerScore = scoreP1;
            secondPlace = 'Player 2';
            secondScore = scoreP2;
            alert(`${winner}, you win :D\nYou made ${winnerScore} points, nice job and stay that serious.\n${secondPlace}, you lose :p\nYou just made ${secondScore} point(s)... active your serious mode now.\n`);
        } else if (scoreP1 < scoreP2) {
            winner = 'Player 2';
            winnerScore = scoreP2;
            secondPlace = 'Player 1';
            secondScore = scoreP1;
            alert(`${winner}, you win :D\nYou made ${winnerScore} points, nice job and stay that serious.\n${secondPlace}, you lose :p\nYou just made ${secondScore} point(s)... active your serious mode now.\n`);
        }
        resetGame();
    }
}

function resetGame() {
    posP1 = 0;
    posP2 = 0;
    scoreP1 = 0;
    scoreP2 = 0;
    scoreP1Element.textContent = 0;
    scoreP2Element.textContent = 0;
    document.getElementById('casilla-0').appendChild(player1Token);
    document.getElementById('casilla-0').appendChild(player2Token);
    currentPlayer = 1;
    highlightCurrentPlayer();
}