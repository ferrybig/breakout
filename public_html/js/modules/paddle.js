'use strict';
var Paddle = (function(){
	// Location
	var x = 300;
	var y = 580;
	
	//size
	var sizeX = 80;
	var sizeY = 10;
	
	// Ball speed
	var bounceSpeed = 7;
	
	// This will be set to undefined to indicate that the last mouse position is used already
	var mouseX = undefined;
	
	// Speed of the keyboard presses
	var keyboardDirection = 0;
	var keyBoardSmooth = 0;
	
	var holdingBall = 0;
	var clickedMouse = false;
		
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
	
	var setMouse = function(setMouse, hasClickedMouse) {
		mouseX = setMouse;
		clickedMouse = hasClickedMouse;
	};
	
	var setKeyboardDirection = function(setKeyboardDirection) {
		keyboardDirection = setKeyboardDirection;
	};
	
	var holdBall = function() {
		holdingBall = 0;
	};

	var draw = function(graphics) {
		graphics.strokeStyle = "#224433";
		graphics.fillStyle = "#224433";
		graphics.beginPath();
		
		graphics.fillRect(x - sizeX, y, sizeX * 2, sizeY * 2);
		
		graphics.moveTo(x - sizeX, y);
		graphics.bezierCurveTo(x - sizeX, y - sizeY * 1.5, x + sizeX, y - sizeY * 1.5, x + sizeX, y);
		
		graphics.closePath();
		graphics.fill();
	};
	
	var update = function() {
		if(mouseX !== undefined && keyboardDirection === 0) {
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
		// Ball holding mode
		if(holdingBall !== undefined) {
			if (clickedMouse) {
				Ball.setVelocityX(0.1);
				Ball.setVelocityY(0);
				registerImpact();
				holdingBall = undefined;
			} else {
				var targetX = getX() - holdingBall;
				var targetY = getY() - getSizeY() - Ball.getSizeY() - 1;
				Ball.setVelocityX(targetX - Ball.getX());
				Ball.setVelocityY(targetY - Ball.getY());
			}
		}
		clickedMouse = false;
	};
	
	var registerImpact = function() {
		console.log("Paddle impact!");
		if(Powerup.isActivated("holdball") && holdingBall === undefined) {
			holdingBall = getX() - Ball.getX();
		}
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
		var targetBounceSpeed = (Ball.getRawSpeed() * 99 + bounceSpeed) / 100;
		normalY *= targetBounceSpeed;
		normalX *= targetBounceSpeed;
		Ball.setRawSpeed(targetBounceSpeed);
		
		// Make ball bounce back to the top, instead of the button (negative Y = top)
		normalY *= -1;
		
		Ball.setVelocityY(normalY);
		Ball.setVelocityX(normalX);
	};
	
	var respawn = function() {
		x = 300;
		y = 550;
		keyboardDirection = 0;
		clickedMouse = false;
		holdBall();
	};
	
	var self = {
		getX: getX,
		getY: getY,
		getSizeX: getSizeX,
		getSizeY: getSizeY,
		update: update,
		registerImpact: registerImpact,
		draw: draw,
		setMouse: setMouse,
		setKeyboardDirection: setKeyboardDirection,
		respawn: respawn,
		holdBall: holdBall,
	};
	return self;
})();