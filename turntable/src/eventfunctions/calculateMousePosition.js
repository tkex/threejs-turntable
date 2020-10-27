mousePosition = new THREE.Vector2();

function calculateMousePosition(event) {
  mousePosition.x = 2 * (event.clientX / window.innerWidth) - 1;
  mousePosition.y = -2 * (event.clientY / window.innerHeight) + 1;
}
