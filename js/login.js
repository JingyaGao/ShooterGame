var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 700,
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    scene: //[
        {preload: preload, 
         create: create}
        //PreloadScene 
        //]

};

var title, scores, user;
var highScore = [];
highScoreName = [];
var highscoreList;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.html('nameform', 'html/example_form2.html');
    this.load.html('highscoreform', 'html/highScoreList.html');
    //this.load.image('pic', 'assets/pics/turkey-1985086.jpg');
}

function create ()
{
    //this.add.image(400, 300, 'pic');

    //var text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

    title = this.add.text(this.game.config.width * 0.5, 100, "开始游戏", {
          fontFamily: 'helvetica',
          fontSize: 48,
          fontStyle: 'bold',
          color: 'white',
          align: 'center'
        });
    title.setOrigin(0.5);
    var element = this.add.dom(this.game.config.width * 0.5, 300).createFromCache('nameform');
    highscoreList = this.add.dom(this.game.config.width * 0.5, 500).createFromCache('highscoreform').setAlpha(0);
    setUpHighScoreBoard();

    element.setPerspective(800);

    element.addListener('click');

    element.on('click', function (event) {
        if (event.target.name === 'loginButton')
        {
            var inputUsername = this.getChildByName('username');
            //var inputPassword = this.getChildByName('password');

            //  Have they entered anything?
            if (inputUsername.value !== '')
            {
                //  Turn off the click events
                this.removeListener('click');
                signIn(inputUsername.value);
                this.addListener('click');
                //this.scene.scene.transition({target:'PreloadScene', duration:500});
            }
            else
            {
                title.setText("请输入订单号后8位数");
                //  Flash the prompt
                this.scene.tweens.add({ targets: title, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
            }
        } else if  (event.target.name === 'highScoreButton') {
            // call the ajax request to show the high score
            displayHighScore();
        }
    });

    //displayHighScore();
}

function signIn(userInput) {
    var data = { accessCode: userInput, name: "testName" };
    $.ajax({
        type: 'POST',
        url: '/login',
        data,
        success: function (data) {          
            console.log(data);
            if(data.user.used == false) {
                console.log("login.js valid user with unused code");
                //title.setText('Welcome ' + data.user.name);
                user = data.user;
                sessionStorage.setItem('accessCode', data.user.accessCode);
                window.location.replace('/game.html');
            } else {
                console.log("login.js valid user with used code");
                title.setText(data.user.accessCode + "\n已经使用过 (┬＿┬)");
            }
        },
        error: function (xhr) {
            //window.alert(JSON.stringify(xhr));
            title.setText(data.accessCode + "\n不存在(/ □ \\)");
        }
    });
}

function setUpHighScoreBoard() {
    var nameId, scoreId;
    for(var i = 0; i < 5; i++) {
        nameId = "name" + (i+1);
        scoreId = "score" + (i+1);
        highScoreName[i] = document.getElementById(nameId)
        highScore[i] = document.getElementById(scoreId);
    }
}

function displayHighScore() {
    $.ajax({
      type: 'GET',
      url: '/scores',
      success: function(data) {
        console.log(data);
        for(var j = 0; j < 5; j++)  {
            highScore[j].innerHTML = data[j].highScore;
            highScoreName[j].innerHTML = data[j].name;
        }
        highscoreList.setAlpha(1);
        
      },
      error: function(xhr) {
        console.log(xhr);
      }
    });
}
