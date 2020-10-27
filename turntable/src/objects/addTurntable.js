function addTurntable() {
  // Set materials

  var bodyMaterial = new THREE.MeshPhongMaterial({
    shininess: 100,
    reflectivity: 0.25,
    color: 0x101016, // alternative: 0x100c08  (black)
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
  bodyMaterial.envMap = cubeTextur;
  bodyMaterial.combine = THREE.MixOperation;
  bodyMaterial.reflectivity = 0.3;

  var blackComponentsMaterial = new THREE.MeshPhongMaterial({
    color: 0x333333,
  });

  var chromeComponentsMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff, //alternative: 0xf8f8f8 (grey)
    emissive: 0x757575,
    emissiveIntensity: 0.3,
    combine: THREE.MultiplyOperation,
  });

  // var path = "../lib/three.js-master/examples/textures/cube/MilkyWay/";
  var path = '../lib/three.js-master/examples/textures/cube/Bridge2/';
  var images = [
    path + 'posx.jpg',
    path + 'negx.jpg',
    path + 'posy.jpg',
    path + 'negy.jpg',
    path + 'posz.jpg',
    path + 'negz.jpg',
  ];
  var chromeTextur = new THREE.CubeTextureLoader().load(images);
  chromeComponentsMaterial.mapping = THREE.CubeReflectionMapping;
  chromeComponentsMaterial.envMap = chromeTextur;
  chromeComponentsMaterial.combine = THREE.MixOperation;
  chromeComponentsMaterial.reflectivity = 0.2;
  //chromeComponentsMaterial.shininess = 30;

  var goldComponentsMaterial = new THREE.MeshPhongMaterial({
    color: 0xaa9944,
    specular: 0xbbaa99,
    shininess: 50,
    reflectivity: 0.25,
    emissive: 0x757575,
    emissiveIntensity: 0.3,
  });

  var dustCoverComponentsMaterial = new THREE.MeshPhongMaterial({
    color: 0x223344,
    opacity: 0.75,
    transparent: true,
  });

  // Beginning of meshes here

  /* --- Groups ---
   ** Contains all used groups in this project
   ** Turntable is the parent group of all the other groups
   ** Child-groups of Turntable are containing all upcoming components
   */

  var Turntable = new THREE.Object3D(); // Turntable

  var platterComponents = new THREE.Object3D();
  var hingerComponents = new THREE.Object3D();
  var dustCoverComponents = new THREE.Object3D();
  var buttonComponents = new THREE.Object3D();
  var footingComponents = new THREE.Object3D();
  var liftLevelComponents = new THREE.Object3D();
  var toneArmBaseComponents = new THREE.Object3D();
  var toneArmComponents = new THREE.Object3D();

  Turntable.castShadow = true;
  /* - - - - - - - - - - - - - - - - - */

  // Turntable body
  var turntableBodyGeometry = new THREE.BoxGeometry(45, 3.4, 37);
  var turntableBody = new THREE.Mesh(turntableBodyGeometry, bodyMaterial);
  turntableBody.position.set(0, 3.8, 0);
  turntableBody.castShadow = true;
  turntableBody.receiveShadow = true;
  Turntable.add(turntableBody);

  // Hinger located at turntable body
  function hinger(x, y, z) {
    var dustCoverHingeGeometry = new THREE.BoxGeometry(4.2, 2.5, 0.1);
    var dustCoverHinge = new THREE.Mesh(dustCoverHingeGeometry, blackComponentsMaterial);
    dustCoverHinge.position.set(x, y, z);
    dustCoverHinge.castShadow = true;
    Turntable.add(dustCoverHinge);

    var dustCoverHingeBumperGeometry = new THREE.BoxGeometry(2, 2.5, 0.3);
    var dustCoverHingeBumper = new THREE.Mesh(
      dustCoverHingeBumperGeometry,
      blackComponentsMaterial,
    );
    dustCoverHingeBumper.position.set(x, y, -18.7);
    dustCoverHingeBumper.castShadow = true;
    Turntable.add(dustCoverHingeBumper);

    var dustCoverHingeLayoverGeometry = new THREE.BoxGeometry(3.0, 0.5, 0.1);
    var dustCoverHingeLayover = new THREE.Mesh(
      dustCoverHingeLayoverGeometry,
      blackComponentsMaterial,
    );
    dustCoverHingeLayover.position.set(x, 5.5, z);
    dustCoverHingeLayover.castShadow = true;
    Turntable.add(dustCoverHingeLayover);
  }

  hinger(14.5, 4, -18.6);
  hinger(-14.5, 4, -18.6);

  function dustCoverHingeFct(x, y, z) {
    var dustCoverHingeCaseGeometry = new THREE.BoxGeometry(4.2, 2.5, 0.1);
    var dustCoverHinge = new THREE.Mesh(dustCoverHingeCaseGeometry, blackComponentsMaterial);
    dustCoverComponents.add(dustCoverHinge);
    dustCoverHinge.castShadow = true;
    dustCoverHinge.position.set(x, y, z);
  }

  var dustCoverBoxGeometry = new THREE.BoxGeometry(44, 5.5, 36.5);
  var dustCoverBox = new THREE.Mesh(dustCoverBoxGeometry, blackComponentsMaterial);
  dustCoverBox.position.set(0, 0.2, 0);

  var dustCoverBoxSubtractGeometry = new THREE.BoxGeometry(43.6, 5.3, 36.1);
  var dustCoverBoxSubtract = new THREE.Mesh(dustCoverBoxSubtractGeometry, blackComponentsMaterial);
  dustCoverBoxSubtract.position.set(0, 0, 0);

  var dustCoverBoxBSP = new ThreeBSP(dustCoverBox);
  var dustCoverBoxSubtractBSP = new ThreeBSP(dustCoverBoxSubtract);
  var speedButtonSubBSP = dustCoverBoxBSP.subtract(dustCoverBoxSubtractBSP);
  var dustCover = speedButtonSubBSP.toMesh(dustCoverComponentsMaterial);
  dustCover.geometry.computeFaceNormals();
  //dustCover.castShadow = true;
  dustCoverComponents.add(dustCover);

  Turntable.add(dustCoverComponents);

  // dustCover components alignments
  dustCoverComponents.position.set(0, 21.4, -8.95);
  dustCoverComponents.rotation.x = -50 * DEG_TO_RAD;
  var dustCoverHingeLeft = dustCoverHingeFct(14.5, -1.5, -18.2);
  var dustCoverHingeRight = dustCoverHingeFct(-14.5, -1.5, -18.2);

  /* - - - - - - - - - - - - - - - - - */

  /*
   ** platterComponents
   */

  // Platter
  var platterGeometry = new THREE.CylinderGeometry(15, 15, 1.5, 64, 1, false);
  var platter = new THREE.Mesh(platterGeometry, chromeComponentsMaterial);
  platter.castShadow = true;
  platterComponents.add(platter);

  // Platter bevel top
  var platterBevelGeometry = new THREE.CylinderGeometry(14.5, 15, 0.3, 64, 1, false);
  var platterBevel = new THREE.Mesh(platterBevelGeometry, chromeComponentsMaterial);
  platterBevel.castShadow = true;
  platterComponents.add(platterBevel);

  // Platter sheet
  var platterComponentsheetGeometry = new THREE.CylinderGeometry(14.5, 14.5, 0.3, 64, 1, false);

  var platterBasicMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
  var platterTextureMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

  platterTextureMaterial.map = new THREE.TextureLoader().load('src/images/vinylTexture.jpg');
  var platterMaterialArray = [platterBasicMaterial, platterTextureMaterial, platterBasicMaterial];

  var platterComponentsheet = new THREE.Mesh(platterComponentsheetGeometry, platterMaterialArray);
  platterComponentsheet.castShadow = true;
  platterComponents.add(platterComponentsheet);

  // Platter axes top
  var platterAxesTopGeometry = new THREE.CylinderGeometry(0.05, 0.3, 0.5, 32, 1, false);
  var platterAxesTop = new THREE.Mesh(platterAxesTopGeometry, chromeComponentsMaterial);
  platterAxesTop.castShadow = true;
  platterComponents.add(platterAxesTop);

  // Platter axes top cylinder
  var platterAxesGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3.5, 32, 1, false);
  var platterAxes = new THREE.Mesh(platterAxesGeometry, chromeComponentsMaterial);
  platterAxes.castShadow = true;
  platterComponents.add(platterAxes);

  // Platter axes base
  var platterAxesBaseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32, 1, false);
  var platterAxesBase = new THREE.Mesh(platterAxesBaseGeometry, goldComponentsMaterial);
  platterAxesBase.castShadow = true;
  platterComponents.add(platterAxesBase);

  Turntable.add(platterComponents);

  /*
   ** Adding scenes and align relative positions of platTable components
   */
  platterComponents.position.set(-4.5, 7, 0);
  platterComponents.name = 'platTableComponent';

  platter.position.set(0, -0.2, 0);
  platterBevel.position.set(0, 0.7, 0);
  platterComponentsheet.position.set(0, 0.95, 0);
  platterAxesTop.position.set(0, 2, 0);
  platterAxes.position.set(0, 0, 0);
  platterAxesBase.position.set(0, -1.5, 0);

  // Center point helper of platter
  var lineGeometry = new THREE.CylinderGeometry(0.025, 0.025, 24.0, 32, 1, false);
  var line = new THREE.Mesh(lineGeometry, chromeComponentsMaterial);
  line.position.set(-4.5, 5.0, 0);
  //scene.add( line );

  // Tween rotation animation of platterComponents
  var tweens = {
    forward: false,
    forwardTween: new TWEEN.Tween(platterComponents.rotation)
      .to({ y: -2 * Math.PI }, 3600)
      .repeat(Infinity)
      .easing(TWEEN.Easing.Quadratic.Out),
    backwardTween: new TWEEN.Tween(platterComponents.rotation)
      .to({ y: 0.001 * Math.PI }, 2500)
      .easing(TWEEN.Easing.Quadratic.Out),
  };
  platterComponents.userData = tweens;

  /* - - - - - - - - - - - - - - - - - */

  /*
   ** buttonComponents
   */

  // playStopButton (right)
  var ButtonGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 32, 1, false);
  var playStopButton = new THREE.Mesh(ButtonGeometry, chromeComponentsMaterial);
  playStopButton.position.set(-12, 5.5, 15.5);

  var playHoleGeometry = new THREE.CylinderGeometry(0.52, 0.52, 0.4, 32, 1, false);
  var playHole = new THREE.Mesh(playHoleGeometry, chromeComponentsMaterial);
  playHole.castShadow = true;
  playHole.position.set(-12, 5.5, 15.5);

  // buttonBSP
  var playStopButtonBSP = new ThreeBSP(playStopButton);
  var playHoleBSP = new ThreeBSP(playHole);
  var subtractBSP = playStopButtonBSP.subtract(playHoleBSP);
  var holeResult = subtractBSP.toMesh(chromeComponentsMaterial);
  holeResult.geometry.computeFaceNormals();
  holeResult.castShadow = true;
  buttonComponents.add(holeResult);

  // playStopButton (right)
  var MainButtonGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.6, 32, 1, false);
  var playStopButton = new THREE.Mesh(MainButtonGeometry, chromeComponentsMaterial);
  playStopButton.castShadow = true;
  playStopButton.position.set(-12.0, 5.75, 15.5);
  playStopButton.name = 'playStopButton';
  buttonComponents.add(playStopButton);

  // Animation
  playStopButtonAnimation = new Animation(
    playStopButton,
    AnimationType.TRANSLATION,
    AnimationAxis.Y,
  );
  playStopButtonAnimation.setAmount(-0.2);
  playStopButtonAnimation.setSpeed(1);
  playStopButton.userData = playStopButtonAnimation;

  // speedButton (left)
  var speedButtonSubBSP = playStopButtonBSP.subtract(playHoleBSP);
  var speedButton = speedButtonSubBSP.toMesh(chromeComponentsMaterial);
  speedButton.geometry.computeFaceNormals();
  speedButton.castShadow = true;
  speedButton.position.set(-15, 5.5, 15.5);
  buttonComponents.add(speedButton);

  // speedMainButton (left)
  var speedMainButton = new THREE.Mesh(MainButtonGeometry, chromeComponentsMaterial);
  speedMainButton.position.set(-15.0, 5.75, 15.5);
  speedMainButton.castShadow = true;
  speedMainButton.name = 'speedButton';
  buttonComponents.add(speedMainButton);

  // Animation
  speedButtonAnimation = new Animation(speedMainButton, AnimationType.TRANSLATION, AnimationAxis.Y);
  speedButtonAnimation.setAmount(-0.2);
  speedButtonAnimation.setSpeed(1);
  speedMainButton.userData = speedButtonAnimation;

  Turntable.add(buttonComponents);

  /* - - - - - - - - - - - - - - - - - */

  /*
   ** Footing components
   */

  function foot(x, y, z) {
    var footingComponents = new THREE.Object3D();

    var footLevelOneGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 32, 1, false);
    var footLevelOneMaterial = new THREE.MeshLambertMaterial({ color: 0xffead9, wireframe: false });
    var footLevelOne = new THREE.Mesh(footLevelOneGeometry, blackComponentsMaterial);
    footLevelOne.position.y = 0.25;
    footLevelOne.castShadow = true;
    footingComponents.add(footLevelOne);

    var footLevelTwoGeometry = new THREE.CylinderGeometry(2.2, 2.2, 0.6, 32, 1, false);
    var footLevelTwoMaterial = new THREE.MeshLambertMaterial({ color: 0xffead9, wireframe: false });
    var footLevelTwo = new THREE.Mesh(footLevelTwoGeometry, chromeComponentsMaterial);
    footLevelTwo.position.y = 0.7;
    footLevelTwo.castShadow = true;
    footingComponents.add(footLevelTwo);

    var footLevelThreeGeometry = new THREE.CylinderGeometry(1.5, 1.7, 0.5, 32, 1, false);
    var footLevelThreeMaterial = new THREE.MeshLambertMaterial({
      color: 0x000000,
      wireframe: false,
    });
    var footLevelThree = new THREE.Mesh(footLevelThreeGeometry, blackComponentsMaterial);
    footLevelThree.position.y = 1.2;
    footLevelThree.castShadow = true;
    footingComponents.add(footLevelThree);

    var footLevelFourGeometry = new THREE.CylinderGeometry(1.0, 1.2, 0.4, 32, 1, false);
    var footLevelFourMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    var footLevelFour = new THREE.Mesh(footLevelFourGeometry, blackComponentsMaterial);
    footLevelFour.position.y = 1.5;
    footLevelFour.castShadow = true;
    footingComponents.add(footLevelFour);

    var footLevelFiveGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.0, 32, 1, false);
    var footLevelFiveMaterial = new THREE.MeshLambertMaterial({
      color: 0xe9e9e9,
      wireframe: false,
    });
    var footLevelFive = new THREE.Mesh(footLevelFiveGeometry, blackComponentsMaterial);
    footLevelFive.position.y = 2.0;
    footLevelFive.castShadow = true;
    footingComponents.add(footLevelFive);

    footingComponents.position.set(x, y, z);
    Turntable.add(footingComponents);
  }

  foot(18.5, 0, 15.5);
  foot(-18.5, 0, 15.5);
  foot(18.5, 0, -15.5);
  foot(-18.5, 0, -15.5);

  /*
   ** liftLevelComponents
   */

  var toneArmBaseGeometry = new THREE.CylinderGeometry(4.8, 5, 1.5, 64, 1, false);
  var toneArmBase = new THREE.Mesh(toneArmBaseGeometry, blackComponentsMaterial);
  toneArmBase.position.x = 14.5;
  toneArmBase.position.y = 6.0;
  toneArmBase.position.z = -8.5;

  var liftLevelHoleGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.2);
  var liftLevelHoleMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: true });
  var liftLevelHole = new THREE.Mesh(liftLevelHoleGeometry, liftLevelHoleMaterial);
  liftLevelHole.position.set(16.3, 6.6, -5.6);
  liftLevelHole.rotation.y = 90 * DEG_TO_RAD;

  var toneArmBaseBSP = new ThreeBSP(toneArmBase);
  var liftLevelHoleBSP = new ThreeBSP(liftLevelHole);
  var subtractHoleBSP = toneArmBaseBSP.subtract(liftLevelHoleBSP);
  var toneArmBaseLiftLevel = subtractHoleBSP.toMesh(blackComponentsMaterial);
  toneArmBaseLiftLevel.geometry.computeFaceNormals();
  toneArmBaseLiftLevel.castShadow = true;
  toneArmBaseComponents.add(toneArmBaseLiftLevel);

  var liftLevelPipeGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 64, 1, false);
  var liftLevelPipe = new THREE.Mesh(liftLevelPipeGeometry, chromeComponentsMaterial);
  liftLevelPipe.position.set(16.3, 6.6, -6.0);
  liftLevelPipe.castShadow = true;
  liftLevelComponents.add(liftLevelPipe);

  var liftLevelShape = new THREE.Shape();
  liftLevelShape.moveTo(0, 0);
  liftLevelShape.lineTo(0, -0.4);
  liftLevelShape.lineTo(-0.2, -0.4);
  liftLevelShape.lineTo(-0.2, 0);
  liftLevelShape.lineTo(-0.7, 0.3);
  liftLevelShape.lineTo(-0.5, 0.3);
  liftLevelShape.lineTo(0, 0);

  var extrudeSettings = {
    depth: 0.3,
    bevelEnabled: false,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 1,
    bevelThickness: 1,
  };

  var liftLevelGeometry = new THREE.ExtrudeBufferGeometry(liftLevelShape, extrudeSettings);
  var liftLevel = new THREE.Mesh(liftLevelGeometry, blackComponentsMaterial);
  liftLevel.rotation.y = 90 * DEG_TO_RAD;
  liftLevel.position.set(16.15, 7.5, -6.1);
  liftLevel.castShadow = true;
  liftLevelComponents.add(liftLevel);

  liftLevelComponents.name = 'liftLevelComponent';

  Turntable.add(liftLevelComponents);

  // Animation
  liftLevelAnimation = new Animation(
    liftLevelComponents,
    AnimationType.TRANSLATION,
    AnimationAxis.Z,
  );
  liftLevelAnimation.setAmount(0.7); // 0.10
  liftLevelAnimation.setSpeed(1); // 15 * DEG_TO_RAD
  liftLevelComponents.userData = liftLevelAnimation;

  /*
   ** toneArmBaseComponents
   */

  // Tone arm second base
  var toneArmBaseSecondGeometry = new THREE.CylinderGeometry(2.0, 2, 1.6, 64, 1, false);
  var toneArmSecondBase = new THREE.Mesh(toneArmBaseSecondGeometry, blackComponentsMaterial);
  toneArmSecondBase.position.x = 14.5;
  toneArmSecondBase.position.y = 7.0;
  toneArmSecondBase.position.z = -8.5;
  toneArmSecondBase.castShadow = true;
  toneArmBaseComponents.add(toneArmSecondBase);

  var toneArmBaseBevelTopGeometry = new THREE.CylinderGeometry(1.9, 2.0, 0.1, 64, 1, false);
  var toneArmBaseBevelTop = new THREE.Mesh(toneArmBaseBevelTopGeometry, blackComponentsMaterial);
  toneArmBaseBevelTop.position.x = 14.5;
  toneArmBaseBevelTop.position.y = 7.85;
  toneArmBaseBevelTop.position.z = -8.5;
  toneArmBaseBevelTop.castShadow = true;
  toneArmBaseComponents.add(toneArmBaseBevelTop);

  // Tone arm third Base
  var toneArmThirdBaseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 64, 1, false);
  var toneArmThirdBase = new THREE.Mesh(toneArmThirdBaseGeometry, blackComponentsMaterial);
  toneArmThirdBase.position.x = 14.5;
  toneArmThirdBase.position.y = 7.7;
  toneArmThirdBase.position.z = -8.5;
  toneArmThirdBase.castShadow = true;
  toneArmBaseComponents.add(toneArmThirdBase);

  var toneArmThirdBaseBevelTopGeometry = new THREE.CylinderGeometry(1.4, 1.5, 0.1, 64, 1, false);
  var toneArmThirdBaseBevelTop = new THREE.Mesh(
    toneArmThirdBaseBevelTopGeometry,
    blackComponentsMaterial,
  );
  toneArmThirdBaseBevelTop.position.x = 14.5;
  toneArmThirdBaseBevelTop.position.y = 8.25;
  toneArmThirdBaseBevelTop.position.z = -8.5;
  toneArmThirdBaseBevelTop.castShadow = true;
  toneArmBaseComponents.add(toneArmThirdBaseBevelTop);

  // Tone arm axis
  var toneArmBaseAxisGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 64, 1, false);
  var toneArmBaseAxis = new THREE.Mesh(toneArmBaseAxisGeometry, chromeComponentsMaterial);
  toneArmBaseAxis.position.set(14.5, 8.5, -8.5);
  toneArmBaseAxis.castShadow = true;
  toneArmBaseComponents.add(toneArmBaseAxis);

  // Anti skating button
  var antiSkatingButtonGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.5, 32, 1, false);
  var antiSkatingButton = new THREE.Mesh(antiSkatingButtonGeometry, blackComponentsMaterial);
  antiSkatingButton.position.x = 18;
  antiSkatingButton.position.y = 7.0;
  antiSkatingButton.position.z = -8.5;
  antiSkatingButton.castShadow = true;
  toneArmBaseComponents.add(antiSkatingButton);

  // Tone arm basis arm rest
  var toneArmBasisBoxGeometry = new THREE.BoxGeometry(1.6, 2.2, 5.5);
  var toneArmBasisBox = new THREE.Mesh(toneArmBasisBoxGeometry, blackComponentsMaterial);
  toneArmBasisBox.position.set(14.5, 6.5, -4.5);
  toneArmBasisBox.castShadow = true;
  toneArmBaseComponents.add(toneArmBasisBox);

  var toneArmBasisCylinderGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2.2, 32, 1, false);
  var toneArmBasisCylinder = new THREE.Mesh(toneArmBasisCylinderGeometry, blackComponentsMaterial);
  toneArmBasisCylinder.position.set(14.5, 6.5, -1.75);
  toneArmBasisCylinder.castShadow = true;
  toneArmBaseComponents.add(toneArmBasisCylinder);

  var toneArmBasisCylinderTopGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32, 1, false);
  var toneArmBasisCylinderTop = new THREE.Mesh(
    toneArmBasisCylinderTopGeometry,
    blackComponentsMaterial,
  );
  toneArmBasisCylinderTop.position.set(14.5, 7.8, -1.75);
  toneArmBasisCylinderTop.castShadow = true;
  toneArmBaseComponents.add(toneArmBasisCylinderTop);

  var toneArmBasisChromePipeGeometry = new THREE.CylinderGeometry(0.25, 0.25, 2.5, 32, 1, false);
  var toneArmBasisChromePipe = new THREE.Mesh(
    toneArmBasisChromePipeGeometry,
    chromeComponentsMaterial,
  );
  toneArmBasisChromePipe.position.set(14.5, 7.5, -1.75);
  toneArmBasisChromePipe.castShadow = true;
  toneArmBaseComponents.add(toneArmBasisChromePipe);

  // Tone arm rest holding
  var toneArmRest = new THREE.Shape();
  toneArmRest.moveTo(0.5, 0);
  toneArmRest.lineTo(0.8, 0);
  toneArmRest.lineTo(0.8, -1.2);
  toneArmRest.lineTo(-0.4, -1.2);
  toneArmRest.lineTo(-0.4, -1.0);
  toneArmRest.lineTo(-0.3, -0.9);
  toneArmRest.lineTo(-0.3, -1.1);
  toneArmRest.lineTo(0.7, -1.1);
  toneArmRest.lineTo(0.7, -0.1);
  toneArmRest.lineTo(0.5, -0);

  var extrudeSettings = {
    depth: 0.5,
    bevelEnabled: false,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 1,
    bevelThickness: 1,
  };

  var toneArmRestGeometry = new THREE.ExtrudeBufferGeometry(toneArmRest, extrudeSettings);
  var toneArmRestMesh = new THREE.Mesh(toneArmRestGeometry, blackComponentsMaterial);
  toneArmRestMesh.position.set(14.25, 9.9, -2);
  toneArmRestMesh.castShadow = true;
  toneArmBaseComponents.add(toneArmRestMesh);

  Turntable.add(toneArmBaseComponents);

  /*
   ** toneArmComponents
   */

  var toneArmBaseBody = new THREE.Shape();
  toneArmBaseBody.moveTo(0, 0);
  toneArmBaseBody.lineTo(2.5, 0);
  toneArmBaseBody.lineTo(2.5, -0.2);
  toneArmBaseBody.lineTo(2.4, -0.2);
  toneArmBaseBody.lineTo(2.4, -0.3);
  toneArmBaseBody.lineTo(2.5, -0.3);
  toneArmBaseBody.lineTo(2.5, -1.1);
  toneArmBaseBody.lineTo(2.4, -1.1);
  toneArmBaseBody.lineTo(2.4, -1.2);
  toneArmBaseBody.lineTo(2.5, -1.2);
  toneArmBaseBody.lineTo(2.5, -1.5);
  toneArmBaseBody.lineTo(0, -1.5);
  toneArmBaseBody.lineTo(0, -1.2);
  toneArmBaseBody.lineTo(0.1, -1.2);
  toneArmBaseBody.lineTo(0.1, -1.1);
  toneArmBaseBody.lineTo(0.0, -1.1);
  toneArmBaseBody.lineTo(0.0, -0.3);
  toneArmBaseBody.lineTo(0.1, -0.3);
  toneArmBaseBody.lineTo(0.1, -0.2);
  toneArmBaseBody.lineTo(0.0, -0.2);
  toneArmBaseBody.lineTo(0, 0);

  var extrudeSettings = {
    depth: 2.0,
    bevelEnabled: false,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 1,
    bevelThickness: 1,
  };

  var toneArmBodyGeometry = new THREE.ExtrudeBufferGeometry(toneArmBaseBody, extrudeSettings);
  var toneArmBody = new THREE.Mesh(toneArmBodyGeometry, blackComponentsMaterial);
  toneArmBody.castShadow = true;
  toneArmComponents.add(toneArmBody);

  var toneArmBodyButtonGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.55, 32, 1, false);
  var toneArmBodyButton = new THREE.Mesh(toneArmBodyButtonGeometry, chromeComponentsMaterial);
  toneArmBodyButton.rotation.z = -90 * DEG_TO_RAD;
  toneArmBodyButton.castShadow = true;
  toneArmComponents.add(toneArmBodyButton);

  var toneArmGeometry = new THREE.CylinderGeometry(0.4, 0.4, 24, 32, 1, false);
  var toneArm = new THREE.Mesh(toneArmGeometry, blackComponentsMaterial);
  toneArm.rotation.x = 90 * DEG_TO_RAD;
  toneArm.castShadow = true;
  toneArmComponents.add(toneArm);

  var toneArmHeadCylinderGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 32, 1, false);
  var toneArmHeadCylinder = new THREE.Mesh(toneArmHeadCylinderGeometry, blackComponentsMaterial);
  toneArmHeadCylinder.rotation.x = 90 * DEG_TO_RAD;
  toneArmHeadCylinder.castShadow = true;
  toneArmComponents.add(toneArmHeadCylinder);

  var toneArmHeadKnobGeometry = new THREE.CylinderGeometry(0.65, 0.65, 0.4, 32, 1, false);
  var toneArmHeadKnob = new THREE.Mesh(toneArmHeadKnobGeometry, blackComponentsMaterial);
  toneArmHeadKnob.rotation.x = 90 * DEG_TO_RAD;
  toneArmHeadKnob.castShadow = true;
  toneArmComponents.add(toneArmHeadKnob);

  var toneArmHeadChromeRingGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32, 1, false);
  var toneArmHeadChromeRing = new THREE.Mesh(
    toneArmHeadChromeRingGeometry,
    chromeComponentsMaterial,
  );
  toneArmHeadChromeRing.rotation.x = 90 * DEG_TO_RAD;
  toneArmHeadChromeRing.castShadow = true;
  toneArmComponents.add(toneArmHeadChromeRing);

  var counterWeigthGeometry = new THREE.CylinderGeometry(1.3, 1.3, 2.3, 32, 1, false);
  var counterWeigth = new THREE.Mesh(counterWeigthGeometry, blackComponentsMaterial);
  counterWeigth.rotation.x = 90 * DEG_TO_RAD;
  counterWeigth.castShadow = true;
  toneArmComponents.add(counterWeigth);

  var counterWeigthBevelFrontGeometry = new THREE.CylinderGeometry(1.2, 1.3, 0.1, 32, 1, false);
  var counterWeigthBevelFront = new THREE.Mesh(
    counterWeigthBevelFrontGeometry,
    blackComponentsMaterial,
  );
  counterWeigthBevelFront.rotation.x = 90 * DEG_TO_RAD;
  counterWeigthBevelFront.castShadow = true;
  toneArmComponents.add(counterWeigthBevelFront);

  var counterWeigthBevelBackGeometry = new THREE.CylinderGeometry(1.2, 1.3, 0.1, 32, 1, false);
  var counterWeigthBevelBack = new THREE.Mesh(
    counterWeigthBevelBackGeometry,
    blackComponentsMaterial,
  );
  counterWeigthBevelBack.rotation.x = -90 * DEG_TO_RAD;
  counterWeigthBevelBack.castShadow = true;
  toneArmComponents.add(counterWeigthBevelBack);

  var counterRingGeometry = new THREE.CylinderGeometry(1.3, 1.3, 0.5, 32, 1, false);
  var counterRing = new THREE.Mesh(counterRingGeometry, blackComponentsMaterial);
  counterRing.rotation.x = -90 * DEG_TO_RAD;
  counterRing.castShadow = true;
  toneArmComponents.add(counterRing);

  var toneArmBasisPipeGeometry = new THREE.CylinderGeometry(0.6, 0.6, 5.0, 32, 1, false);
  var toneArmBasisPipe = new THREE.Mesh(toneArmBasisPipeGeometry, blackComponentsMaterial);
  toneArmBasisPipe.rotation.x = -90 * DEG_TO_RAD;
  toneArmBasisPipe.position.z = -8.0;

  var toneArmBoxCutGeometry = new THREE.BoxGeometry(3, 5, 2);
  var toneArmBoxCut = new THREE.Mesh(toneArmBoxCutGeometry, blackComponentsMaterial);
  toneArmBoxCut.rotation.x = -45 * DEG_TO_RAD;
  toneArmBoxCut.position.z = -5.0;

  // Tone arm base pipe BSP
  var toneArmBasisPipeBSP = new ThreeBSP(toneArmBasisPipe);
  var toneArmBoxCutBSP = new ThreeBSP(toneArmBoxCut);
  var subtractPipeBSP = toneArmBasisPipeBSP.subtract(toneArmBoxCutBSP);
  var pipe = subtractPipeBSP.toMesh(blackComponentsMaterial);
  pipe.geometry.computeFaceNormals();
  pipe.castShadow = true;
  toneArmComponents.add(pipe);

  // headShell
  var headShell = new THREE.Shape();
  headShell.moveTo(0, 0);
  headShell.lineTo(1.5, 0);
  headShell.lineTo(1.0, -3.8);
  headShell.lineTo(2.7, -4.8);
  headShell.lineTo(2.6, -5.0);
  headShell.lineTo(0.9, -4.1);
  headShell.lineTo(0.1, -5.7);
  headShell.lineTo(-1.8, -4.7);
  headShell.lineTo(-1.2, -3.5);
  headShell.lineTo(0, 0);

  var extrudeSettings = {
    depth: 0.2,
    bevelEnabled: false,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 1,
    bevelThickness: 1,
  };

  var headShellGeometry = new THREE.ExtrudeBufferGeometry(headShell, extrudeSettings);
  var headShellMesh = new THREE.Mesh(headShellGeometry, blackComponentsMaterial);
  headShellMesh.rotation.x = -90 * DEG_TO_RAD;
  headShellMesh.castShadow = true;
  toneArmComponents.add(headShellMesh);

  var headShellVerticalGeometry = new THREE.BoxGeometry(1.5, 0.1, 1.1);
  var headShellVertical = new THREE.Mesh(headShellVerticalGeometry, blackComponentsMaterial);
  headShellVertical.rotation.x = -90 * DEG_TO_RAD;
  headShellVertical.castShadow = true;
  toneArmComponents.add(headShellVertical);

  var cartridgeGeometry = new THREE.BoxGeometry(1, 0.6, 1); // 1.4, 0.8, 1
  var cartridge = new THREE.Mesh(cartridgeGeometry, blackComponentsMaterial);
  cartridge.rotation.y = -30 * DEG_TO_RAD;
  cartridge.castShadow = true;
  toneArmComponents.add(cartridge);

  var pinGeometry = new THREE.BoxGeometry(0.8, 0.6, 1);
  var pin = new THREE.Mesh(pinGeometry, chromeComponentsMaterial);
  pin.rotation.y = -30 * DEG_TO_RAD;
  pin.castShadow = true;
  toneArmComponents.add(pin);

  Turntable.add(toneArmComponents);
  toneArmComponents.name = 'toneArmComponent';
  toneArmComponents.position.set(14.5, 9.35, -8.5);

  // toneArm-Components and align relative positions of components
  toneArmBody.position.set(-1.2, 0.7, -1);
  toneArmBodyButton.position.set(0.05, 0, 0);
  toneArm.position.set(0, 0, 5);
  toneArmHeadCylinder.position.set(0, 0, 17.5);
  toneArmHeadKnob.position.set(0, 0, 17.4);
  toneArmHeadChromeRing.position.set(0, 0, 18.2);

  counterWeigth.position.set(0, 0, -5.8);
  counterWeigthBevelFront.position.set(0, 0, -4.6);
  counterWeigthBevelBack.position.set(0, 0, -7);
  counterRing.position.set(0, 0, -4.2);

  pipe.position.set(0, 0, 0.7);
  headShellMesh.position.set(-0.75, 0.4, 18.25); //-0.75, 0.4, 18.3
  headShellVertical.position.set(0, -0.1, 18.3);
  cartridge.position.set(-1, 0.1, 23.0); //-1, 0, 21.8
  pin.position.set(-1.05, -0.1, 23.1);

  // Helper
  var lineGeometry = new THREE.CylinderGeometry(0.025, 0.025, 24.0, 32, 1, false);
  var line = new THREE.Mesh(lineGeometry, blackComponentsMaterial);
  line.position.set(14.5, 9.95, -8.5);
  //scene.add( line );

  // Animation
  var tweens = {
    forward: false,
    forwardTween: new TWEEN.Tween(toneArmComponents.rotation)
      .to({ y: -40 * DEG_TO_RAD }, 1200)
      .easing(TWEEN.Easing.Quadratic.Out),
    backwardTween: new TWEEN.Tween(toneArmComponents.rotation)
      .to({ y: 0 }, 1200)
      .easing(TWEEN.Easing.Quadratic.Out),
  };
  toneArmComponents.userData = tweens;

  // Apply parent Object3D Turntable to scene

  scene.add(Turntable);
  Turntable.position.set(0, 19.7, 10);
  Turntable.rotation.y = 0 * DEG_TO_RAD;

  // Physics
  physics.addBox(Turntable, 45, 19.8, 37, 2.85);
  //physics.addBox( toneArmComponents, 10, 20, 1, 1 );

  // Set init states
  turntableState = {
    powerOn: false,
    speedOn: false,
    sliderOut: false,
    tonearmOut: false,
    tableRotating: false,
  };
}
