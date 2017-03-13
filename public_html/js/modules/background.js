/* global Bricks */

'use strict';
var Background = (function(){
	var top = {
		hue: 0,
		brightness: 30,
		saturation: 60
	};
	var bottom = {
		hue: 0,
		brightness: 5,
		saturation: 60
	};
	var total = 1;
	
	var setTotalBricks = function(setTotal) {
		total = setTotal;
	};
	
	var update = function() {
		top.hue = bottom.hue = Bricks.size() / total * 240;
	};
	
	var draw = function(graphics) {
		var grd=graphics.createLinearGradient(0,0,0,graphics.canvas.height);
		grd.addColorStop(0,'hsl(' + top.hue + ',' + top.saturation + '%,' + top.brightness + '%)');
		grd.addColorStop(1,'hsl(' + bottom.hue + ',' + bottom.saturation + '%,' + bottom.brightness + '%)');
		graphics.fillStyle = grd;
		graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);
	};
	
	var self = {
		setTotalBricks: setTotalBricks,
		update: update,
		draw: draw
	};
	return self;
})();
