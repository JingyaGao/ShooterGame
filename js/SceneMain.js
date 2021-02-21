class SceneMain extends Phaser.Scene {
	constructor() {
		var config = { key: "SceneMain" };
		super({ key: "SceneMain" });
		this.score = 0;
		this.scoreText;
		this.enemyBoss;
		//this.accessCode;
	}

	preload() {
		this.load.image("sprBg2", "content/sprBg2.png");
		this.load.image("whiteBackground", "content/whiteBackground.png");
		this.load.spritesheet("sprExplosion", "content/sprExplosion.png", {
			frameWidth: 32,
			frameHeight: 32
		});
		this.load.spritesheet("sprEnemy0", "content/sprEnemy0.png", {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.image("sprEnemy1", "content/sprEnemy1.png");
		this.load.spritesheet("sprEnemy2", "content/sprEnemy2.png", {
			frameWidth: 16,
			frameHeight: 16
		});
		this.load.image("sprLaserEnemy0", "content/sprLaserEnemy0.png");
		this.load.image("sprLaserPlayer", "content/sprLaserPlayer.png");
		this.load.spritesheet("sprPlayer", "content/sprPlayer.png", {
			frameWidth: 16,
			frameHeight: 16
		});

		this.load.image("cat", "content/pink_cat.png");
		this.load.image("main_spaceship", "content/main_spaceship.png");

		this.load.spritesheet("mainExplosion", "content/Explosion.png", {
			frameWidth: 288,
			frameHeight: 288
		});


	// this.load.audio("sndExplode0", "content/sndExplode0.wav");
	// this.load.audio("sndExplode1", "content/sndExplode1.wav");
	// this.load.audio("sndLaser", "content/sndLaser.wav");
}

create() {
	this.cameras.main.setBackgroundColor('#000000')
	this.add.image(0,0,"sprBg2").setOrigin(0,0);
	//const whiteBackground = this.add.image(0,0,"whiteBackground").setAlpha(0);
	const whiteBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2,"whiteBackground").setAlpha(0);
    let scaleX = this.cameras.main.width / whiteBackground.width;
    let scaleY = this.cameras.main.height / whiteBackground.height;
    let scale = Math.max(scaleX, scaleY)
    whiteBackground.setScale(scale).setScrollFactor(0);
    whiteBackground.setDepth(10);

    var cookie1 = document.cookie;
    console.log(cookie1);

    //this.accessCode = sessionStorage.getItem('accessCode');
    //console.log(username);

	this.score = 0;
	this.scoreText = this.add.text(16, 16, 'Score: 0', { fontFamily: 'helvetica', fontSize: '30px', fontStyle: 'bold', fill: '#fff' });
	//this.userText = this.add.text(16, 50, '订单号: ' + this.accessCode, { fontFamily: 'helvetica', fontSize: '30px', fontStyle: 'bold', fill: '#fff' });
	this.enemyBoss = undefined;

	this.anims.create({
		key: "sprEnemy0",
		frames: this.anims.generateFrameNumbers("sprEnemy0"),
		frameRate: 20,
		repeat: -1
	});

	this.anims.create({
		key: "sprEnemy2",
		frames: this.anims.generateFrameNumbers("sprEnemy2"),
		frameRate: 20,
		repeat: -1
	});

	this.anims.create({
		key: "sprExplosion",
		frames: this.anims.generateFrameNumbers("sprExplosion"),
		frameRate: 20,
		repeat: 0
	});

	this.anims.create({
		key: "sprPlayer",
		frames: this.anims.generateFrameNumbers("sprPlayer"),
		frameRate: 20,
		repeat: -1
	});

	this.anims.create({
		key: "mainExplosion",
		frames: this.anims.generateFrameNumbers("mainExplosion"),
		frameRate: 6,
		repeat: -1
	});

 //    this.sfx = {
	//   explosions: [
	//     this.sound.add("sndExplode0"),
	//     this.sound.add("sndExplode1")
	//   ],
	//   laser: this.sound.add("sndLaser")
	// };

	// this.backgrounds = [];
	// for (var i = 0; i < 3; i++) { // create five scrolling backgrounds
	//   var keys = ["sprBg5"];
	//   var key = keys[Phaser.Math.Between(0, keys.length - 1)];
	//   var bg = new ScrollingBackground(this, key, i * 10);
	//   this.backgrounds.push(bg);
	// }


	this.player = new Player(
		this,
		this.game.config.width * 0.5,
		this.game.config.height * 0.5,
		"main_spaceship"
		); 

	this.player.displayWidth=game.config.width*.2; 
	this.player.scaleY=this.player.scaleX;

	this.player.setInteractive();
	this.input.setDraggable(this.player);
	this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
		gameObject.x = dragX;
		gameObject.y = dragY;
	});

	this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

	// set up enemy groups
	this.enemies = this.add.group();
	this.enemyLasers = this.add.group();
	this.playerLasers = this.add.group();

	this.time.addEvent({
		delay: 1000,
		callback: function() {
			var enemy = null;

			if (Phaser.Math.Between(0, 10) >= 3) {
				enemy = new GunShip(
					this,
					Phaser.Math.Between(0, this.game.config.width),
					0
					);
			}
			else if (Phaser.Math.Between(0, 10) >= 5) {
				if (this.getEnemiesByType("ChaserShip").length < 5) {

					enemy = new ChaserShip(
						this,
						Phaser.Math.Between(0, this.game.config.width),
						0
						);
				}
			}
			else {
				enemy = new CarrierShip(
					this,
					Phaser.Math.Between(0, this.game.config.width),
					0
					);
			}

			if (enemy !== null) {
				enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
				this.enemies.add(enemy);
			}

		},
		callbackScope: this,
		loop: true
	});

	// collisions
	this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
		if (enemy) {
			if (enemy.onDestroy !== undefined) {
				enemy.onDestroy();
			}

			enemy.explode(true);
			playerLaser.destroy();
			this.updateScore();
		}
	}, null, this);	

	this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
		if (!player.getData("isDead") &&
			!enemy.getData("isDead")) {
			player.explode(false);
			enemy.explode(true);
			var tween = player.scene.tweens.add({
					targets: whiteBackground,
					duration: 2500,
					alpha: 1, 
					onComplete: function(tween, targets) {
						player.onDestroy();
					}
			});
			//player.onDestroy();
		}
	});

	this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
		if (!player.getData("isDead") &&
			!laser.getData("isDead")) {
			player.explode(false);
		//this.cameras.main.fade(2000, 0, 0, 0);
		player.onDestroy();
		laser.destroy();
		}
	});
}

update() {
	this.player.update();

	if (!this.player.getData("isDead")) {
		if (this.keyW.isDown) {
			this.player.moveUp();
		}
		else if (this.keyS.isDown) {
			this.player.moveDown();
		}

		if (this.keyA.isDown) {
			this.player.moveLeft();
		}
		else if (this.keyD.isDown) {
			this.player.moveRight();
		}

		if (this.keySpace.isDown) {
			this.player.setData("isShooting", true);
		}
		else {
			this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
			this.player.setData("isShooting", false);
		}

	}

	if(this.score >= 17 && this.enemyBoss == undefined) {
		this.enemyBoss = new EnemyShipBoss(
			this, 
			this.game.config.width * 0.5,
			0,
			"sprEnemy2"
			);
		this.enemyBoss.displayWidth=game.config.width*.5;
		this.enemyBoss.scaleY = this.enemyBoss.scaleX;
	}

	for (var i = 0; i < this.enemies.getChildren().length; i++) {
		var enemy = this.enemies.getChildren()[i];

		enemy.update();

		if (enemy.x < -enemy.displayWidth ||
			enemy.x > this.game.config.width + enemy.displayWidth ||
			enemy.y < -enemy.displayHeight * 4 ||
			enemy.y > this.game.config.height + enemy.displayHeight) {

			if (enemy) {
				if (enemy.onDestroy !== undefined) {
					enemy.onDestroy();
				}
				enemy.destroy();
			}

		}
	}

    //frustum culling
    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
    	var laser = this.enemyLasers.getChildren()[i];
    	laser.update();

    	if (laser.x < -laser.displayWidth ||
    		laser.x > this.game.config.width + laser.displayWidth ||
    		laser.y < -laser.displayHeight * 4 ||
    		laser.y > this.game.config.height + laser.displayHeight) {
    		if (laser) {
    			laser.destroy();
    		}
    	}
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
    	var laser = this.playerLasers.getChildren()[i];
    	laser.update();

    	if (laser.x < -laser.displayWidth ||
    		laser.x > this.game.config.width + laser.displayWidth ||
    		laser.y < -laser.displayHeight * 4 ||
    		laser.y > this.game.config.height + laser.displayHeight) {
    		if (laser) {
    			laser.destroy();
    		}
    	}
    }

    // // background warping
    // for (var i = 0; i < this.backgrounds.length; i++) {
    //   this.backgrounds[i].update();
    // }
}

getEnemiesByType(type) {
	var arr = [];
	for (var i = 0; i < this.enemies.getChildren().length; i++) {
		var enemy = this.enemies.getChildren()[i];
		if (enemy.getData("type") == type) {
			arr.push(enemy);
		}
	}
	return arr;
}

updateScore() {
	this.score += 1;
	this.scoreText.setText('Score: ' + this.score);
}
}