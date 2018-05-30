import GameEngine from './engine.js';
// const WebSocket = require('ws');

export default class MultiPlayer extends GameEngine {
  constructor(scene, controller) {
    super(scene, controller);
  }

  start() {
    super.start();
    console.log('start');
    this.ws = new WebSocket('ws://backend-accord-02-2018.herokuapp.com:5000/mgame');

    this.ws.onopen = (event) => {
      console.log('connection opened', event);
    };

    this.ws.onmessage = (event) => {
      console.log('message: ', event);
    };
    this.ws.onclose = (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };

    const json = {
      'velocity': 22.0,
      'angle': 0.0,
      'position': {
        'x': 0.99,
        'y': 1.0
      },
      'isShoot': false
    };

    // this.ws.send(JSON.stringify(json));
  }

  destroy() {
    super.destroy();
    this.ws.close();
  }
}
