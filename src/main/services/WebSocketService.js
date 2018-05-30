class WebSocketService {
  constructor() {
    this.isConnected = false;

    this.ws = new WebSocket('ws://backend-accord-02-2018.herokuapp.com/mgame');
    this.ws.onopen = (event) => {
      this.isConnected = true;
      console.log('connection opened', event, 'isConnected: ', this.isConnected);
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
      this.isConnected = false;
    };

    this.ws.onerror = (error) => {
      console.log('error: ', error);
    };

    setInterval(() => {
      if (this.isConnected) {
        this.sendMsg(json);
      }
    }, 100);

    const json = {
      'velocity': 22.0,
      'angle': 0.0,
      'position': {
        'x': 0.99,
        'y': 1.0
      },
      'isShoot': false
    };
  }

  sendMsg(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  close() {
    this.ws.close();
  }
}

export default WebSocketService;
