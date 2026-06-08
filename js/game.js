// Game state and logic manager
class Game {
  constructor() {
    this.state = GAME_STATE.MENU;
    this.leftPaddle = new Paddle(true);
    this.rightPaddle = new Paddle(false);
    this.ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    this.leftScore = 0;
    this.rightScore = 0;
    this.winner = null;

    this.keys = {};
  }

  // Handle keyboard input
  handleKeyDown(key) {
    this.keys[key.toLowerCase()] = true;

    if (key === ' ' && this.state === GAME_STATE.PLAYING) {
      this.state = GAME_STATE.PAUSED;
    } else if (key === ' ' && this.state === GAME_STATE.PAUSED) {
      this.state = GAME_STATE.PLAYING;
    } else if ((key === 'Enter' || key === ' ') && this.state === GAME_STATE.MENU) {
      this.startGame();
    } else if ((key === 'Enter' || key === ' ') && this.state === GAME_STATE.GAME_OVER) {
      this.reset();
    }
  }

  handleKeyUp(key) {
    this.keys[key.toLowerCase()] = false;
  }

  // Start game from menu
  startGame() {
    this.state = GAME_STATE.PLAYING;
    this.ball.reset();
    this.leftPaddle.reset();
    this.rightPaddle.reset();
  }

  // Reset game to initial state
  reset() {
    this.state = GAME_STATE.MENU;
    this.leftScore = 0;
    this.rightScore = 0;
    this.winner = null;
    this.ball.reset();
    this.leftPaddle.reset();
    this.rightPaddle.reset();
  }

  // Update game logic
  update() {
    if (this.state !== GAME_STATE.PLAYING) {
      return;
    }

    // Handle player input (left paddle)
    if (this.keys['w']) {
      this.leftPaddle.moveUp();
    } else if (this.keys['arrowup']) {
      this.leftPaddle.moveUp();
    } else if (this.keys['s']) {
      this.leftPaddle.moveDown();
    } else if (this.keys['arrowdown']) {
      this.leftPaddle.moveDown();
    } else {
      this.leftPaddle.stop();
    }

    // Update game objects
    this.leftPaddle.update();
    this.rightPaddle.update();
    this.ball.update();

    // AI movement for right paddle
    this.rightPaddle.moveToward(this.ball.y);

    // Check paddle collisions
    this.ball.collidePaddle(this.leftPaddle);
    this.ball.collidePaddle(this.rightPaddle);

    // Check for scoring
    if (this.ball.isOutOfBounds()) {
      const scorer = this.ball.getScoringPlayer();
      if (scorer === 'left') {
        this.leftScore++;
      } else if (scorer === 'right') {
        this.rightScore++;
      }

      // Check for win condition
      if (this.leftScore >= WINNING_SCORE || this.rightScore >= WINNING_SCORE) {
        this.state = GAME_STATE.GAME_OVER;
        this.winner = this.leftScore >= WINNING_SCORE ? 'left' : 'right';
      } else {
        this.ball.reset();
      }
    }
  }

  // Draw game on canvas
  draw(ctx) {
    // Draw background
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw center line
    ctx.strokeStyle = COLORS.foreground;
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    if (this.state === GAME_STATE.MENU) {
      this.drawMenu(ctx);
    } else if (this.state === GAME_STATE.PLAYING || this.state === GAME_STATE.PAUSED) {
      this.drawGame(ctx);
      if (this.state === GAME_STATE.PAUSED) {
        this.drawPaused(ctx);
      }
    } else if (this.state === GAME_STATE.GAME_OVER) {
      this.drawGame(ctx);
      this.drawGameOver(ctx);
    }
  }

  // Draw menu screen
  drawMenu(ctx) {
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PONG', CANVAS_WIDTH / 2, 100);

    ctx.font = '24px Arial';
    ctx.fillText('Player vs AI', CANVAS_WIDTH / 2, 160);

    ctx.font = '18px Arial';
    ctx.fillText('Press ENTER to start', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 100);
    ctx.fillText('Controls: W/S or UP/DOWN to move', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 50);
  }

  // Draw paused screen
  drawPaused(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    ctx.font = '18px Arial';
    ctx.fillText('Press SPACE to resume', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 60);
  }

  // Draw game-over screen
  drawGameOver(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';

    if (this.winner === 'left') {
      ctx.fillText('YOU WIN!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
    } else {
      ctx.fillText('AI WINS!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50);
    }

    ctx.font = '18px Arial';
    ctx.fillText('Press ENTER to play again', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
  }

  // Draw active game
  drawGame(ctx) {
    // Draw paddles and ball
    this.leftPaddle.draw(ctx);
    this.rightPaddle.draw(ctx);
    this.ball.draw(ctx);

    // Draw scores
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.leftScore, CANVAS_WIDTH / 4, 50);
    ctx.fillText(this.rightScore, (CANVAS_WIDTH * 3) / 4, 50);

    // Draw pause indicator
    ctx.font = '14px Arial';
    ctx.fillText('(SPACE to pause)', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 20);
  }
}
