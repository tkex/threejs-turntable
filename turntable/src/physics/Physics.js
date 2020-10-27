Physics = function () {
  // Private members
  var world = new CANNON.World();
  var stepSize = 0;
  var timeToGo = 0;
  var visualObjects = [];
  var physicalBodies = [];

  // Private methods
  var addPair = function (visualObject, body) {
    visualObjects.push(visualObject);
    physicalBodies.push(body);
  };

  // Public methods
  this.initialize = function (gravityX, gravityY, gravityZ, stepsize, addfloor) {
    world.gravity.set(gravityX, gravityY, gravityZ);
    world.broadphase = new CANNON.NaiveBroadphase();
    stepSize = stepsize;

    if (addfloor) {
      var floor = new CANNON.Body({
        shape: new CANNON.Plane(),
        mass: 0,
      });
      floor.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
      world.addBody(floor);
    }
  };

  this.update = function (delta) {
    // Step physics world forward
    timeToGo += delta;
    while (timeToGo >= stepSize) {
      world.step(stepSize);
      timeToGo -= stepSize;
    }
    // Copy transformations
    for (var i = 0; i < visualObjects.length; i++) {
      visualObjects[i].position.copy(physicalBodies[i].position);
      visualObjects[i].quaternion.copy(physicalBodies[i].quaternion);
    }
  };

  this.addBox = function (visualObject, dimX, dimY, dimZ, weight) {
    var body = new CANNON.Body({
      shape: new CANNON.Box(new CANNON.Vec3(dimX / 2, dimY / 2, dimZ / 2)),
      mass: weight,
    });
    body.position.copy(visualObject.position);
    body.quaternion.copy(visualObject.quaternion);
    world.addBody(body);
    addPair(visualObject, body);
  };

  this.addSphere = function (visualObject, radius, weight, velocityVector) {
    var body = new CANNON.Body({
      shape: new CANNON.Sphere(radius),
      mass: weight,
    });
    body.position.copy(visualObject.position);
    body.quaternion.copy(visualObject.quaternion);
    body.velocity.set(velocityVector.x, velocityVector.y, velocityVector.z);
    world.addBody(body);
    addPair(visualObject, body);
  };
};
