'use strict';
var Level = (function(){
	var _generateLevel = function(name, callback) {
		var level = {
			bricks: [],
			name: name,
		};
		for(var x = 0; x < 20; x += 1) {
			for(var y = 0; y < 20; y += 1) {
				var result = callback(x, y, x / 10 - 1, y / 10 - 1);
				if(result){
					if(result === true) {
						result = '#' + (0x800000 + x * 0x100 * 12 + y * 12).toString(16);
					}
					level.bricks.push({
						x: x * 40 + 20,
						y: y * 20 + 10,
						color: result,
					});
				}
			}
		}
		return level;
	};
		
	var defaultLevel = function() {
		return _generateLevel("default", function(x, y){
			return true;
		});
	};
	var rowsLevel = function() {
		return _generateLevel("rows", function(x, y){
			return x % 3 == 0;
		});
	};
	var columnsLevel = function() {
		return _generateLevel("rows", function(x, y){
			return x % 3 == 0;
		});
	};
	var ballLevel = function() {
		return _generateLevel("ball", function(x, y, nx, ny){
			return nx * nx + ny * ny < 1;
		});
	};
	var squareLevel = function() {
		return _generateLevel("square", function(x, y, nx, ny){
			return Math.max(nx * nx, ny * ny) < 0.25;
		});
	};
	var islandLevel = function() {
		return _generateLevel("island", function(x, y, nx, ny){
			return x % 4 < 2 && y % 4 < 2;
		});
	};
	
	var self = {
		defaultLevel: defaultLevel,
		rowsLevel: rowsLevel,
		columnsLevel: columnsLevel,
		ballLevel: ballLevel,
		squareLevel: squareLevel,
		islandLevel: islandLevel,
	};
	return self;
})();