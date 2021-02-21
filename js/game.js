var screenRatio = 480 / 640;
var dpi_w = window.innerHeight * screenRatio / 480;
var dpi_h = window.innerHeight / 640;
var canvas_height = window.innerHeight * (dpi_w / dpi_h);
var canvas_width = canvas_height * screenRatio;

var config = {
  type: Phaser.AUTO,
  width: 480, //canvas_width, //window.innerWidth * window.devicePixelRatio,
  height: 700, //canvas_height,//window.innerHeight * window.devicePixelRatio,
  backgroundColor: "white",
  transparent: true,
  parent: 'phaser-example',
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
  },
  dom: { createContainer: true },
  scene: [
    // {preload: preload,
    //  create: create},
  	SceneMainMenu,
    SceneMain,
    SceneGameOver,
    SceneFallingSpaceShip,
    SceneVisualNovel
    ],
  pixelArt: true,
  roundPixels: true
};

var element;
var game = new Phaser.Game(config);