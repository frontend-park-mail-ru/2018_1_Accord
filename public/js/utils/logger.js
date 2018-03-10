import {config} from '../modules/config.js';

export default class Logger {
  static error(...args) {
    if (config.debug){
      return console.error(...args);
    }
  }

  static warn(...args) {
    if (config.debug){
      return console.warn(...args);
    }
  }

  static log(...args) {
    if (config.debug) {
      return console.log(...args);
    }
  }
}