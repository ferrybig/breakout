'use strict';
var Level = (function(){
	var defaultLevel = function() {
		var level = {
			bricks: [],
			name: "default",
		};
		for(var x = 20; x < Breakout.getSizeX(); x += 40) {
			for(var y = 15; y < Breakout.getSizeY() / 2; y += 30) {
				level.bricks.push({
					x: x,
					y: y,
				});
			}
		}
		return level;
	};
	var rowsLevel = function() {
		var level = {
			bricks: [],
			name: "rows",
		};
		for(var x = 20; x < Breakout.getSizeX(); x += 120) {
			for(var y = 15; y < Breakout.getSizeY() / 2; y += 30) {
				level.bricks.push({
					x: x,
					y: y,
				});
			}
		}
		return level;
	};
	var columnsLevel = function() {
		var level = {
			bricks: [],
			name: "columns",
		};
		for(var x = 20; x < Breakout.getSizeX(); x += 40) {
			for(var y = 15; y < Breakout.getSizeY() / 2; y += 90) {
				level.bricks.push({
					x: x,
					y: y,
				});
			}
		}
		return level;
	};
	
	var self = {
		defaultLevel: defaultLevel,
	};
	return self;
})();