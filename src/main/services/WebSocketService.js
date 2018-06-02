import EventBus from '../modules/eventBus.js';
import {events} from '../modules/events.js';
import userService from './UserService.js';
import Logger from '../utils/logger.js';

class WebSocketService {
  constructor() {
    this.ws = new WebSocket('wss://донуц.рф/api/mgame');
    this.ws.onopen = () => {
      userService.getUser()
        .then((user) => {
          this.sendMsg({
            'email': `${user.email}`,
            'level': 0
          });
        })
        .catch((error) => {
          try {
            this.ws.close();
          } catch (e) {
            Logger.log(e);
          }
          Logger.log(error);
          EventBus.emit(events.ROUTE.LOGIN);
        });
    };

    this.ws.onmessage = (event) => {
      Logger.log(event.data);
      try {
        const msg = JSON.parse(event.data);
        EventBus.emit(events.WS.MESSAGE, msg);
      } catch (error) {
        Logger.log(error);
      }
    };

    this.ws.onclose = (event) => {
      if (event.wasClean) {
        Logger.log('Соединение закрыто чисто');
      } else {
        EventBus.emit(events.GAME.FINISH);
        Logger.log('Обрыв соединения');
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
    try {
      this.ws.close();
    } catch (e) {
      Logger.log(e);
    }
  }
}

export default WebSocketService;
