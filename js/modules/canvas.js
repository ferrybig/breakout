'use strict';
var Canvas = (function(){
	
	var canvas = undefined;
	var graphics = undefined;
	var lastFrameTime = undefined;
	var targetPhysicsRate = 1000 / 30; // Run physics at 30 TPS
	var targetFrameRate = 1000 / 60; // Run frames at 60 FPS

	/**
	 * Using requestAnimationFrame instead of a simple `setTimeout` allows us to
	 *  get higher performance, by not blocking the browser when its trying to
	 *  render a frame
	 */
	var _requestAnimFrame = window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame 
		|| window.mozRequestAnimationFrame
		|| function(callback) {
			window.setTimeout(callback, targetFrameRate);
		};
	
	/**
	 * Runs a update tick of the physics calculations 
	 */
	var _update = function() {
		Breakout.update();
	};
	
	/**
	 * Runs a update tick of the graphical GUI 
	 */
	var _draw = function() {
		Breakout.draw(graphics);
	};
	
	var init = function(elm) {
		canvas = elm;
		graphics = canvas.getContext('2d');
		
		
		var lastDownTarget = canvas;
		document.addEventListener('mousedown', function(event) {
			lastDownTarget = event.target;
		}, false);
		document.addEventListener('keydown', function(event) {
			if(lastDownTarget == canvas) {
				var code = event.keyCode;
				if (code == 39) {
					Paddle.setKeyboardDirection(15);
				} else if(code == 37) {
					Paddle.setKeyboardDirection(-15);
				}
			}
		}, false);
		document.addEventListener('keyup', function(event) {
			var code = event.keyCode;
			if (code == 39 || code == 37) {
				Paddle.setKeyboardDirection(0);
			}
		}, false);
		document.addEventListener('mousemove', function(event) {
			if(canvas == event.target) {
				var mouseX;
				if(event.offsetX) {
					mouseX = event.offsetX;
				} else if(event.layerX) {
					mouseX = event.layerX;
				}
				Paddle.setMouseX(mouseX);
			}
		}, false);
		
		
		var tick = function() {
			var timeInMs = Date.now();
			if(lastFrameTime === undefined || timeInMs - lastFrameTime > 200) {
				// Either missed to many frames, or we are first starting
				// Adjust the frames by a few MS to prevent clock skew from messing with the time
				lastFrameTime = timeInMs - targetPhysicsRate / 10;
				_update();
			} else {
				while(timeInMs - lastFrameTime > targetPhysicsRate) {
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
		init: init,
	};
	return self;
})();