'use strict';
var Powerup = (function () {
	var powers = {
		flythru: false,
		holdball: false,
		exploding: false,
		god: false
	};

	var isActivated = function (power) {
		return powers[power];
	};

	var activatePower = function (power) {
		if (powers[power] === undefined) {
			throw "Power " + power + " is undefined";
		}
		powers[power] = true;
	};

	var deActivatePower = function (power) {
		if (powers[power] === undefined) {
			throw "Power " + power + " is undefined";
		}
		powers[power] = false;
	};

	var self = {
		isActivated: isActivated,
		activatePower: activatePower,
		deActivatePower: deActivatePower,
	};
	return self;
})();
