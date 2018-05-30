const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight - 120;

export const gameObjects = {
  CANVAS: {
    height: canvasHeight,
    width: canvasWidth,
    color: '',
  },

  HOMER: {
    height: 208,
    width: 180,

    color: '#FFD633',

    x: canvasWidth * 0.5 - 90,
    y: canvasHeight * 0.5,
  },

  DONUT: {
    radius: canvasHeight * 0.05,
    color: '#FF4DA6',
    count: 100,

    xLeft: 30,
    xRight: canvasWidth - canvasHeight * 0.1 - 30,
    y: canvasHeight * 0.45,

    v: 50,
    vX: 40,
    dYMove: 50,
  },

  TEXT: {
    size: canvasHeight * 0.03,
    x: canvasWidth * 0.5,
    y: 20,
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
