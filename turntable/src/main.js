// External Libraries
document.write(
  '<script type="text/javascript" src="../lib/three.js-master/build/three.js"></script>',
);
document.write(
  '<script type="text/javascript" src="../lib/dat.gui-master/build/dat.gui.js"></script>',
);
document.write(
  '<script type="text/javascript" src="../lib/three.js-master/examples/js/controls/OrbitControls.js"></script>',
);
// Enable for offline useage local min.js with its limited functionality (no repeat method)
// document.write('<script type="text/javascript" src="../lib/three.js-master/examples/js/libs/tween.min.js"></script>');
document.write(
  '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/17.2.0/Tween.js"></script>',
);
document.write(
  '<script type="text/javascript" src="../lib/three.js-master/examples/js/libs/inflate.min.js"></script>',
);
document.write(
  '<script type="text/javascript" src="../lib/three.js-master/examples/js/libs/stats.min.js"></script>',
);
document.write(
  '<script type="text/javascript" src="../lib/three.js-master/examples/js/loaders/FBXLoader_r90.js"></script>',
);
document.write(
  '<script type="text/javascript" src="../lib/ThreeCSG-master_oldVersion/ThreeCSG.js"></script>',
);
document.write(
  '<script type="text/javascript" src="../lib/cannon.js-master/build/cannon.js"></script>',
);
document.write(
  '<script type="text/javascript" src="../lib/howler.js-master/src/howler.core.js"></script>',
);

// Own Code
document.write('<script type="text/javascript" src="src/objects/addTurntable.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addInterior.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addTableFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addPillowsFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addFloor.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addLamp.js"></script>');
document.write('<script type="text/javascript" src="src/objects/addLights.js"></script>');
document.write(
  '<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>',
);
document.write(
  '<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>',
);
document.write(
  '<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>',
);
document.write(
  '<script type="text/javascript" src="src/eventfunctions/executeKeyAction.js"></script>',
);
document.write(
  '<script type="text/javascript" src="src/eventfunctions/setTurntableSound.js"></script>',
);
document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/physics/Physics.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {
  scene = new THREE.Scene();

  physics = new Physics();
  physics.initialize(0, -200, 0, 1 / 120, true);

  var axes = new THREE.AxesHelper(60);
  scene.add(axes);

  // Add objects to the scene
  addTurntable();
  addTableFromFile();
  addFloor();
  addLights();
  addPillowsFromFile();
  addInterior();
  addLamp();

  //  Grid helper
  var grid = new THREE.GridHelper(300, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  //scene.add( grid );

  // Set and configure camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(90, 90, 90);
  camera.lookAt(0, 0, 0);

  var orbitControls = new THREE.OrbitControls(camera);
  orbitControls.target = new THREE.Vector3(0, 0, 0);
  orbitControls.update();

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  document.getElementById('3d_content').appendChild(renderer.domElement);

  // Show scene stats
  var stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  var clock = new THREE.Clock();

  function mainLoop() {
    // Show stats when scene starts
    stats.begin();

    // Get delta from clock for physics and animations
    var delta = clock.getDelta();

    physics.update(delta);

    // if (animationMixer != null) // in case for potential Blender animations
    // animationMixer.update( delta );

    playStopButtonAnimation.update(delta);
    speedButtonAnimation.update(delta);
    liftLevelAnimation.update(delta);
    // toneArmComponentAnimation.update(delta);
    // platTableComponentAnimation.update(delta);
    TWEEN.update();

    renderer.render(scene, camera);

    stats.end();

    requestAnimationFrame(mainLoop);
  }

  mainLoop();

  window.onresize = updateAspectRatio;
  window.onmousemove = calculateMousePosition;
  window.onclick = executeRaycast;
  window.onkeydown = keyDownAction;
  window.onkeyup = keyUpAction;

  window.addEventListener('turntableStateChanged', setTurntableSound);
  window.dispatchEvent(new Event('turntableStateChanged'));
}

window.onload = main;
