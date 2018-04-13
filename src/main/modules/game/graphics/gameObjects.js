const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight - 120;

export const gameObjects = {
  CANVAS: {
    height: canvasHeight,
    width: canvasWidth,
    color: '',
  },

  HOMER: {
    height: canvasHeight * 0.27,
    width: canvasWidth * 0.12,

    color: '#FFD633',

    x: canvasWidth * 0.2,
    y: canvasHeight * 0.7,
  },

  DONUT: {
    radius: canvasHeight * 0.05,
    color: '#FF4DA6',
    count: 10,

    x: canvasWidth * 0.45,
    y: canvasHeight * 0.09,

    v: 50,
    vX: 40,
  },

  TEXT: {
    size: canvasHeight * 0.03,
    x: canvasWidth * 0.92,
    y: canvasHeight * 0.05,
    dy: canvasHeight * 0.04,

    centerSize: canvasHeight * 0.05,
    centerX: canvasWidth * 0.5,
    centerY: canvasHeight * 0.4,

    startText: 'Move mouse to get flight path.\n' +
    'Use <  > buttons to move Donut.\n' +
    'Click left mouse button to run Donut.\n' +
    'Press SPACE to start the game.'
  }
};