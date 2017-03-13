/* global Level, Breakout */

var Menu = (function () {
	var paused = true;
	var hasGame = false;
	var selectedLevel = Level.defaultLevel();
	var buttons = [];
	var mouseX, mouseY, mousePressed = false;

	var pauseGame = function () {
		if (hasGame) {
			if (paused && hasGame) {
				paused = false;
				Breakout.start();
			} else {
				paused = true;
				Breakout.stop();
			}
		}
	};

	var draw = function (graphics) {
		if (!paused)
			return;


		graphics.beginPath();
		if (!hasGame) {
			graphics.strokeStyle = "#000";
			graphics.fillStyle = "#000";
			graphics.fillRect(0, 0, Breakout.getSizeX(), Breakout.getSizeY());
		}

		graphics.strokeStyle = "#000";
		graphics.fillStyle = "#FFF";
		graphics.fillRect(200, 100, 400, 400);
		graphics.strokeRect(200, 100, 400, 400);

		graphics.fillStyle = "#000";
		graphics.font = "48px serif";
		graphics.textAlign = "center";

		graphics.textBaseline = "top";
		graphics.fillText('Breakout', 400, 120);

		graphics.font = "18px serif";
		graphics.fillText('Levels', 400, 260);

		graphics.closePath();

		graphics.beginPath();
		for (var i = 0; i < buttons.length; i++) {
			graphics.textBaseline = "middle";
			// console.log(buttons[i].text);
			graphics.font = "24px serif";
			var enabled = true;
			if (buttons[i].isEnabled && !buttons[i].isEnabled()) {
				graphics.strokeStyle = "#888";
				graphics.fillStyle = "#888";
				enabled = false;
			} else {
				graphics.strokeStyle = "#000";
				graphics.fillStyle = "#000";
			}
			graphics.strokeRect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);
			graphics.fillText(buttons[i].text, buttons[i].x + buttons[i].width / 2, buttons[i].y + buttons[i].height / 2);
			if (buttons[i].selectedText && !enabled) {
				graphics.textBaseline = "bottom";
				graphics.font = "12px serif";
				graphics.fillText(buttons[i].selectedText, buttons[i].x + buttons[i].width / 2, buttons[i].y + buttons[i].height);
			}
		}
		graphics.closePath();
	};

	var update = function () {
		if (!paused)
			return;
		if (!mousePressed) {
			return;
		}
		for (var i = 0; i < buttons.length; i++) {
			var button = buttons[i];
			if (button.x <= mouseX && button.x + button.width > mouseX
					&& button.y <= mouseY && button.y + button.height > mouseY) {

				console.log("pressed " + buttons[i].text);
				if (!button.isEnabled || button.isEnabled()) {
					button.callback();
				}
			}
		}
		newMousePressed = false;
	};

	var startNewGame = function () {
		hasGame = true;
		paused = false;
		Breakout.loadLevel(selectedLevel);
		Breakout.start();
	};

	var mouseUpdate = function (newMouseX, newMouseY, newMousePressed) {
		mouseX = newMouseX;
		mouseY = newMouseY;
		mousePressed = newMousePressed;
	};
	var isPaused = function () {
		return paused;
	};

	buttons.push({
		callback: pauseGame,
		x: 250,
		y: 200,
		width: 140,
		height: 50,
		text: 'Continue',
		isEnabled: function () {
			return hasGame;
		}
	});
	buttons.push({
		callback: startNewGame,
		x: 400,
		y: 200,
		width: 140,
		height: 50,
		text: 'New game'
	});
	var levels = Level.getAll();
	for (var i = 0; i < levels.length; i++) {
		console.log(levels[i]);
		buttons.push(function(level) {return {
			callback: function() {
				selectedLevel = level;
			},
			x: i % 2 === 0 ? 250 : 400,
			y: Math.floor(i / 2) * 50 + 290,
			width: 140,
			height: 40,
			text: level.name,
			selectedText: 'Selected',
			isEnabled: function() {
				return selectedLevel.name !== level.name;
			}
		};}(levels[i]));
	}


	var self = {
		mouseUpdate: mouseUpdate,
		pauseGame: pauseGame,
		startNewGame: startNewGame,
		draw: draw,
		update: update,
		isPaused: isPaused
	};
	return self;
})();
