import audio from '../../../modules/AudioPlayer/AudioPlayer.js';

export default class MuteButton {

  /**
   * @param {HTMLElement} element
   * @param {String} className
   */
  constructor(element, className) {
    this.muteButton = element.querySelector(className);
    this.muteButton.style.display = 'inline-block';
    this._onClick();
  }

  render() {
    return this.muteButton;
  }

  /**
   * @private
   */
  _onClick() {
    this.muteButton.addEventListener('click', (event) => {
      event.preventDefault();
      audio.onMute();
      if(this.muteButton.style.backgroundImage === 'url("../icons/i-muted.png")') {
        this.muteButton.style.backgroundImage = 'url("../icons/i-unmuted.png")';
      }
      else {
        this.muteButton.style.backgroundImage = 'url("../icons/i-muted.png")';
      }
    });
  }
}
