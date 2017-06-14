/* global Breakout, Paddle, Menu */

'use strict';
var Canvas = (function () {

	var canvas;
	var graphics;
	var lastFrameTime;
	var targetPhysicsRate = 1000 / 60; // Run physics at 60 TPS
	var targetFrameRate = 1000 / 60; // Run frames at 60 FPS
	var mouseDown = false;

	/**
	 * Using requestAnimationFrame instead of a simple `setTimeout` allows us to
	 *  get higher performance, by not blocking the browser when its trying to
	 *  render a frame
	 */
	var _requestAnimFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, targetFrameRate);
			};

	/**
	 * Runs a update tick of the physics calculations 
	 */
	var _update = function () {
		Breakout.update();
		mouseDown = false;
	};

	/**
	 * Runs a update tick of the graphical GUI 
	 */
	var _draw = function () {
		Breakout.draw(graphics);
	};

	var init = function (elm) {
		canvas = elm;
		graphics = canvas.getContext('2d');


		var lastDownTarget = canvas;
		document.addEventListener('mousedown', function (event) {
			lastDownTarget = event.target;
			mouseDown = true;
			var mouseX, mouseY;
			if (event.offsetX) {
				mouseX = event.offsetX;
				mouseY = event.offsetY;
			} else if (event.layerX) {
				mouseX = event.layerX;
				mouseY = event.layerY;
			}
			Paddle.setMouse(mouseX, mouseDown);
			Menu.mouseUpdate(mouseX, mouseY, mouseDown);
		}, false);
		document.addEventListener('keydown', function (event) {
			if (lastDownTarget === canvas) {
				var code = event.keyCode;
				if (code === 39) {
					Paddle.setKeyboardDirection(15);
				} else if (code === 37) {
					Paddle.setKeyboardDirection(-15);
				} else if (code === 27) {
					Menu.pauseGame();
				}
			}
		}, false);
		document.addEventListener('keyup', function (event) {
			var code = event.keyCode;
			if (code === 39 || code === 37) {
				Paddle.setKeyboardDirection(0);
			}
		}, false);
		document.addEventListener('mousemove', function (event) {
			if (canvas === event.target) {
				var mouseX, mouseY;
				if (event.offsetX) {
					mouseX = event.offsetX;
					mouseY = event.offsetY;
				} else if (event.layerX) {
					mouseX = event.layerX;
					mouseY = event.layerY;
				}
				Paddle.setMouse(mouseX, mouseDown);
				Menu.mouseUpdate(mouseX, mouseY, mouseDown);
			}
		}, false);


		var tick = function () {
			var timeInMs = Date.now();
			if (lastFrameTime === undefined || timeInMs - lastFrameTime > 400) {
				// Either missed to many frames, or we are first starting
				// Adjust the frames by a few MS to prevent clock skew from messing with the time
				lastFrameTime = timeInMs - targetPhysicsRate / 10;
				_update();
			} else {
				while (timeInMs - lastFrameTime > targetPhysicsRate) {
					_update();
					lastFrameTime += targetPhysicsRate;
				}
			}
			_draw();
			_requestAnimFrame(tick);
		};
		_requestAnimFrame(tick);
	};
	var self = {
		init: init
	};
	return self;
})();
