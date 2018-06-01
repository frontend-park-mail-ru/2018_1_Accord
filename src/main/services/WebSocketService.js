import EventBus from '../modules/eventBus.js';
import {events} from '../modules/events.js';
import userService from './UserService.js';

class WebSocketService {
  constructor() {
    this.ws = new WebSocket('ws://localhost:8999/');
    this.ws.onopen = () => {
      userService.getUser()
        .then((user) => {
          this.sendMsg({
            'email': `${user.email}`,
            'level': 0
          });
        })
        .catch((error) => {
          this.ws.close();
          console.log(error);
          EventBus.emit(events.ROUTE.LOGIN);
        });
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
        EventBus.emit(events.GAME.FINISH);
        console.log('Обрыв соединения');
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
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
