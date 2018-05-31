import EventBus from '../modules/eventBus.js';
import {events} from '../modules/events.js';

class WebSocketService {
  constructor() {
    this.isConnected = false;

    this.ws = new WebSocket('wss://backend-accord-02-2018.herokuapp.com/mgame');
    this.ws.onopen = (event) => {
      this.isConnected = true;
      EventBus.emit(events.WS.START_GAME);
      console.log('connection opened', event);
    };

    this.ws.onmessage = (event) => {
      console.log(event.data);
      try {
        const msg = JSON.parse(event.data);
        EventBus.emit(events.WS.MESSAGE, msg);
      } catch (error) {
        console.log(error);
      }

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
  }

  sendMsg(msg) {
    this.ws.send(JSON.stringify(msg));
  }

  close() {
    this.ws.close();
  }
}

export default WebSocketService;
