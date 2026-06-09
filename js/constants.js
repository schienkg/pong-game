// Game constants and configuration
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

// Paddle properties
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 10;
const PADDLE_MARGIN = 20; // Distance from edge

// Ball properties
const BALL_SIZE = 10;
const BALL_INITIAL_SPEED = 6;
const MAX_BALL_SPEED = 15;

// Game states
const GAME_STATE = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver'
};

// Colors
const COLORS = {
  background: '#000000',
  foreground: '#ffffff',
  paddle: '#ffffff',
  ball: '#6f00ff',
  text: '#ffffff'
};

// Win condition
const WINNING_SCORE = 5;

// AI properties
const AI_SPEED = 8; // Slightly slower than max ball speed
const AI_REACTION_TIME = 0; // Frames of delay before reacting (0 = instant)
