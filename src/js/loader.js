/* global Canvas */

'use strict';
(function () {
	var oldLoad = window.onload;
	window.onload = function () {
		if (oldLoad)
			oldLoad();

		console.log("Initizing...");
		Canvas.init(document.getElementById('breakout'));
	};
}());
