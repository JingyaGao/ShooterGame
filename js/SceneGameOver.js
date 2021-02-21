var highScore = [];
highScoreName = [];
var highscoreList;

class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }

  preload() {
    this.load.html('restart_form', 'html/endGame_form.html');
    //this.load.html('highscoreform', 'html/highScoreList.html');
  }

  create(data) {
    console.log(data);

  	this.add.image(0,0,"sprBg2").setOrigin(0,0);

  	this.title = this.add.text(this.game.config.width * 0.5, 228, "分数：" + data.score, {
	  fontFamily: 'helvetica',
	  fontSize: 48,
	  fontStyle: 'bold',
	  color: 'white',
	  align: 'center'
	  });
	  this.title.setOrigin(0.5);
    
    //updateHighScore(data.accessCode, data.score);

    //highscoreList = this.add.dom(this.game.config.width * 0.5, 500).createFromCache('highscoreform').setAlpha(0);
    //setUpHighScoreBoard();
    // var element = this.add.dom(this.game.config.width * 0.5, 300).createFromCache('restart_form')
    // element.setPerspective(800);

    // element.addListener('click');

    // element.on('click', function (event) {
    //     if (event.target.name === 'loginButton')
    //     {
    //       //window.location.replace('/index.html');
    //       this.scene.scene.start('SceneMain');
    //     } 
    // });

    //displayHighScore();

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprBtnRestart"
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on("pointerover", function() {
      this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
      // this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.btnRestart.on("pointerout", function() {
      this.setTexture("sprBtnRestart");
    });

    this.btnRestart.on("pointerdown", function() {
      this.btnRestart.setTexture("sprBtnRestartDown");
      // this.sfx.btnDown.play();
    }, this);

    this.btnRestart.on("pointerup", function() {
      this.btnRestart.setTexture("sprBtnRestart");
      this.scene.start("SceneMain");
    }, this);
  }

}

// function setUpHighScoreBoard() {
//     var nameId, scoreId;
//     for(var i = 0; i < 5; i++) {
//         nameId = "name" + (i+1);
//         scoreId = "score" + (i+1);
//         highScoreName[i] = document.getElementById(nameId)
//         highScore[i] = document.getElementById(scoreId);
//     }
// }

// function displayHighScore() {
//     $.ajax({
//       type: 'GET',
//       url: '/scores',
//       success: function(data) {
//         console.log(data);
//         for(var j = 0; j < 5; j++)  {
//             highScore[j].innerHTML = data[j].highScore;
//             highScoreName[j].innerHTML = data[j].name;
//         }
//         highscoreList.setAlpha(1);
        
//       },
//       error: function(xhr) {
//         console.log(xhr);
//       }
//     });
// }


// function updateHighScore(accessCode, score) {

//   var data = { accessCode: accessCode, score: score};
//     $.ajax({
//       type: 'POST',
//       url: '/submit-score',
//       data,
//       success: function(data) {
//         console.log(data);
//       },
//       error: function(xhr) {
//         console.log(xhr);
//       }
//     });
// }