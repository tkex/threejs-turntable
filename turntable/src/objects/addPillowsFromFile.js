function addPillowsFromFile() {
  var pillowFirstMaterial = new THREE.MeshStandardMaterial({ color: 0x860111 }); // Colour for Pillow 1
  var pillowSecondMaterial = new THREE.MeshStandardMaterial({ color: 0xff9900 }); // Colour for Pillow 2
  var pillowThirdMaterial = new THREE.MeshStandardMaterial({ color: 0xceff00 }); // Colour for Pillow 3
  var pillowFourthMaterial = new THREE.MeshStandardMaterial({ color: 0x82c1da }); // Colour for Pillow 4

  pillowFirst = new THREE.Group();
  pillowSecond = new THREE.Group();
  pillowThird = new THREE.Group();
  pillowFourth = new THREE.Group();

  // Pillow 1
  var fbxloader = new THREE.FBXLoader();

  fbxloader.load('src/models/pillowBlender.fbx', function (object) {
    pillowFirst.add(object);

    object.traverse(function (child) {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide;
        child.castShadow = true;
        child.material = pillowFirstMaterial;
        child.material.needsUpdate = true;
        child.material.map.anisotropy = 8;
      }
    });
  });

  pillowFirst.position.set(-50, 6.3, 50);
  pillowFirst.rotation.y = 45 * DEG_TO_RAD;
  scene.add(pillowFirst);

  // Pillow 2
  var fbxloader = new THREE.FBXLoader();

  fbxloader.load('src/models/pillowBlender.fbx', function (object) {
    pillowSecond.add(object);

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.material = pillowSecondMaterial;
        child.material.needsUpdate = true;
        child.material.map.anisotropy = 8;
      }
    });
  });

  pillowSecond.position.set(55, 6.3, 55);
  pillowSecond.rotation.y = 35 * DEG_TO_RAD;
  scene.add(pillowSecond);

  // Pillow 3
  var fbxloader = new THREE.FBXLoader();

  fbxloader.load('src/models/pillowBlender.fbx', function (object) {
    pillowThird.add(object);

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.material = pillowThirdMaterial;
        child.material.needsUpdate = true;
        child.material.map.anisotropy = 8;
      }
    });
  });

  pillowThird.position.set(52, 6.3, -52);
  pillowThird.rotation.y = 50 * DEG_TO_RAD;
  scene.add(pillowThird);

  // Pillow 4
  var fbxloader = new THREE.FBXLoader();

  fbxloader.load('src/models/pillowBlender.fbx', function (object) {
    pillowFourth.add(object);

    object.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.material = pillowFourthMaterial;
        child.material.needsUpdate = true;
        child.material.map.anisotropy = 8;
      }
    });
  });

  pillowFourth.position.set(-52, 6.3, -52);
  pillowFourth.rotation.y = 55 * DEG_TO_RAD;
  scene.add(pillowFourth);
}
