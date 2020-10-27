raycaster = new THREE.Raycaster();

function executeRaycast(event) {
  raycaster.setFromCamera(mousePosition, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    var firstHit = intersects[0].object;

    if (firstHit.name === 'playStopButton') {
      turntableState.powerOn = !turntableState.powerOn;
      firstHit.userData.toggleAnimationEndPosition();
      window.dispatchEvent(new Event('turntableStateChanged'));
    } else if (firstHit.parent.name === 'platTableComponent' && turntableState.powerOn) {
      turntableState.tableRotating = !turntableState.tableRotating;
      firstHit.parent.userData.forward = !firstHit.parent.userData.forward;

      window.dispatchEvent(new Event('turntableStateChanged'));

      if (firstHit.parent.userData.forward) {
        firstHit.parent.userData.backwardTween.stop();
        firstHit.parent.userData.forwardTween.start();
      } else {
        firstHit.parent.userData.forwardTween.stop();
        firstHit.parent.userData.backwardTween.start();
      }
    } else if (firstHit.name === 'speedButton') {
      turntableState.speedOn = !turntableState.speedOn;
      firstHit.userData.toggleAnimationEndPosition();
      window.dispatchEvent(new Event('turntableStateChanged'));
    } else if (firstHit.parent.name === 'liftLevelComponent') {
      turntableState.sliderOut = !turntableState.sliderOut;
      firstHit.parent.userData.toggleAnimationEndPosition();
    } else if (firstHit.parent.name === 'toneArmComponent' && turntableState.sliderOut) {
      turntableState.tonearmOut = !turntableState.tonearmOut;
      window.dispatchEvent(new Event('turntableStateChanged'));
      firstHit.parent.userData.forward = !firstHit.parent.userData.forward;

      if (firstHit.parent.userData.forward) {
        firstHit.parent.userData.backwardTween.stop();
        firstHit.parent.userData.forwardTween.start();
      } else {
        firstHit.parent.userData.forwardTween.stop();
        firstHit.parent.userData.backwardTween.start();
      }
    }
  }
}
