const canvas = document.getElementById("canvas");

let _w = window.innerWidth;
let _h = window.innerHeight;

const renderer = new PIXI.Renderer({
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x0498dc,
  resolution: window.devicePixelRatio,
  autoDensity: true
});

const resize = () => {
  _w = window.innerWidth;
  _h = window.innerHeight;
  renderer.resize(_w, _h);
};

window.addEventListener("resize", resize);

const stage = new PIXI.Container();

const loader = PIXI.Loader.shared;

loader.add("cloud", "/assets/Clouds_1.png");

// Css style for icons
const defaultIcon = "url('assets/ufo.png'),auto";
// Add custom cursor styles
renderer.plugins.interaction.cursorStyles.default = defaultIcon;

// Function to update debug messages
function updateDebugMessage(message) {
  const debugElement = document.getElementById("debugMessage");
  if (debugElement) {
    debugElement.innerHTML = message;
  }
}

loader.load((loader, resources) => {
  // Initial debug message
  updateDebugMessage("Initializing...");

  const ticker = new PIXI.Ticker();

  // Adjust these values to change cloud density and scale on smaller screens
  const smallDeviceWidth = 600; // Consider screens smaller than this width as small devices
  const smallDeviceScale = 1; // Corrected to match the comment
  const largeDeviceScale = 1.8; // Scale for clouds on larger devices
  const spacingMultiplier = 1.5; // Increase to spread clouds out more on small devices

  for (let i = 0; i < 100; i++) {

    const texture = PIXI.Texture.from("./assets/Clouds_1.png");
    const cloud = new PIXI.Sprite(texture);
    // Spread clouds out initially across the X-axis
    cloud.x = Math.random() * renderer.screen.width; // This ensures clouds start at random X positions
    cloud.y = Math.random() * renderer.screen.height;
    cloud.anchor.x = 0.5;
    cloud.anchor.y = 0.5;
    stage.addChild(cloud);


    ticker.add(() => {
      // Dynamically check window width each frame and adjust scale
      const currentWidth = window.innerWidth; // Use window.innerWidth to get current width
      let scale = currentWidth <= smallDeviceWidth ? smallDeviceScale : largeDeviceScale; // Adjust scale based on current width
      cloud.scale.set(scale, scale); // Apply scale

      cloud.x -= 1;

      // Debug message to monitor currentWidth and scale
      updateDebugMessage(`Screen Width: ${currentWidth}, Cloud Scale: ${scale}`);

      if (cloud.x <= -(renderer.width * 0.1)) {
        // Slightly offset the cloud to the right of the screen without adding too much distance
        cloud.x = renderer.width + (cloud.width * 0.1);
        // Optionally, adjust the y position for variety
        cloud.y = Math.random() * renderer.screen.height;
      }
    });
  }

  const animate = () => {
    renderer.render(stage);
  };

  ticker.add(animate);
  ticker.start();
});
