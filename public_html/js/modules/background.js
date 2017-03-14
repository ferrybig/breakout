/* global Bricks */

'use strict';
var Background = (function(){
	var top = {
		hue: 0,
		brightness: 30,
		saturation: 30
	};
	var bottom = {
		hue: 0,
		brightness: 5,
		saturation: 30
	};
	var total = 1;
	var lastGradient = undefined;
	var lastGradientColor = undefined;
	
	var setTotalBricks = function(setTotal) {
		total = setTotal;
	};
	
	var update = function() {
		top.hue = bottom.hue = Bricks.size() * 240 / total;
	};
	
	var draw = function(graphics) {
		if(lastGradientColor !== top.hue) {
			lastGradient=graphics.createLinearGradient(0,0,0,graphics.canvas.height);
			lastGradient.addColorStop(0,'hsl(' + top.hue + ',' + top.saturation + '%,' + top.brightness + '%)');
			lastGradient.addColorStop(1,'hsl(' + bottom.hue + ',' + bottom.saturation + '%,' + bottom.brightness + '%)');
			lastGradientColor = top.hue;
		}
		graphics.fillStyle = lastGradient;
		graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);
	};
	
	var self = {
		setTotalBricks: setTotalBricks,
		update: update,
		draw: draw
	};
	return self;
})();
