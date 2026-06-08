// Paddle class for Pong game
class Paddle {
  constructor(isLeft) {
    this.isLeft = isLeft;
    this.width = PADDLE_WIDTH;
    this.height = PADDLE_HEIGHT;

    if (isLeft) {
      this.x = PADDLE_MARGIN;
    } else {
      this.x = CANVAS_WIDTH - PADDLE_MARGIN - PADDLE_WIDTH;
    }

    this.y = (CANVAS_HEIGHT - this.height) / 2;
    this.vy = 0; // Vertical velocity
  }

  // Update paddle position
  update() {
    this.y += this.vy;

    // Keep paddle in bounds
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > CANVAS_HEIGHT) {
      this.y = CANVAS_HEIGHT - this.height;
    }
  }

  // Draw paddle on canvas
  draw(ctx) {
    ctx.fillStyle = COLORS.paddle;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // Get bounding box for collision detection
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  // Move paddle up
  moveUp() {
    this.vy = -PADDLE_SPEED;
  }

  // Move paddle down
  moveDown() {
    this.vy = PADDLE_SPEED;
  }

  // Stop paddle movement
  stop() {
    this.vy = 0;
  }

  // AI movement toward target Y position
  moveToward(targetY) {
    const paddleCenter = this.y + this.height / 2;

    if (paddleCenter < targetY - 5) {
      // Move down if paddle center is above target
      this.vy = AI_SPEED;
    } else if (paddleCenter > targetY + 5) {
      // Move up if paddle center is below target
      this.vy = -AI_SPEED;
    } else {
      // Stop if close to target
      this.vy = 0;
    }
  }

  // Reset paddle to center
  reset() {
    this.y = (CANVAS_HEIGHT - this.height) / 2;
    this.vy = 0;
  }
}
