const cube = document.querySelector('.cube');
const time = 3;
let currentPlayer = 1; // Empieza el Jugador 1

// Variables para guardar el resultado y suma de cada jugador
let currentRollP1 = 0, totalSumP1 = 0, posP1 = 0;
let currentRollP2 = 0, totalSumP2 = 0, posP2 = 0;

const currentRollP1Element = document.getElementById('currentRollP1');
const totalSumP1Element = document.getElementById('totalSumP1');
const currentRollP2Element = document.getElementById('currentRollP2');
const totalSumP2Element = document.getElementById('totalSumP2');

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
            casilla.textContent = tableroArray[i * columnas + j ];
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
            currentRollP1 = randomValue;
            totalSumP1 += randomValue;
            currentRollP1Element.textContent = currentRollP1;
            totalSumP1Element.textContent = totalSumP1;
            movePlayer(1, randomValue);
        } else {
            currentRollP2 = randomValue;
            totalSumP2 += randomValue;
            currentRollP2Element.textContent = currentRollP2;
            totalSumP2Element.textContent = totalSumP2;
            movePlayer(2, randomValue);
        }

        console.log(`Jugador ${currentPlayer}: Resultado del dado: ${randomValue}`);
        console.log(`Jugador ${currentPlayer}: Suma acumulada: ${currentPlayer === 1 ? totalSumP1 : totalSumP2}`);
        
        //changeBackgroundColor(); // Cambia el color de fondo en cada turno

        // Cambia la rotación del cubo según el resultado
        switch(randomValue) {
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
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }, time * 100);
});

// Definir la secuencia en espiral
const spiralSequence = [
    0, 1, 2, 3, 4, 5, 11, 17, 23, 29, 35, 34, 33, 32, 31, 30, 24, 18, 12, 6, 7, 8, 9, 10, 16, 22, 28, 27, 26, 25, 19, 13, 14, 15, 21, 20
];

// Mover la ficha de un jugador en el tablero
function movePlayer(player, steps) {
    let currentPos, token;
    if (player === 1) {
        currentPos = posP1;
        token = player1Token;
        posP1 = Math.min(currentPos + steps, 35); // Limitar al final del tablero
    } else {
        currentPos = posP2;
        token = player2Token;
        posP2 = Math.min(currentPos + steps, 35);
    }

    // Obtener la nueva posición en la secuencia en espiral
    const newSpiralPos = spiralSequence[player === 1 ? posP1 : posP2];

    const currentCell = document.getElementById(`casilla-${spiralSequence[currentPos]}`);
    // Esperamos 4.3 segundos antes de mover la ficha
    setTimeout(() => {
        const newCell = document.getElementById(`casilla-${newSpiralPos}`);
        currentCell.removeChild(token); // Eliminamos el token de la posición actual
        newCell.appendChild(token); // Colocamos el token en la nueva posición
    }, 3500); // 4.3 segundos de espera antes de mover
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
