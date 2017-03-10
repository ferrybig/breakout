var Score = (function() {
	var score = 0;
	var pointsCounter = 0;
	var lives = 3;
	
	var addScore = function(points) {
		pointsCounter += points;
	};
	
	var directUpdateScore = function() {
		score += pointsCounter;
		pointsCounter = 0;
	};
	
	var addLive = function() {
		lives += 1;
	};
	
	var reset = function() {
		 score = 0;
		 lives = 3;
		 pointsCounter = 0;
	};
	
	var draw = function(graphics) {
		graphics.beginPath();
		graphics.fillStyle = "#FFFF00";
		graphics.strokeStyle = "#FFFFFF";
		graphics.font = "24px serif";
		graphics.textAlign = "left";
		
		if(pointsCounter > 0) {
			graphics.strokeText('Score: ' + score + ' (+' + pointsCounter + ")", 5, 15);
			graphics.fillText('Score: ' + score + ' (+' + pointsCounter + ")", 5, 15);
		} else {
			graphics.strokeText('Score: ' + score , 5, 15);
			graphics.fillText('Score: ' + score , 5, 15);
		}
		graphics.strokeText('Lives: ' + lives , 5, 45);
		graphics.fillText('Lives: ' + lives , 5, 45);
		graphics.closePath();
	};
	
	var update = function() {
		if(pointsCounter === 0)
			return;
		if(pointsCounter > 100) {
			var pointAdjustment = Math.pow(10, Math.floor(Math.log(pointsCounter) / Math.log(10)) - 1);
		} else { 
			var pointAdjustment = pointsCounter;
		}
			
		score += pointAdjustment;
		pointsCounter -= pointAdjustment;
	};
	
	var ballDestroyed = function() {
		if(lives > 0) {
			Ball.respawn();
			Paddle.respawn();
			lives--;
		}
	};
	
	var self = {
		addScore: addScore,
		directUpdateScore: directUpdateScore,
		reset: reset,
		draw: draw,
		update: update,
		ballDestroyed: ballDestroyed,
	};
	return self;
})();