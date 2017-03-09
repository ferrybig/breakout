'use strict';
var Bricks = (function(){
	var bricks = [];
	
	var _removeBrick = function(index) {
		bricks.splice(index, 1);
		// Update the key for the remaining bricks, since the array has been modified
		for(var i = index; i < bricks.length; i++) {
			bricks[i].key = i;
		}
	};
	
	var addBrick = function(x, y) {
		var brick = {
			key: bricks.length,
			getX: function(){
				return x;
			},
			getY: function(){
				return y;
			},
			getSizeX: function(){
				return 20;
			},
			getSizeY: function(){
				return 15;
			},
			registerImpact: function() {
				console.log(x, y, 'Brick destroyed!');
				_removeBrick(brick.key);
			}
		}
		bricks.push(brick);
		return brick;
	};
	
	var draw = function(graphics) {
		forEach(function(brick) {
			graphics.fillRect(brick.getX() - brick.getSizeX() + 1, brick.getY() - brick.getSizeY() + 1,
				brick.getSizeX() * 2 - 2, brick.getSizeY() * 2 - 2);
		});
	};
	
	var forEach = function(callback) {
		for(var i = 0; i < bricks.length; i++) {
			callback(bricks[i]);
		}
	};
	
	var clear = function() {
		bricks = [];
	};
	
	var size = function() {
		return size;
	};
	
	var update = function(){
	};
	
	var self = {
		draw: draw,
		update: update,
		addBrick: addBrick,
		clear: clear,
		forEach: forEach,
		size: size,
	};
	return self;
})();