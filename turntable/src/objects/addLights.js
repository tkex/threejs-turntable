function addLights() {
  // Ambient
  var ambientLight = new THREE.AmbientLight(0xffffff);
  ambientLight.intensity = 0.7;
  scene.add(ambientLight);

  // Directional
  var directionaLight = new THREE.DirectionalLight(0xffffff);
  directionaLight.position.set(-80, 300, -10);
  directionaLight.lookAt(0, 0, 0);
  directionaLight.intensity = 0.6;
  directionaLight.castShadow = true;
  directionaLight.shadow.radius = 1;
  directionaLight.shadow.camera.top = 100;
  directionaLight.shadow.camera.bottom = -100;
  directionaLight.shadow.camera.left = -100;
  directionaLight.shadow.camera.right = 100;
  directionaLight.shadow.mapSize.width = 1024;
  directionaLight.shadow.mapSize.height = 1024;
  scene.add(directionaLight);
  //scene.add(new THREE.CameraHelper( directionaLight.shadow.camera ));

  // Pointlight
  pointLight = new THREE.PointLight(0xffaa00, 0.15);
  pointLight.position.set(150, 220, -150);
  pointLight.lookAt(scene.position);
  pointLight.castShadow = true;
  scene.add(pointLight);
}
