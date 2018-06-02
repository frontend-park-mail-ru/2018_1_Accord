import Logger from '../../utils/logger.js';

class AudioPlayer {
  constructor() {
    this.audio = new Audio('/music/thesimpsons.mp3');
    this.audio.onended = this.onEnded.bind(this);
  }

  play() {
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((error) => {
        Logger.log(error);
      });
  }

  onMute() {
    this.audio.muted = !this.audio.muted;
  }

  onEnded() {
    this.audio.play();
  }
}

const audio = new AudioPlayer();
export default audio;

