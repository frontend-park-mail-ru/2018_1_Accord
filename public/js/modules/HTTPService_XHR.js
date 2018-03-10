import config from './config.js';
import Logger from '../utils/logger.js';


class HttpResponse {
  constructor(status, body) {
    this.status = status;
    this.body = body;

    this.status >= 500 ? this.ok = false : this.ok = true;
  }

  json() {
    try {
      return JSON.parse(this.body);
    } catch (error) {
      Logger.error('Parsing JSON error');
      if (!this.body) {
        Logger.error('User not found');
      }
      return error;
    }
  }
}

export default class HTTPService_XHR {
  static get(path, callback) {
    return this.request('GET', path, undefined, callback);
  }

  static post(path, body, callback) {
    return this.request('POST', path, body, callback);
  }

  static put(path, body, callback) {
    return this.request('PUT', path, body, callback);
  }

  static delete(path, callback) {
    return this.request('DELETE', path, undefined, callback);
  }

  static request(type, path, body, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(type, `${config.serverUrl}${path}`, true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      const response = new HttpResponse(xhr.status, xhr.responseText);
      callback(response);
    };

    xhr.withCredentials = true;

    if (type === 'POST' || type === 'PUT'){
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  }
}


