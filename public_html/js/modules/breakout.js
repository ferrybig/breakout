/* global Paddle, Bricks, Particle, Ball, Score, Menu, Background */

'use strict';
var Breakout = (function () {

	var started = false;

	var start = function () {
		started = true;
	};

	var stop = function () {
		started = false;
	};

	var draw = function (graphics) {
		//console.log("Draw!");
		
		if (started) {
			Background.draw(graphics);

			Paddle.draw(graphics);

			Bricks.draw(graphics);

			Particle.draw(graphics);

			Ball.draw(graphics);

			Score.draw(graphics);
		}
		Menu.draw(graphics);
		//console.log("Draw done!");
	};

	var update = function () {
		//console.log("Update!");
		if (started) {
			Background.update();
			
			Ai.update();
			
			Paddle.update();

			Bricks.update();

			Particle.update();

			Ball.update();

			Score.update();
		}
		Menu.update();
		//console.log("Update done!");
	};

	var getSizeX = function () {
		return 800;
	};

	var getSizeY = function () {
		return 600;
	};

	var loadLevel = function (level) {
		Bricks.clear();
		Ball.respawn();
		Paddle.respawn();
		for (var i = 0; i < level.bricks.length; i++) {
			Bricks.addBrick(level.bricks[i].x, level.bricks[i].y, level.bricks[i].color);
		}
		Bricks.resetSlowLoad();
		Background.setTotalBricks(Bricks.size());
	};

	var self = {
		start: start,
		stop: stop,
		draw: draw,
		update: update,
		getSizeX: getSizeX,
		getSizeY: getSizeY,
		loadLevel: loadLevel
	};
	return self;
})();
