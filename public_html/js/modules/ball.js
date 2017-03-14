/* global Score, Breakout, Paddle, Powerup, Particle, Bricks */

'use strict';
var Ball = (function () {
	var x = undefined;
	var y = undefined;
	var velocityX = undefined;
	var velocityY = undefined;
	var sizeX = 10;
	var sizeY = 10;
	var destroyed = false;
	var rawSpeed = 0;

	var getX = function () {
		return x;
	};
	var getY = function () {
		return y;
	};

	var getVelocityX = function () {
		return velocityX;
	};
	var getVelocityY = function () {
		return velocityY;
	};
	var setVelocityX = function (setVelocityX) {
		velocityX = setVelocityX;
	};
	var setVelocityY = function (setVelocityY) {
		velocityY = setVelocityY;
	};

	var getRawSpeed = function () {
		return rawSpeed;
	};
	var setRawSpeed = function (setRawSpeed) {
		rawSpeed = setRawSpeed;
	};

	var setBallSize = function (setBallSize) {
		sizeX = sizeY = setBallSize;
	};

	var getSizeX = function () {
		return sizeX;
	};
	var getSizeY = function () {
		return sizeY;
	};

	var isDestroyed = function () {
		return destroyed;
	};

	var respawn = function () {
		x = 400;
		y = 430;
		velocityX = 0.05;
		velocityY = 1.5;
		destroyed = false;
		rawSpeed = 2.5;
	};

	var draw = function (graphics) {
		graphics.strokeStyle = "#CCBBAA";
		graphics.fillStyle = "#CCBBAA";
		graphics.beginPath();
		graphics.moveTo(x, y);
		graphics.arc(x, y, (sizeX + sizeY) / 2, 0, Math.PI * 2, true);
		graphics.closePath();
		graphics.stroke();

		graphics.beginPath();
		graphics.moveTo(x, y);
		graphics.arc(x, y, (sizeX + sizeY) / 2.5, 0, Math.PI * 2, true);
		graphics.closePath();
		graphics.fill();
	};

	var update = function () {
		if (destroyed)
			return;

		// Update position
		x += velocityX;
		y += velocityY;

		// Handle collisions with bricks
		var appendixDeletions = [];
		var initialVelocityX = velocityX;
		var initialVelocityY = velocityY;
		var velocitySpeed = Math.sqrt(initialVelocityX * initialVelocityX + initialVelocityY * initialVelocityY);
		var convertedVelocityX = velocityX / 10;
		var convertedVelocityY = velocityY / 10;
		var collisions = 0;
		Bricks.forEach(function (brick) {
			var dX = Math.abs(brick.getX() - x) - brick.getSizeX() - sizeX;
			var dY = Math.abs(brick.getY() - y) - brick.getSizeY() - sizeY;
			if (dX < 0 && dY < 0) {
				dX += sizeX;
				dY += sizeY;
				if(dX > 0 && dY > 0 && sizeX * sizeY < Math.max(0, dX) * dX + Math.max(0, dY) * dY) {
					console.log("Impact rejected because the cube/square format");
					return;
				}
				dX -= sizeX;
				dY -= sizeY;
				brick.registerImpact();
				collisions++;
				if (!Powerup.isActivated("flythru")) {
					if (dY < dX) {
						convertedVelocityX += -initialVelocityX;
						convertedVelocityY += initialVelocityY;
					} else {
						convertedVelocityX += initialVelocityX;
						convertedVelocityY += -initialVelocityY;
					}
				}
			} else if (Powerup.isActivated("exploding") && dX < 20 && dY < 20) {
				appendixDeletions.push(brick);
			}
		});
		if (collisions > 0) {
			convertedVelocityX /= collisions; 
			convertedVelocityY /= collisions; 
			var convertedSpeed = Math.sqrt(convertedVelocityX * convertedVelocityX + convertedVelocityY * convertedVelocityY);
			convertedVelocityX *= velocitySpeed;
			convertedVelocityY *= velocitySpeed;
			convertedVelocityX /= convertedSpeed;
			convertedVelocityY /= convertedSpeed;
			velocityX = convertedVelocityX;
			velocityY = convertedVelocityY;

			Score.addScore(Math.pow(1.1, collisions) - 1.1);
			if (Powerup.isActivated("exploding")) {
				Particle.addExplodingParticle(x, y, 4);
			}
			for (var i = 0; i < appendixDeletions.length; i++) {
				appendixDeletions[i].registerImpact();
				collisions++;
			}
		}
		// Handle paddle impact
		var dX = Math.abs(Paddle.getX() - x) - Paddle.getSizeX() - sizeX;
		var dY = Math.abs(Paddle.getY() - y) - Paddle.getSizeY() - sizeY;
		if (dX < 0 && dY < 0) {
			// The paddle will handle the bounce from here...
			Paddle.registerImpact();
		}
		// Handle ball bouncing to the edges of the board
		if (x - sizeX < 0 && velocityX < 0) {
			velocityX = -velocityX;
		}
		if (y - sizeY < 0 && velocityY < 0) {
			velocityY = -velocityY;
		}
		if (x + sizeX > Breakout.getSizeX() && velocityX > 0) {
			velocityX = -velocityX;
		}
		if (y + sizeY > Breakout.getSizeY() && velocityY > 0) {
			if(Powerup.isActivated("god")) {
				velocityY = -velocityY;
			} else {
				destroyed = true;
				Score.ballDestroyed();
			}
		}

		if( -0.3 < velocityY && velocityY < 0.3 && velocityX !== 0 && velocityY !== 0) {
			console.log("Speed to slow!! Adjusting");
			velocityY += 0.01;
			velocityY *= 1.01;
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
		setBallSize: setBallSize
	};
	return self;
})();
