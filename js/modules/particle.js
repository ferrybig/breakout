'use strict';
var Particle = (function() {
	var brickParticles = [];
	
	var draw = function(graphics) {
		for(var i = 0; i < brickParticles.length; i++) {
			graphics.fillStyle = brickParticles[i].color;
			graphics.fillRect(brickParticles[i].x - brickParticles[i].sizeX + 1, 
				brickParticles[i].y - brickParticles[i].sizeY + 1,
				brickParticles[i].sizeX * 2 - 2, 
				brickParticles[i].sizeY * 2 - 2);
		}
	};
	
	var update = function() {
		while(brickParticles.length !== 0 && brickParticles[0].ttl < 0) {
			brickParticles.pop();
		}
		for(var i = 0; i < brickParticles.length; i++) {
			brickParticles[i].ttl--;
			brickParticles[i].sizeX *= 0.9;
			brickParticles[i].sizeY *= 0.9;
		}
	};
	
	var addBrickParticle = function(x, y, sizeX, sizeY, color) {
		brickParticles.push({
			x: x,
			y: y,
			sizeX: sizeX,
			sizeY: sizeY,
			color: color,
			ttl: 30,
		});
	};
	
	var self = {
		draw: draw,
		update: update,
		addBrickParticle: addBrickParticle,
	};
	return self;
})();
