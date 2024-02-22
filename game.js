const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Settings
canvas.width = 400;
canvas.height = 600;

// Player Ship
let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
const playerWidth = 20;
const playerHeight = 20;

// Player Movement
let rightPressed = false;
let leftPressed = false;
const playerSpeed = 5;

// Enemies

const enemyRows = 3;
const enemyColumns = 8;
let enemies = [];
let enemySpeed = 1;
const enemyWidth = 30;
const enemyHeight = 20;
const enemyGap = 10;

// Draw the Enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = 'red'; // Temporary color
        ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
    });
}

// Initialize Enemies
function createEnemies() {
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyColumns; col++) {
            const enemyX = (col * (enemyWidth + enemyGap)) + 50;
            const enemyY = (row * (enemyHeight + enemyGap)) + 30;
            enemies.push({ x: enemyX, y: enemyY }); 
        }
    }
}


// Game Loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    if (rightPressed) playerX += playerSpeed;
    if (leftPressed) playerX -= playerSpeed;

    // Keep player within bounds 
    playerX = Math.max(0, Math.min(playerX, canvas.width - playerWidth));
}

// Draw on the canvas
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen
    drawPlayer();
    drawEnemies();
}

// Draw the Ship
function drawPlayer() {
    ctx.fillStyle = 'white';
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}


// ... (update function)


// Event Listeners for Player Controls
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// Start up
createEnemies(); 
gameLoop();
