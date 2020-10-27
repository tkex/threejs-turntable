function addTableFromFile() {
  table = new THREE.Group();

  var material = new THREE.MeshPhongMaterial({
    shininess: 100,
    reflectivity: 0.15,
    color: 0x192236, // 0x100c08, 101016, 1d1e36, 192236
    wireframe: false,
    specular: 0x050505,
    emissive: 0x111111,
  });

  var path = '../lib/three.js-master/examples/textures/cube/Bridge2/';
  var images = [
    path + 'posx.jpg',
    path + 'negx.jpg',
    path + 'posy.jpg',
    path + 'negy.jpg',
    path + 'posz.jpg',
    path + 'negz.jpg',
  ];
  var cubeTextur = new THREE.CubeTextureLoader().load(images);
  cubeTextur.mapping = THREE.CubeReflectionMapping;
  material.envMap = cubeTextur;
  material.combine = THREE.MixOperation;
  material.reflectivity = 0.02; // 0.1

  material.map = new THREE.TextureLoader().load('src/images/tableTexture.png');
  material.transparency = 100;

  var fbxloader = new THREE.FBXLoader();

  fbxloader.load('src/models/tableBlender.fbx', function (object) {
    table.add(object);

    object.traverse(function (child) {
      if (child.isMesh) {
        //child.material.side = THREE.DoubleSide;
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = material;
        child.material.needsUpdate = true;
        child.material.map.anisotropy = 8;
      }
    });
  });

  table.position.set(0, 11.3, 0);
  table.rotation.y = 45 * DEG_TO_RAD;
  scene.add(table);

  var tabletopGeometry = new THREE.BoxGeometry(100, 0.1, 100, 10, 1, 5);
  var tabletopMesh = new THREE.Mesh(
    tabletopGeometry,
    new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
    }),
  );
  tabletopMesh.position.set(0, 11.0, 0);
  //table.add(tabletopMesh);

  physics.addBox(tabletopMesh, 100, 0.1, 100, 0);
}
