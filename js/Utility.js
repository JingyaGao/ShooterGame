class Utility {

	static FadeToBlack(scene, image) {
		//this.load.image("sprBg4", "content/sprBg4.png");
		//const whiteBackground = this.add.image(480,680,"sprBg4").setAlpha(0);
		scene.tweens.add({
			targets: image,
			duration: 500,
			alpha: 1
		});
	}

	// https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
	static loadFont(name, url) {
		var newFont = new FontFace(name, `url(${url})`);
		newFont.load.then(function (loaded) {
			document.fonts.add(loaded);
		}).catch(function(error) {
			return error;
		});
	}

	// static displayNextLetter() {

	//     this.textObject.text = this.message.substr(0, this.counter);
	//     this.counter += 1;
	// }

 //    static displayLetterByLetterText(textObject, message, onCompleteCallback) {

 //      var timerEvent = game.time.events.repeat(80, message.length, displayNextLetter, 
 //                                  { textObject: textObject, message: message, counter: 1 });

 //      timerEvent.timer.onComplete.addOnce(onCompleteCallback, this);

 //  }
}