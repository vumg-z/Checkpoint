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
  const smallDeviceScale = 0.4; // Smaller scale for clouds on small devices
  const spacingMultiplier = 1.5; // Increase to spread clouds out more on small devices

  for (let i = 0; i < 100; i++) {
    const texture = PIXI.Texture.from("./assets/Clouds_1.png");
    const cloud = new PIXI.Sprite(texture);
    // Set initial position and scale
    cloud.y = Math.random() * renderer.screen.height;
    cloud.anchor.x = 0.5;
    cloud.anchor.y = 0.5;
    stage.addChild(cloud);

    let percent = .05; // Initial movement speed

    ticker.add(() => {
      // Dynamically check window width each frame and adjust scale
      const currentWidth = window.innerWidth; // Use window.innerWidth to get current width
      let scale = currentWidth <= 600 ? 0.8 : 1.8; // Adjust scale based on current width
      cloud.scale.set(scale, scale); // Apply scale

      cloud.x -= 1;

      // Debug message to monitor currentWidth and scale
      updateDebugMessage(`Screen Width: ${currentWidth}, Cloud Scale: ${scale}`);

      if (cloud.x <= -(renderer.width * 0.05)) {
        cloud.x = renderer.width + (renderer.width * 0.05);
        cloud.y = Math.random() * renderer.height;
      }
    });
  }

  const animate = () => {
    renderer.render(stage);
  };

  ticker.add(animate);
  ticker.start();

  console.log("si")
});
