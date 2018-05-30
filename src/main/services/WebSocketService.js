class WebSocketService {
  constructor() {
    this.isConnected = false;

    var webSocket = new WebSocket("ws://backend-accord-02-2018.herokuapp.com/mgame");
    let isConnected = false;

    function sendMsg(msgToSend) {
      webSocket.send(JSON.stringify(msgToSend));
    }

    webSocket.onmessage = function (message) {
      console.log(message.data);
    }.bind(this);

    webSocket.onopen = function () {
      console.log("connection opened");
      isConnected = true;
    };

    webSocket.onclose = function () {
      console.log("connection closed");
      isConnected = false;
    };

    webSocket.onerror = function wserror(message) {
      console.log("error: " + message);
    };

    setInterval(() => {
      if (isConnected) {
        sendMsg({
          'velocity': 22.0,
          'angle': 0.0,
          'position': {
            'x': 0.99,
            'y': 1.0
          },
          'isShoot': false
        })
      }
    }, 1000);

  }

  sendMsg(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  close() {
    this.ws.close();
  }
}

export default WebSocketService;
