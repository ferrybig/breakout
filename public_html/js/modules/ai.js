/* global Ball, Paddle */

'use strict';
var Ai = (function() {
	var working = false;
	var change = 0;
	var x = 400;
	var targetX = 400;
	
	var update = function() {
		if(!working) {
			return;
		}
		x += change;
		targetX = Ball.getX() + Ball.getVelocityX() * ((Ball.getY() - Paddle.getY() - Paddle.getSizeY()) / -Math.abs(Ball.getVelocityY())) + Paddle.getSizeX() / (Ball.getVelocityX() < 0 ? 1.6 : -1.6);
		while(targetX < 0 || 800 < targetX) {
			if(targetX < 0) {
				targetX = 0 - targetX;
			}
			if(targetX > 800) {
				targetX = 800 - targetX;
			}
		}
		var yDifference = Math.max(200 - (Paddle.getY() - Ball.getY() - Paddle.getSizeY()), 0) / 3;
		var difference = x - targetX;
		if(difference < -yDifference) {
			difference = -yDifference;
		} else if(difference > yDifference) {
			difference = yDifference;
		}
		change -= difference;
		change /= 10;
		x += change;
		Paddle.setMouse(x, true);
	};
	
	var start = function() {
		working = true;
	};
	var stop = function() {
		working = false;
	};
	var self = {
		start: start,
		stop: stop,
		update: update
	};
	return self;
})();