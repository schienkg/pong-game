// Utility functions for collision detection and math

/**
 * AABB (Axis-Aligned Bounding Box) collision detection
 * @param {Object} rect1 - First rectangle with x, y, width, height
 * @param {Object} rect2 - Second rectangle with x, y, width, height
 * @returns {boolean} True if rectangles overlap
 */
function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate ball angle based on where it hits the paddle
 * @param {number} ballCenterY - Y position of ball center
 * @param {number} paddleTop - Top Y position of paddle
 * @param {number} paddleHeight - Height of paddle
 * @returns {number} Angle in radians
 */
function calculateReflectionAngle(ballCenterY, paddleTop, paddleHeight) {
  const paddleCenter = paddleTop + paddleHeight / 2;
  const hitPos = (ballCenterY - paddleCenter) / (paddleHeight / 2);
  // Angle ranges from -60 degrees to 60 degrees
  return (hitPos * Math.PI / 3);
}

/**
 * Get random ball direction on serve
 * @returns {Object} Object with x and y velocity components
 */
function getRandomBallDirection() {
  // Random angle between -45 and 45 degrees, with positive x direction
  const angle = (Math.random() - 0.5) * Math.PI / 2;
  const speed = BALL_INITIAL_SPEED;
  return {
    x: Math.cos(angle) * speed,
    y: Math.sin(angle) * speed
  };
}
