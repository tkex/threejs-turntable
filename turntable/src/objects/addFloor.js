function addFloor() {
  // Floor
  var floorGeometry = new THREE.PlaneGeometry(300, 300);
  var floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
    metalness: 0.2, // 0.05
  });

  var floorTexture = new THREE.TextureLoader().load('src/images/floorTexture.jpg');

  // Repeat pattern
  floorTexture.repeat.set(4, 4);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorMaterial.map = floorTexture;

  var floor = new THREE.Mesh(floorGeometry, floorMaterial);

  // Alignments
  floor.rotation.x = -90 * DEG_TO_RAD;
  floor.receiveShadow = true;

  scene.add(floor);
}
