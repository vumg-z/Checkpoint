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
  // Clear the existing clouds and recreate them based on new screen size
  recreateClouds();
};

window.addEventListener("resize", resize);

const stage = new PIXI.Container();

const loader = PIXI.Loader.shared;

loader.add("cloud", "/assets/Clouds_1.png");

// Css style for icons
const defaultIcon = "url('assets/ufo.png'),auto";
// Add custom cursor styles
renderer.plugins.interaction.cursorStyles.default = defaultIcon;

const clouds = []; // Array to hold cloud sprites

// Function to determine the number of clouds based on screen size
function determineCloudCount() {
  if (_w < 600) { // Considered as mobile
    return 50;
  } else if (_w >= 600 && _w < 1200) { // Considered as mid-sized screen
    return 100;
  } else { // Larger screens
    return 160;
  }
}

// Function to create clouds
function createClouds() {
  const cloudCount = determineCloudCount();
  for (let i = 0; i < cloudCount; i++) {
    const cloud = new PIXI.Sprite(PIXI.Texture.from("./assets/Clouds_1.png"));
    cloud.x = Math.random() * _w;
    cloud.y = Math.random() * _h;
    cloud.anchor.set(0.5);
    stage.addChild(cloud);
    clouds.push(cloud);
  }
}

// Function to clear existing clouds and recreate them
function recreateClouds() {
  // Clear existing clouds
  clouds.forEach(cloud => {
    stage.removeChild(cloud);
  });
  clouds.length = 0; // Empty the array

  // Create new clouds based on current screen size
  createClouds();
}

const ticker = new PIXI.Ticker();

ticker.add(() => {
  clouds.forEach(cloud => {
    cloud.x -= 1;
    if (cloud.x <= -cloud.width) {
      cloud.x = _w + Math.random() * 100;
      cloud.y = Math.random() * _h;
    }
  });
});

const animate = () => {
  renderer.render(stage);
};

ticker.add(animate);
ticker.start();

// Initial creation of clouds
loader.load((loader, resources) => {
  createClouds();
});
