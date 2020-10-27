var sound_vinyl = new Howl({
  src: ['src/audiofiles/vinyl_sound.mp3'],
  html5: true,
  loop: true,
});

function setTurntableSound(event) {
  sound_vinyl.pause();

  if (turntableState.powerOn) {
    if (turntableState.tonearmOut) {
      if (turntableState.tableRotating) {
        if (!turntableState.speedOn) {
          sound_vinyl.pause();
          sound_vinyl.fade(0, 1, 3000);
          sound_vinyl.play();
        } else {
          sound_vinyl.pause();
          sound_vinyl.rate(1.5);
          sound_vinyl.play();
        }
      } else {
        sound_vinyl.pause();
      }
    } else {
      // eventual static
    }
  }
}
