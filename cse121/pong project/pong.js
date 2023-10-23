const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Paddle and ball variables
// Paddle variables
const paddleWidth = 10;
const paddleHeight = 100;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 6;

// Ball variables 
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;
const ballSize = 10;

function movePaddles() {
    window.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'ArrowUp':
          if (rightPaddleY > 0) {
            rightPaddleY -= paddleSpeed;
          }
          break;
        case 'ArrowDown':
          if (rightPaddleY + paddleHeight < canvas.height) {
            rightPaddleY += paddleSpeed;
          }
          break;
        case 'w':
          if (leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
          }
          break;
        case 's':
          if (leftPaddleY + paddleHeight < canvas.height) {
            leftPaddleY += paddleSpeed;
          }
          break;
      }
    });
  }
  
// Score variables
let playerScore = 0;
let computerScore = 0;
const winningScore = 5; // Define the score required to win the game

function drawScores() {
  context.fillStyle = '#fff';
  context.font = '20px Arial';
  context.fillText('Player: ' + playerScore, 50, 30);
  context.fillText('Computer: ' + computerScore, canvas.width - 170, 30);
}

function checkWin() {
  if (playerScore >= winningScore || computerScore >= winningScore) {
    const winner = playerScore > computerScore ? 'Player' : 'Computer';
    alert(winner + ' wins the game!');
    // Reset scores
    playerScore = 0;
    computerScore = 0;
  }
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (
    ballX < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    playerScore++;
  }
  if (
    ballX > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    computerScore++;
  }

  // Ball out of bounds
  if (ballX < 0 || ballX > canvas.width) {
    // Reset the ball
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }

  checkWin();
}

function draw() {
    // Clear the canvas
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = '#fff';
    context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    context.fillRect(
      canvas.width - paddleWidth,
      rightPaddleY,
      paddleWidth,
      paddleHeight
    );

    // Draw the ball
    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
  }

function gameLoop() {
  update();
  draw();
  drawScores();
  requestAnimationFrame(gameLoop);
}

function init() {
  // Call this function to initialize the game
  movePaddles();
  gameLoop();
}

// Call the init function when the page loads
window.onload = init;
