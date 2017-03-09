'use strict';
var Breakout = (function(){

	var started = false;
		
	var start = function() {
		started = true;
	};
	
	var stop = function() {
		started = false;
	};
	
	var draw = function(graphics) {
		//console.log("Draw!");
		graphics.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
		
		graphics.strokeStyle = "#224433";
		graphics.fillStyle = "#224433";
		Paddle.draw(graphics);
		
		graphics.strokeStyle = "#332244";
		graphics.fillStyle = "#332244";
		Bricks.draw(graphics);
		
		graphics.strokeStyle = "#443322";
		graphics.fillStyle = "#443322";
		Ball.draw(graphics);
		
		Menu.draw(graphics);
		//console.log("Draw done!");
	};
	
	var update = function() {
		//console.log("Update!");
		if(started) {
			Paddle.update();
			
			Bricks.update();
			
			Ball.update();
		}
		Menu.update();
		//console.log("Update done!");
	};
	
	var getSizeX = function() {
		return 800;
	};   
	
	var getSizeY = function() {
		return 600;
	};
	
	var loadLevel = function(level) {
		Bricks.clear();
		Ball.respawn();
		Paddle.respawn();
		for(var i = 0; i < level.bricks.length; i++) {
			Bricks.addBrick(level.bricks[i].x, level.bricks[i].y);
		}
	};
	
	var self = {
		start: start,
		stop: stop,
		draw: draw,
		update: update,
		getSizeX: getSizeX,
		getSizeY: getSizeY,
		loadLevel: loadLevel,
	};
	return self;
})();