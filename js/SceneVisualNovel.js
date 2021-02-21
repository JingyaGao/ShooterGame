class SceneVisualNovel extends Phaser.Scene {
  constructor() {
    super({ key: "SceneVisualNovel" });
    this.junObject;
    this.background;
    this.whiteBackground;

    this.textBox;
    this.dialogText;
    this.nameText;
    this.currentMessage;
    this.counter = 0;
    this.storyArray;
    this.storyProgress = 0;
    this.textTimer;

    this.btnChoice;
    this.btnChoice2;
    this.choiceBoxText;
    this.choiceBox2Text;
    this.waitingForChoice = false;

    this.accessCode;
    this.score;

  }

  preload() {
    this.load.image("junNormal", "content/wholeBody.png");
    this.load.image("junMad", "content/mad.png");
    this.load.image("junMadCloseEyes", "content/madCloseEyes.png");
    this.load.image("junOpenMouth", "content/openMouth.png");
    this.load.image("junOpenMouthCloseEyes", "content/openMouthCloseEyes.png");

    this.load.image("background", "content/background.png");
    this.load.image("whiteBackground", "content/whiteBackground.png");
    this.load.image("textBox", "content/textBox.png");
    this.load.image("choiceBox", "content/choiceBox.png");
    this.load.image("choiceBoxPressed", "content/choiceBoxPressed.png");

    this.load.scenePlugin({
      key: "DialogModelPlugin",
      url: 'js/dialog_plugin.js',
      sceneKey: "dialogModel"
    });

    this.load.text("story", "story/story.txt");
  }

  create(data) {
    this.accessCode = data.accessCode;
    this.score = data.score;

    this.junObject = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height/2 + 20,"junNormal").setAlpha(0);
    this.junObject.setDepth(2);

    this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2,"background").setAlpha(0);
    let scaleX = this.cameras.main.width / this.background.width;
    let scaleY = this.cameras.main.height / this.background.height;
    let scale = Math.max(scaleX, scaleY);
    this.background.setScale(scale).setScrollFactor(0);
    this.background.setDepth(1);

    this.whiteBackground = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2,"whiteBackground").setAlpha(0);
    // scaleX = this.cameras.main.width / this.background.width;
    // scaleY = this.cameras.main.height / this.background.height;
    // scale = Math.max(scaleX, scaleY);
    // this.whiteBackground.setScale(scale).setScrollFactor(0);
    this.whiteBackground.setDepth(10);

    this.textBox = this.add.image(this.cameras.main.width / 2, this.cameras.main.height - 150 , "textBox").setAlpha(0);
    this.textBox.setDepth(3);
    this.textBox.setInteractive();
    this.textBox.on("pointerup", function() {
      this.moveToNextLine(this.scene, this.score);
    }, this);

    this.dialogText = this.add.text(65, this.cameras.main.height - this.textBox.height + 70, "", {
      fontFamily: 'fondolHei', 
      fontSize: 25,
      padding: {buttom: 20},
      color: '#ffffff'
    })
    this.dialogText.setDepth(5);

    this.nameText = this.add.text(35, this.cameras.main.height - this.textBox.height + 22, "", {
      fontFamily: 'fondolHei', 
      fontSize: 25,
      padding: {left: 30, buttom: 10},
      color: '#ffffff'
    })
    this.nameText.setDepth(5);

    // set up choice buttons 
    this.setupChoiceBoxes();

    // try{
    //   let story = fs.readFileSync('story/story.yaml', 'utf8');
    //   let data = yaml.safeLoad(story);
    //   console.log(data);
    // } catch(e) {
    //   console.log(e);
    // }

    let story = this.cache.text.get("story");
    console.log(story);
    this.storyArray = story.split('\n');

    //this.input.on('pointerdown', this.moveToNextLine, this);
    this.time.addEvent({
      delay: 1000,
      callback: ()=>{
        this.moveToNextLine(this.scene, this.score);
      },
      loop: false
    });

  }

  
  update() {
    // check for clicking
    // if yes, read the next line
  }

  setupChoiceBoxes() {
    this.btnChoice = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 3, "choiceBox").setAlpha(0).setDepth(3);
    this.btnChoice.setInteractive();
    this.btnChoice.on("pointerover", function() {
      this.btnChoice.setTexture("choiceBoxPressed");
    }, this);
    this.btnChoice.on("pointerout", function() {
      this.btnChoice.setTexture("choiceBox");
    }, this);
    this.btnChoice.on("pointerdown", function() {
      this.btnChoice.setTexture("choiceBoxPressed");
      
    }, this);
    this.btnChoice.on("pointerup", function() {
      this.removeChoiceBoxes();
      this.moveToNextLine(this.scene, this.score);
    }, this);

    this.btnChoice2 = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "choiceBox").setAlpha(0).setDepth(3);
    this.btnChoice2.setInteractive();
    this.btnChoice2.on("pointerover", function() {
      this.btnChoice2.setTexture("choiceBoxPressed");
    }, this);
    this.btnChoice2.on("pointerout", function() {
      this.btnChoice2.setTexture("choiceBox");
    }, this);
    this.btnChoice2.on("pointerdown", function() {
      this.btnChoice2.setTexture("choiceBoxPressed");

    }, this);
    this.btnChoice2.on("pointerup", function() {
      this.removeChoiceBoxes();
      this.moveToNextLine(this.scene, this.score);
    }, this);


    this.boxChoiceText = this.add.text(100, (this.cameras.main.height / 3) - 12, "", {
      fontFamily: 'fondolHei', 
      fontSize: 25,
      padding: {left: 30, buttom: 10},
      color: '#ffffff'
    })
    this.boxChoiceText.setDepth(5);

    this.boxChoice2Text = this.add.text(100, ( this.cameras.main.height / 2) - 12, "", {
      fontFamily: 'fondolHei', 
      fontSize: 25,
      padding: {left: 30, buttom: 10},
      color: '#ffffff'
    })
    this.boxChoice2Text.setDepth(5);
  }

  displayLetterByLetterText(textObject, message, len) {
    this.textTimer = this.time.addEvent({
      delay: 100,
      callback: function() {
        textObject.text = message.substr(0, this.counter);
        if(this.counter == len) {
          this.counter = 0;
        } else {
          this.counter += 1;
        }
      },
      callbackScope: this, 
      repeat: len
    })
  }

  moveToNextLine(scene, score) {
    // if choices are available, do not advance the story until a choice is clicked
    if(this.waitingForChoice == true) {
      // do nothing and return
      return;
    }
    if(this.storyProgress >= this.storyArray.length) {
      // end visual novel scene;
      // fade out to white/main screen/play again
      this.tweens.add({
        targets: this.whiteBackground,
        duration: 2000,
        alpha: 1,
        onComplete: function(tween, targets) {
            scene.start("SceneGameOver", {score: score} );
          }
      });
      //this.scene.start("SceneGameOver", {score: this.score} ); //, accessCode: this.accessCode});
      return;
    }

    // stop the timer for rolling text if it hasn't ended
    if(this.textTimer != null && this.textTimer.getOverallProgress() < 1) {
      console.log("timer progress: " + this.textTimer.getOverallProgress().toFixed(2) + " " + this.currentMessage);
      this.textTimer.remove();
      this.dialogText.text = this.currentMessage;
      this.counter = 0;
      return;
    }

    do {
      var line = this.storyArray[this.storyProgress].replace(/\r?\n|\r/, "");
      var subjectLine = line.split(":");

      //contains subject title and description
      var subject = subjectLine[0].split(" ");
      console.log("\nsubject: " + subject);
      var message = subjectLine[1];
      message = this.splitMessage(message);

      var name = subject[0];
      switch(name) {
        case "choice":
          this.waitingForChoice = true;
          if(subject[1] === "single") {
            //display one choice box
            this.btnChoice.setAlpha(0.85);
            this.boxChoiceText.text = message;

          } else if(subject[1] === "double") {
            //display two choice boxes, retrieve next two lines
            this.btnChoice.setAlpha(0.85);
            this.boxChoiceText.text = this.storyArray[this.storyProgress+1];

            this.btnChoice2.setAlpha(0.85);
            this.boxChoice2Text.text = this.storyArray[this.storyProgress+2];
            this.storyProgress += 2;
          }
          break;
        case "show":
          var object = subject[1];
          if(object === "jun") {
            //show jun, depending on expression
            this.displayObject(this.junObject, subject[2], subjectLine[1]);
          } else if(object === "background") {
            this.displayObject(this.background, null, subjectLine[1]);
          } else if(object === "textBox") {
            this.displayObject(this.textBox, null, subjectLine[1], 0.85);
          }
          break;
        default:
          this.nameText.text = name;
          this.currentMessage = message;
          this.displayLetterByLetterText(this.dialogText, this.currentMessage, this.currentMessage.length);
          //console.log("error decoding [subject] from story.txt");
      }
      this.storyProgress++;
      console.log("counter: " + this.counter + " msg: " + this.storyProgress + " " + this.currentMessage);
    } while (name == "show");
  }

  splitMessage(message) {
    // split the message into array of strings if the given str has more than 13 caracters
    var msgCopy = Object.assign("", message);
    //var messageSplit = message.slice(0);
    //messageSplit.replace(/./gi, "");
    var messageSplit = msgCopy.replace(/[A-Z|a-z]/g, "");
    console.log(msgCopy + " replaced message: " + messageSplit);
    //var slicedMsg;
    let len = messageSplit.length;
    if(len >= 14) {
      message = message.slice(0, 14) +　"\n" + message.slice(14, len);
    } 
    return message;
  }

  removeChoiceBoxes() {
      this.btnChoice.setAlpha(0);
      this.btnChoice2.setAlpha(0);
      this.boxChoiceText.text = "";
      this.boxChoice2Text.text = "";
      this.waitingForChoice = false;
  }

  displayObject(object, variation, effect, alpha = 1) {
    if(variation != null) {
      object.setTexture(variation);
    }
    
    if(effect === "FADE") {
      this.tweens.add({
        targets: object,
        duration: 2000,
        alpha: 1,
        delay:2000
      });
    } else if(effect == "DISPLAY") {
      object.setAlpha(alpha);
    }
  }
}