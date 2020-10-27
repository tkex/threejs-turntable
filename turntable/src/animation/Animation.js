AnimationType = {
  TRANSLATION: 0,
  ROTATION: 1,
};

AnimationAxis = {
  X: 0,
  Y: 1,
  Z: 2,
};

Animation = function (target, type, axis) {
  // Private members
  var animationTarget = target;
  var animationType = type;
  var animationAxis = axis;
  var animationAmount = 0;
  var animationSpeed = 0;
  var initialPositionIsEndPosition = true;

  var initialPosition = animationTarget.position.clone();
  var initialRotation = animationTarget.rotation.toVector3().clone();

  // Public methods
  this.setAmount = function (amount) {
    animationAmount = amount;
  };

  this.setSpeed = function (speed) {
    animationSpeed = speed;
  };

  this.toggleAnimationEndPosition = function () {
    initialPositionIsEndPosition = !initialPositionIsEndPosition;
  };

  this.update = function (delta) {
    var endPositionValue = 0;

    // Assume the initial position to be the end position
    switch (animationType) {
      case AnimationType.TRANSLATION:
        endPositionValue = initialPosition.getComponent(animationAxis);
        break;
      case AnimationType.ROTATION:
        endPositionValue = initialRotation.getComponent(animationAxis);
        break;
    }

    // If the initial position is NOT the end position, add the animation amount
    if (!initialPositionIsEndPosition) endPositionValue += animationAmount;

    // Move as required
    switch (animationType) {
      case AnimationType.TRANSLATION:
        var newTranslation = 0;

        if (
          Math.abs(animationTarget.position.getComponent(animationAxis) - endPositionValue) < 0.01
        ) {
          animationTarget.position.setComponent(animationAxis, endPositionValue);
        } else {
          if (animationTarget.position.getComponent(animationAxis) < endPositionValue) {
            newTranslation =
              animationTarget.position.getComponent(animationAxis) + animationSpeed * delta;
          } else {
            newTranslation =
              animationTarget.position.getComponent(animationAxis) - animationSpeed * delta;
          }
          animationTarget.position.setComponent(animationAxis, newTranslation);
        }
        break;

      case AnimationType.ROTATION:
        var newRotation = initialRotation.clone();

        if (
          Math.abs(
            animationTarget.rotation.toVector3().getComponent(animationAxis) - endPositionValue,
          ) < 0.01
        ) {
          newRotation.setComponent(animationAxis, endPositionValue);
          animationTarget.rotation.setFromVector3(newRotation);
        } else {
          if (animationTarget.rotation.toVector3().getComponent(animationAxis) < endPositionValue) {
            newRotation.setComponent(
              animationAxis,
              animationTarget.rotation.toVector3().getComponent(animationAxis) +
                animationSpeed * delta,
            );
          } else {
            newRotation.setComponent(
              animationAxis,
              animationTarget.rotation.toVector3().getComponent(animationAxis) -
                animationSpeed * delta,
            );
          }
          animationTarget.rotation.setFromVector3(newRotation);
        }
        break;
    }
  };
};
