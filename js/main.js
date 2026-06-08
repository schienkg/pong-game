// Main game loop and entry point
let canvas;
let ctx;
let game;
let lastFrameTime = 0;
const FPS = 60;
const FRAME_TIME = 1000 / FPS;

// Initialize game
function init() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  game = new Game();

  // Set up event listeners
  document.addEventListener('keydown', (e) => {
    game.handleKeyDown(e.key);
  });

  document.addEventListener('keyup', (e) => {
    game.handleKeyUp(e.key);
  });

  // Start game loop
  requestAnimationFrame(gameLoop);
}

// Main game loop
function gameLoop(currentTime) {
  // Calculate delta time
  const deltaTime = currentTime - lastFrameTime;

  if (deltaTime >= FRAME_TIME) {
    // Update game state
    game.update();

    // Draw game
    game.draw(ctx);

    // Update frame time
    lastFrameTime = currentTime;
  }

  // Continue loop
  requestAnimationFrame(gameLoop);
}

// Start game when page loads
window.addEventListener('load', init);
