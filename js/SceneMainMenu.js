class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
    this.title;
  }

  preload() {
  	this.load.html("nameform", "html/example_form2.html");
	this.load.image("sprBg2", "content/sprBg2.png");
 	this.load.image("sprBtnPlay", "content/sprBtnPlay.png");
	this.load.image("sprBtnPlayHover", "content/sprBtnPlayHover.png");
	this.load.image("sprBtnPlayDown", "content/sprBtnPlayDown.png");
	this.load.image("sprBtnRestart", "content/sprBtnRestart.png");
	this.load.image("sprBtnRestartHover", "content/sprBtnRestartHover.png");
	this.load.image("sprBtnRestartDown", "content/sprBtnRestartDown.png");
	this.load.image("whiteBackground", "content/whiteBackground.png");
	this.load.image("gameTitle", "content/gameMain.png");
	
	// this.load.audio("sndBtnOver", "content/sndBtnOver.wav");
	// this.load.audio("sndBtnDown", "content/sndBtnDown.wav");
  }

  create() {

  	this.add.image(0,0,"sprBg2").setOrigin(0,0);
 //    this.sfx = {
	//   btnOver: this.sound.add("sndBtnOver"),
	//   btnDown: this.sound.add("sndBtnDown")
	// };

	this.startButton();

	// this.title = this.add.text(this.game.config.width * 0.5, 228, "开始游戏", {
	//   fontFamily: 'helvetica',
	//   fontSize: 48,
	//   fontStyle: 'bold',
	//   color: 'white',
	//   align: 'center'
	// });

	// this.title.setOrigin(0.5);

	this.title = this.add.image(this.game.config.width * 0.5, 250, "gameTitle");
  }


  startButton() {
	  	this.btnPlay = this.add.sprite(
		  this.game.config.width * 0.5,
		  this.game.config.height * 0.7,
		  "sprBtnPlay"
		);

		this.btnPlay.setInteractive();

		this.btnPlay.on("pointerover", function() {
		  this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
		  // this.sfx.btnOver.play(); // play the button over sound
		}, this);

		this.btnPlay.on("pointerout", function() {
		  this.setTexture("sprBtnPlay");
		});

		this.btnPlay.on("pointerdown", function() {
		  this.btnPlay.setTexture("sprBtnPlayDown");
		  // this.sfx.btnDown.play();
		}, this);

		this.btnPlay.on("pointerup", function() {
		  this.btnPlay.setTexture("sprBtnPlay");
		  //this.scene.start("SceneMain");
		  this.scene.transition({target:'SceneMain', duration:500});
		}, this);

  }
}