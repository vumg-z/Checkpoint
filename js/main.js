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

    // Adjust position and scale based on screen width
    if (renderer.width <= smallDeviceWidth) {
      cloud.scale.x = smallDeviceScale;
      cloud.scale.y = smallDeviceScale;
      cloud.x = Math.random() * renderer.screen.width * spacingMultiplier;
    } else {
      cloud.scale.x = 1.8;
      cloud.scale.y = 1.8;
      cloud.x = Math.random() * renderer.screen.width;
    }

    cloud.y = Math.random() * renderer.screen.height;
    cloud.anchor.x = 0.5;
    cloud.anchor.y = 0.5;
    stage.addChild(cloud);

    let percent = .05; // Initial movement speed

    ticker.add(() => {
      cloud.x -= 1; // Move clouds to the left

      // Adjust cloud position and scale on resize
      if (renderer.width <= smallDeviceWidth) {
        percent = .2; // Increase movement speed
        cloud.scale.x = smallDeviceScale;
        cloud.scale.y = smallDeviceScale;
      } else {
        cloud.scale.x = 1.8;
        cloud.scale.y = 1.8;
      }

      // Reset cloud position when it moves off screen
      if (cloud.x <= -(renderer.width * percent)) {
        cloud.x = renderer.width + (renderer.width * percent);
        cloud.y = Math.random() * renderer.height;
      }

      updateDebugMessage(`Screen Width: ${_w}, Screen Height: ${_h}, Cloud Scale: ${cloud.scale.x}, Cloud Y Position: ${cloud.y}`);

    });
  }

  const animate = () => {
    renderer.render(stage);
  };

  ticker.add(animate);
  ticker.start();

  console.log("si")
});
