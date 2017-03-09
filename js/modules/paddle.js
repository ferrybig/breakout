'use strict';
var Paddle = (function(){
	// Location
	var x = 300;
	var y = 580;
	
	//size
	var sizeX = 80;
	var sizeY = 10;
	
	// Ball speed
	var bounceSpeed = 9;
	
	// This will be set to undefined to indicate that the last mouse position is used already
	var mouseX = undefined;
	
	// Speed of the keyboard presses
	var keyboardDirection = 0;
	var keyBoardSmooth = 0;
		
	var getX = function() {
		return x;
	};
	var getY = function() {
		return y;
	};
	
	var getSizeX = function() {
		return sizeX;
	};
	var getSizeY = function() {
		return sizeY;
	};
	
	var setMouseX = function(setMouseX) {
		mouseX = setMouseX;
	};
	
	var setKeyboardDirection = function(setKeyboardDirection) {
		keyboardDirection = setKeyboardDirection;
	};

	var draw = function(graphics) {
		graphics.beginPath();
		
		graphics.fillRect(x - sizeX, y, sizeX * 2, sizeY * 2);
		
		graphics.moveTo(x - sizeX, y);
		graphics.bezierCurveTo(x - sizeX, y - sizeY, x + sizeX, y - sizeY, x + sizeX, y);
		
		graphics.closePath();
		graphics.fill();
	};
	
	var update = function() {
		if(mouseX !== undefined) {
			// Mouse mode
			keyboardDirection = 0;
			var change = mouseX - x;
			// Prevent overspeed, creates more challenge
			if(change < -100)
				change = -100;
			else if(change > 100) 
				change = 100;
			x += change;
			mouseX = undefined;
		} else {
			// Keyboard mode
			keyBoardSmooth += keyboardDirection;
			keyBoardSmooth /= 2;
			x += keyBoardSmooth;
		}
		// Handle screen edge cliping issues
		if(x - sizeX < 0) {
			x = sizeX;
		}
		if(x + sizeX > Breakout.getSizeX()) {
			x = Breakout.getSizeX() - sizeX;
		}
	};
	
	var registerImpact = function() {
		var impactX = Ball.getX() - getX();
		var orginalY = Ball.getVelocityY();
		var orginalX = Ball.getVelocityX();
		var reflectedY = sizeX * 2 - Math.abs(impactX);
		var reflectedX = impactX;
		
		// Normalize both vectors
		var realY = orginalY + reflectedY;
		var realX = orginalX + reflectedX;
		var length = Math.sqrt(Math.pow(realY, 2) + Math.pow(realX, 2));
		var normalY = realY / length;
		var normalX = realX / length;
		
		// Bring bal up to target speed
		normalY *= bounceSpeed;
		normalX *= bounceSpeed;
		
		// Make ball bounce back to the top, instead of the button (negative Y = top)
		normalY *= -1;
		
		Ball.setVelocityY(normalY);
		Ball.setVelocityX(normalX);
	};
	
	var respawn = function() {
		x = 300;
		y = 550;
		keyboardDirection = 0;
	};
	
	var self = {
		getX: getX,
		getY: getY,
		getSizeX: getSizeX,
		getSizeY: getSizeY,
		update: update,
		registerImpact: registerImpact,
		draw: draw,
		setMouseX: setMouseX,
		setKeyboardDirection: setKeyboardDirection,
		respawn: respawn,
	};
	return self;
})();