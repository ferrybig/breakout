'use strict';
var Particle = (function () {
	var brickParticles = [];
	var explodeParticles = [];

	var draw = function (graphics) {
		for (var i = 0; i < brickParticles.length; i++) {
			graphics.fillStyle = brickParticles[i].color;
			graphics.fillRect(brickParticles[i].x - brickParticles[i].sizeX + 1,
					brickParticles[i].y - brickParticles[i].sizeY + 1,
					brickParticles[i].sizeX * 2 - 2,
					brickParticles[i].sizeY * 2 - 2);
		}
		for (var i = 0; i < explodeParticles.length; i++) {
			graphics.fillStyle = explodeParticles[i].color;
			graphics.beginPath();
			graphics.moveTo(explodeParticles[i].x, explodeParticles[i].y);
			graphics.arc(explodeParticles[i].x, explodeParticles[i].y, explodeParticles[i].size, 0, Math.PI * 2, true);
			graphics.closePath();
			graphics.fill();
		}
	};

	var update = function () {
		while (brickParticles.length !== 0 && brickParticles[0].ttl < 0) {
			brickParticles.pop();
		}
		for (var i = 0; i < brickParticles.length; i++) {
			brickParticles[i].ttl--;
			brickParticles[i].sizeX *= 0.9;
			brickParticles[i].sizeY *= 0.9;
		}

		while (explodeParticles.length !== 0 && explodeParticles[0].ttl < 0) {
			explodeParticles.pop();
		}
		for (var i = 0; i < explodeParticles.length; i++) {
			explodeParticles[i].ttl--;
			explodeParticles[i].x += explodeParticles[i].vx;
			explodeParticles[i].y += explodeParticles[i].vy;
			explodeParticles[i].vx *= 0.8;
			explodeParticles[i].vy *= 0.8;
		}
	};

	var addBrickParticle = function (x, y, sizeX, sizeY, color) {
		brickParticles.push({
			x: x,
			y: y,
			sizeX: sizeX,
			sizeY: sizeY,
			color: color,
			ttl: 30
		});
	};

	var addExplodingParticle = function (x, y, size) {
		for (var i = 0; i < size * size; i++) {
			explodeParticles.push({
				x: x,
				y: y,
				size: Math.random() * size + Math.random() * size,
				vx: (Math.random() - 0.5) * size * size,
				vy: (Math.random() - 0.5) * size * size,
				color: "#F" + Math.floor(Math.random() * 16).toString(16) + "0",
				ttl: 15
			});
		}
	};

	var self = {
		draw: draw,
		update: update,
		addBrickParticle: addBrickParticle,
		addExplodingParticle: addExplodingParticle
	};
	return self;
})();
