var spaceDown = false;

function keyDownAction(event) {
  switch (event.keyCode) {
    case 32:
      if (!spaceDown) {
        spaceDown = true;

        // Set ball properties
        var ballRadius = 4;
        var ballGeometry = new THREE.SphereGeometry(ballRadius, 16, 16);
        var ball = new THREE.Mesh(
          ballGeometry,
          new THREE.MeshLambertMaterial({
            color: 0xdd4949,
          }),
        );
        ball.position.set(camera.position.x, camera.position.y, camera.position.z);
        ball.castShadow = true;
        scene.add(ball);

        var directionalVectorDC = new THREE.Vector3(0, 0, 1);
        var velocityVectorWC = directionalVectorDC.unproject(camera);
        velocityVectorWC.normalize();
        velocityVectorWC.multiplyScalar(800);
        physics.addSphere(ball, ballRadius, 1, velocityVectorWC);
      }
      break;
  }
}

function keyUpAction(event) {
  switch (event.keyCode) {
    case 32:
      spaceDown = false;
      break;
  }
}
