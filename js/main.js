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

loader.load((loader, resources) => {
  const ticker = new PIXI.Ticker();
  const clouds = []; // Array to hold cloud sprites

  // Create 100 cloud sprites
  for (let i = 0; i < 100; i++) {
    const cloud = new PIXI.Sprite(PIXI.Texture.from("./assets/Clouds_1.png"));
    cloud.x = Math.random() * _w; // Randomize initial X position across the screen width
    cloud.y = Math.random() * _h; // Randomize initial Y position across the screen height
    cloud.anchor.set(0.5);
    stage.addChild(cloud);
    clouds.push(cloud);
  }

  ticker.add(() => {
    clouds.forEach(cloud => {
      cloud.x -= 1; // Move each cloud to the left

      // When the cloud moves completely off the left side of the screen
      if (cloud.x <= -cloud.width) {
        // Reposition it just outside the right edge of the screen
        cloud.x = _w + Math.random() * 100; // Add some randomness to when they reappear
        cloud.y = Math.random() * _h; // Randomize Y position when repositioning
      }
    });
  });

  const animate = () => {
    renderer.render(stage);
  };

  ticker.add(animate);
  ticker.start();
});
