'use strict';
var Ball = (function(){
	var x = undefined;
	var y = undefined;
	var velocityX = undefined;
	var velocityY = undefined;
	var sizeX = 10;
	var sizeY = 10;
	var destroyed = false;
	var rawSpeed = 0;
		
	var getX = function() {
		return x;
	};
	var getY = function() {
		return y;
	};
	
	var getVelocityX = function() {
		return velocityX;
	};
	var getVelocityY = function() {
		return velocityY;
	};
	var setVelocityX = function(setVelocityX) {
		velocityX = setVelocityX;
	};
	var setVelocityY = function(setVelocityY) {
		velocityY = setVelocityY;
	};
	
	var getRawSpeed = function() {
		return rawSpeed;
	};
	var setRawSpeed = function(setRawSpeed) {
		rawSpeed = setRawSpeed;
	};
	
	var getSizeX = function() {
		return sizeX;
	};
	var getSizeY = function() {
		return sizeY;
	};
	
	var isDestroyed = function() {
		return destroyed;
	};
	
	var respawn = function() {
		x = 400;
		y = 430;
		velocityX = 0.05;
		velocityY = 1.5;
		destroyed = false;
		rawSpeed = 2.5;
	};
	
	var draw = function(graphics) {
		graphics.beginPath();
		graphics.moveTo(x, y);
		
		graphics.arc(x, y, (sizeX + sizeY) / 2, 0, Math.PI * 2, true);
		graphics.stroke();
		
		graphics.arc(x, y, (sizeX + sizeY) / 2.5, 0, Math.PI * 2, true);
		
		graphics.closePath();
		graphics.fill();
	};
	
	var update = function() {
		// Update position
		x += velocityX;
		y += velocityY;
		
		// Handle collisions with bricks
		var initialVelocityX = velocityX;
		var initialVelocityY = velocityY;
		Bricks.forEach(function(brick){
			var dX = Math.abs(brick.getX() - x) - brick.getSizeX() - sizeX;
			var dY = Math.abs(brick.getY() - y) - brick.getSizeY() - sizeY;
			if(dX < 0 && dY < 0) {
				brick.registerImpact();
				if(dX < dY) {
					velocityY = -initialVelocityY;
				} else {
					velocityX = -initialVelocityX;
				}
			}
		});
		// Handle paddle impact
		var dX = Math.abs(Paddle.getX() - x) - Paddle.getSizeX() - sizeX;
		var dY = Math.abs(Paddle.getY() - y) - Paddle.getSizeY() - sizeY;
		if(dX < 0 && dY < 0) {
			// The paddle will handle the bounce from here...
			Paddle.registerImpact();
		}
		// Handle ball bouncing to the edges of the board
		if(x - sizeX < 0 && velocityX < 0) {
			velocityX = -velocityX;
		}
		if(y - sizeY < 0 && velocityY < 0) {
			velocityY = -velocityY;
		}
		if(x + sizeX > Breakout.getSizeX() && velocityX > 0) {
			velocityX = -velocityX;
		}
		if(y + sizeY > Breakout.getSizeY() && velocityY > 0) {
			destroyed = true;
			console.log("TODO: remove life here");
			respawn();
		}
	};
	
	respawn();
	var self = {
		getX: getX,
		getY: getY,
		getVelocityX: getVelocityX,
		getVelocityY: getVelocityY,
		setVelocityX: setVelocityX,
		setVelocityY: setVelocityY,
		getSizeX: getSizeX,
		getSizeY: getSizeY,
		isDestroyed: isDestroyed,
		update: update,
		draw: draw,
		respawn: respawn,
		getRawSpeed: getRawSpeed,
		setRawSpeed: setRawSpeed,
	};
	return self;
})();