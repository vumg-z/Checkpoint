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

  for (let i = 0; i < 100; i++) {
    const texture = PIXI.Texture.from("./assets/Clouds_1.png");
    const cloud = new PIXI.Sprite(texture);
    cloud.x = Math.random() * renderer.screen.width;
    cloud.y = Math.random() * renderer.screen.height;
    cloud.scale.x = 1.8;
    cloud.scale.y = 1.8;
    cloud.anchor.x = 0.5;
    cloud.anchor.y = 0.5;
    stage.addChild(cloud);

    let percent = .05;

    ticker.add(() => {
      cloud.x -= 1;

      if(renderer.width <= 600){
        percent = .2;
        cloud.scale.x = 1;
        cloud.scale.y = 1;
      } 
        
      if (cloud.x <= - (renderer.width * percent)) {
        cloud.x = renderer.width + (renderer.width * percent);
        cloud.y = Math.random() * renderer.height;
        console.log("si")
      }
    });
  }

  const animate = () => {
    renderer.render(stage);
  };

  ticker.add(animate);
  ticker.start();
});
