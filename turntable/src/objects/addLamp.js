function addLamp() {
  lamp = new THREE.Group();

  // BoxLight Lamp
  var boxLightGeometry = new THREE.BoxGeometry(13, 27, 13);
  var boxLight = new THREE.PointLight(0xffee88, 1, 150, 2);

  var boxLightMaterial = new THREE.MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000,
  });

  boxLight.add(new THREE.Mesh(boxLightGeometry, boxLightMaterial));
  boxLight.position.set(-125, 50, -70);

  boxLight.castShadow = true;
  boxLight.rotation.y = 45 * DEG_TO_RAD;
  lamp.add(boxLight);

  scene.add(lamp);

  // Footing
  var lampFootGeometry = new THREE.CylinderGeometry(0.4, 0.4, 40, 64, 1, false);
  var lampFootMaterial = new THREE.MeshStandardMaterial({
    color: 0x192236,
    metalness: 0.6,
    emissive: 0x111111,
  });

  var lampFootFront = new THREE.Mesh(lampFootGeometry, lampFootMaterial);
  lampFootFront.castShadow = true;
  lamp.add(lampFootFront);

  var lampFootBack = new THREE.Mesh(lampFootGeometry, lampFootMaterial);
  lampFootBack.castShadow = true;
  lamp.add(lampFootBack);

  var lampFootRight = new THREE.Mesh(lampFootGeometry, lampFootMaterial);
  lampFootRight.castShadow = true;
  lamp.add(lampFootRight);

  var lampFootLeft = new THREE.Mesh(lampFootGeometry, lampFootMaterial);
  lampFootLeft.castShadow = true;
  lamp.add(lampFootLeft);

  // Alignments
  lampFootFront.position.set(-125, 19, -61);
  lampFootFront.rotation.x = -8 * DEG_TO_RAD;

  lampFootBack.position.set(-125, 19, -79);
  lampFootBack.rotation.x = 8 * DEG_TO_RAD;

  lampFootRight.position.set(-116, 19, -70);
  lampFootRight.rotation.z = 8 * DEG_TO_RAD;

  lampFootLeft.position.set(-134, 19, -70);
  lampFootLeft.rotation.z = -8 * DEG_TO_RAD;
}
