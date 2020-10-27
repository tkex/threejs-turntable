function addInterior() {
  // Walls
  var wallMaterial = new THREE.MeshLambertMaterial({ color: 0x001440 });

  var wallBackGeometry = new THREE.BoxGeometry(302, 200, 2);
  var wallBack = new THREE.Mesh(wallBackGeometry, wallMaterial);
  wallBack.position.set(0, 100, -150);
  scene.add(wallBack);

  var wallLeftGeometry = new THREE.BoxGeometry(300, 200, 2);
  var wallLeft = new THREE.Mesh(wallLeftGeometry, wallMaterial);
  wallLeft.position.set(-150, 100, 0);
  wallLeft.rotation.y = 90 * DEG_TO_RAD;
  scene.add(wallLeft);

  var wallRight = new THREE.Mesh(wallLeftGeometry, wallMaterial);
  wallRight.position.set(150, 100, 0);
  wallRight.rotation.y = 90 * DEG_TO_RAD;
  scene.add(wallRight);

  // Base boards
  var baseBoardGeometry = new THREE.BoxGeometry(300, 10, 1);
  var baseBoardMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

  var baseBoardBack = new THREE.Mesh(baseBoardGeometry, baseBoardMaterial);
  baseBoardBack.position.set(0, 5, -149);
  scene.add(baseBoardBack);

  var baseBoardLeft = new THREE.Mesh(baseBoardGeometry, baseBoardMaterial);
  baseBoardLeft.rotation.y = 90 * DEG_TO_RAD;
  baseBoardLeft.position.set(-149, 5, 0);
  scene.add(baseBoardLeft);

  var baseBoardRight = new THREE.Mesh(baseBoardGeometry, baseBoardMaterial);
  baseBoardRight.rotation.y = 90 * DEG_TO_RAD;
  baseBoardRight.position.set(149, 5, 0);
  scene.add(baseBoardRight);
}
