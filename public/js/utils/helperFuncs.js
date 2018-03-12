/**
 *
 * @param {HTMLElement} element
 * @param {String} event
 * @param {} callback
 */
export const disposableListener = (element, event, callback) => {
  const disCallback = (ev) => {
    element.removeEventListener(event, disCallback);
    return callback(ev);
  };

  element.addEventListener(event, disCallback);
  return () => element.removeEventListener(event, disCallback);
};
