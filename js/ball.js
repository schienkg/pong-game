// Ball class for Pong game
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = BALL_SIZE;
    
    const direction = getRandomBallDirection();
    this.vx = direction.x;
    this.vy = direction.y;
  }

  // Update ball position
  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off top and bottom walls
    if (this.y - this.size / 2 <= 0) {
      this.y = this.size / 2;
      this.vy = -this.vy;
    } else if (this.y + this.size / 2 >= CANVAS_HEIGHT) {
      this.y = CANVAS_HEIGHT - this.size / 2;
      this.vy = -this.vy;
    }
  }

  // Draw ball on canvas
  draw(ctx) {
    ctx.fillStyle = COLORS.ball;
    ctx.fillRect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
  }

  // Get bounding box for collision detection
  getBounds() {
    return {
      x: this.x - this.size / 2,
      y: this.y - this.size / 2,
      width: this.size,
      height: this.size
    };
  }

  // Reset ball to center with random direction
  reset() {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    const direction = getRandomBallDirection();
    this.vx = direction.x;
    this.vy = direction.y;
  }

  // Handle collision with paddle
  collidePaddle(paddle) {
    const ballBounds = this.getBounds();
    const paddleBounds = paddle.getBounds();

    if (checkCollision(ballBounds, paddleBounds)) {
      // Only bounce if ball is moving toward the paddle
      if ((paddle.isLeft && this.vx < 0) || (!paddle.isLeft && this.vx > 0)) {
        // Reflect ball
        this.vx = -this.vx;

        // Calculate new angle based on where ball hit paddle
        const angle = calculateReflectionAngle(
          this.y,
          paddleBounds.y,
          paddleBounds.height
        );

        const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
        this.vx = Math.abs(this.vx); // Ensure moving away from paddle
        if (!paddle.isLeft) this.vx = -this.vx; // Flip if right paddle
        this.vy = Math.tan(angle) * Math.abs(this.vx);

        // Increase speed slightly (up to max)
        const newSpeed = Math.min(
          Math.sqrt(this.vx ** 2 + this.vy ** 2) * 1.02,
          MAX_BALL_SPEED
        );
        const currentSpeed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
        if (currentSpeed > 0) {
          this.vx = (this.vx / currentSpeed) * newSpeed;
          this.vy = (this.vy / currentSpeed) * newSpeed;
        }

        // Push ball away from paddle to prevent sticking
        if (paddle.isLeft) {
          this.x = paddleBounds.x + paddleBounds.width + this.size / 2;
        } else {
          this.x = paddleBounds.x - this.size / 2;
        }
      }
      return true;
    }
    return false;
  }

  // Check if ball is out of bounds (scored)
  isOutOfBounds() {
    return this.x < 0 || this.x > CANVAS_WIDTH;
  }

  // Get which side went out of bounds
  getScoringPlayer() {
    if (this.x < 0) return 'right'; // Left side out = right player scores
    if (this.x > CANVAS_WIDTH) return 'left'; // Right side out = left player scores
    return null;
  }
}
