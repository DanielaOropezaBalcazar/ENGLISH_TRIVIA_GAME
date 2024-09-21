const cube = document.querySelector('.cube');
const time = 3;
let isColor = true;
let currentPlayer = 1; // Empezamos con el Jugador 1

// Variables para guardar el resultado y suma de cada jugador
let currentRollP1 = 0;
let totalSumP1 = 0;
let currentRollP2 = 0;
let totalSumP2 = 0;

// Elementos de la página donde se mostrarán los resultados de cada jugador
const currentRollP1Element = document.getElementById('currentRollP1');
const totalSumP1Element = document.getElementById('totalSumP1');
const currentRollP2Element = document.getElementById('currentRollP2');
const totalSumP2Element = document.getElementById('totalSumP2');

// Resaltar al jugador activo al iniciar
highlightCurrentPlayer();

cube.addEventListener('click', () => {
    cube.style.transition = '';
    cube.style.transform = `translateY(400px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    
    setTimeout(() => {
        cube.style.transition = `transform ${time}s`;
        const randomValue = Math.floor((Math.random() * 6) + 1);

        // Dependiendo del turno, actualizamos el jugador actual
        if (currentPlayer === 1) {
            currentRollP1 = randomValue;
            totalSumP1 += randomValue;

            // Actualizamos el contenido en la pantalla para el Jugador 1
            currentRollP1Element.textContent = currentRollP1;
            totalSumP1Element.textContent = totalSumP1;

        } else {
            currentRollP2 = randomValue;
            totalSumP2 += randomValue;

            // Actualizamos el contenido en la pantalla para el Jugador 2
            currentRollP2Element.textContent = currentRollP2;
            totalSumP2Element.textContent = totalSumP2;
        }

        console.log(`Jugador ${currentPlayer}: Resultado del dado: ${randomValue}`);
        console.log(`Jugador ${currentPlayer}: Suma acumulada: ${currentPlayer === 1 ? totalSumP1 : totalSumP2}`);

        changeBackgroundColor();

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
        highlightCurrentPlayer();
        // Cambiar de turno
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        // resaltar el jugador activo


    }, time * 10);
});

// Función para cambiar el color de fondo al tirar el dado
function changeBackgroundColor() {
    if (isColor) {
        document.body.style.backgroundColor = '#E60046'; // verde
    } else {
        document.body.style.backgroundColor = '#A600E6'; // azul
    }
    isColor = !isColor;
}

// Función para resaltar el nombre del jugador actual
function highlightCurrentPlayer() {
    if (currentPlayer === 1) {
        player1Name.classList.add('active-turn');
        player2Name.classList.remove('active-turn');
    } else {
        player1Name.classList.remove('active-turn');
        player2Name.classList.add('active-turn');
    }
}
