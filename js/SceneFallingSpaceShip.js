class SceneFallingSpaceShip extends Phaser.Scene {
  constructor() {
    super({ key: "SceneFallingSpaceShip" });
  }

  preload() {
    this.load.image("sprBg0", "content/sprBg0.png");
  }

  create() {
    const whiteBackground = this.add.image(480,680,"sprBg0").setAlpha(0);

    this.tweens.add({
      targets: whiteBackground,
      duration: 500,
      alpha: 1
    });

  	this.title = this.add.text(this.game.config.width * 0.5, 128, "飞船被击落\n\n你来到了一个未知的星球……", {
	  fontFamily: 'monospace',
	  fontSize: 30,
    padding: {top: 10, buttom: 10},
	  color: '#ffffff',
	  align: 'center'
	});

	this.title.setOrigin(0.5);

  this.time.addEvent({ // go to game over scene
      delay: 1000,
      callback: function() {
        this.text = this.add.text(this.game.config.width * 0.5, 500, "（转下一章）", {
        fontFamily: 'monospace',
        fontSize: 30,
        color: '#ffffff',
        align: 'center'
      });

      this.text.setOrigin(0.5);
        
      },
      callbackScope: this,
      loop: false
    });

	// this.btnRestart = this.add.sprite(
 //      this.game.config.width * 0.5,
 //      this.game.config.height * 0.5,
 //      "sprBtnRestart"
 //    );

 //    this.btnRestart.setInteractive();

 //    this.btnRestart.on("pointerover", function() {
 //      this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
 //      // this.sfx.btnOver.play(); // play the button over sound
 //    }, this);

 //    this.btnRestart.on("pointerout", function() {
 //      this.setTexture("sprBtnRestart");
 //    });

 //    this.btnRestart.on("pointerdown", function() {
 //      this.btnRestart.setTexture("sprBtnRestartDown");
 //      // this.sfx.btnDown.play();
 //    }, this);

 //    this.btnRestart.on("pointerup", function() {
 //      this.btnRestart.setTexture("sprBtnRestart");
 //      this.scene.start("SceneMain");
 //    }, this);


    this.backgrounds = [];
	for (var i = 0; i < 5; i++) {
	  var keys = ["sprBg0", "sprBg1"];
	  var key = keys[Phaser.Math.Between(0, keys.length - 1)];
	  var bg = new ScrollingBackground(this, key, i * 10);
	  this.backgrounds.push(bg);
	}
  }

  
  update() {
  	for (var i = 0; i < this.backgrounds.length; i++) {
	  this.backgrounds[i].update();
	}
  }
}