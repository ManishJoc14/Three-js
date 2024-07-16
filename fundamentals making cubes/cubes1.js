import * as THREE from "three";

function main() {
  const canvas = document.querySelector("#c");

  // Create a WebGL renderer with antialiasing
  // This renderer handles drawing the 3D scene on the canvas
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  // Set up a perspective camera
  // PerspectiveCamera mimics the way the human eye sees
    const fov = 90; // Field of view - how wide the view is
    const aspect = 2; // Aspect ratio - ratio of canvas width to height
    const near = 0.1; // Near clipping plane - objects closer won't be rendered
    const far = 5; // Far clipping plane - objects farther won't be rendered
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2; // Move the camera back to view the scene

  // Create a scene
  // A Scene is where you place objects, lights, and cameras
  const scene = new THREE.Scene();

  // Add directional light to the scene
  // Directional light mimics sunlight, providing uniform light from a direction
  {
    const color = 0xffffff; // Light color - white light
    const intensity = 3; // Light intensity - how strong the light is
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 3, 6); // Position the light in the scene
    scene.add(light); // Add the light to the scene
  }

  // Define box dimensions
  // These dimensions will be used to create a box geometry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  // Create box geometry
  // BoxGeometry defines the shape and size of the box
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Function to create a cube instance
  // This function makes a mesh (a drawable object) from the geometry and material
  function makeInstance(geometry, color, x) {
    // Use Phong material for lighting effects
    // MeshPhongMaterial responds to lights, making the object appear 3D
    const material = new THREE.MeshPhongMaterial({ color });

    // Create a mesh from geometry and material
    // Mesh is an object that can be added to the scene and rendered
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube); // Add the cube to the scene
    cube.position.x = x; // Position the cube along the x-axis

    return cube;
  }

  // Create an array of cubes
  // This creates three cubes with different colors and positions
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0), // Cube 1
    makeInstance(geometry, 0x8844aa, -2), // Cube 2
    makeInstance(geometry, 0xaa8844, 2), // Cube 3
  ];

  // Render function to animate the scene
  // This function will be called repeatedly to update the scene
  function render(time) {
    time *= 0.001; // Convert milliseconds to seconds for smoother animation

    // Rotate each cube
    // This loop rotates each cube over time to create animation
    cubes.forEach((cube, index) => {
      const speed = 1 + index * 0.1; // Rotation speed varies for each cube
      const rot = time * speed; // Calculate the rotation angle

      cube.rotation.x = rot; // Rotate cube around the x-axis
      cube.rotation.y = rot; // Rotate cube around the y-axis
    });

    // Render the scene with the camera
    // This draws the scene from the perspective of the camera
    renderer.render(scene, camera);

    // Loop the render function
    // requestAnimationFrame ensures smooth animation by calling render again
    requestAnimationFrame(render);
  }

  // Start the render loop
  // Begin the animation by calling the render function
  requestAnimationFrame(render);
}

main();
