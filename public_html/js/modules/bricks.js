/* global Score, Particle */

'use strict';
var Bricks = (function () {
	var bricks = [];
	var slowLoad = 0;

	var _removeBrick = function (index) {
		bricks.splice(index, 1);
		// Update the key for the remaining bricks, since the array has been modified
		for (var i = index; i < bricks.length; i++) {
			bricks[i].key = i;
		}
	};

	var addBrick = function (x, y, color) {
		var brick = {
			key: bricks.length,
			getX: function () {
				return x;
			},
			getY: function () {
				return y;
			},
			getSizeX: function () {
				return 20;
			},
			getSizeY: function () {
				return 10;
			},
			getColor: function () {
				return color;
			},
			registerImpact: function () {
				_removeBrick(brick.key);
				Score.addScore(100);
				Particle.addBrickParticle(x, y, 20, 10, color);
			}
		};
		bricks.push(brick);
		return brick;
	};

	var draw = function (graphics) {
		if (slowLoad === undefined) {
			forEach(function (brick) {
				graphics.fillStyle = brick.getColor();
				graphics.fillRect(brick.getX() - brick.getSizeX() + 1, brick.getY() - brick.getSizeY() + 1,
						brick.getSizeX() * 2 - 2, brick.getSizeY() * 2 - 2);
			});
			return;
		}
		slowLoad += 4;
		var looped = forEach(function (brick) {
			graphics.fillStyle = brick.getColor();
			graphics.fillRect(brick.getX() - brick.getSizeX() + 1, brick.getY() - brick.getSizeY() + 1,
					brick.getSizeX() * 2 - 2, brick.getSizeY() * 2 - 2);
		}, slowLoad);
		if (slowLoad !== looped) {
			slowLoad = undefined;
		}
	};

	var forEach = function (callback, max) {
		var length = bricks.length;
		if (max !== undefined) {
			length = Math.min(max, length);
		}
		for (var i = 0; i < length; i++) {
			if(bricks[i])
				callback(bricks[i]);
		}
		return i;
	};

	var resetSlowLoad = function () {
		slowLoad = 0;
	};

	var clear = function () {
		bricks = [];
	};

	var size = function () {
		return size;
	};

	var update = function () {
	};

	var self = {
		draw: draw,
		update: update,
		addBrick: addBrick,
		clear: clear,
		forEach: forEach,
		size: size,
		resetSlowLoad: resetSlowLoad,
	};
	return self;
})();
