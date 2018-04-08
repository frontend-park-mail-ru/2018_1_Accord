class Bus {
  constructor() {
    this.listeners = {};
  }

  /**
   *
   * @param {String} event
   * @param listener
   * @param {String} scope
   * @return {Bus}
   */
  on(event, listener, scope) {
    (this.listeners[scope][event] || (this.listeners[scope][event] = [])).push(listener);
    return this;
  }

  off(event, listener, scope) {
    if (listener) {
      this.listeners[scope][event] = (this.listeners[scope][event] || []).filter(l => l !== listener);
    } else {
      this.listeners[scope][event] = [];
    }
    return this;
  }

  emit(event, data, scope) {
    (this.listeners[scope][event] || (this.listeners[scope][event] = [])).forEach(l => l(data));
    return this;
  }
}

const EventBus = new Bus();
export default EventBus;
