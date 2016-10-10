const Platform = (function () {
	var canvas, context, lastTime, animations, fps;
	var Platform = Object.create({});

	var nextAnimFrame = (function ()
	{
		var func;

		func = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function () 
			{
				throw 'implement this!'
			}
		return func;
	})()

	var calcFPS = function () 
	{
		var now, fps;
		now = new Date();
		fps = 1000 / (now - lastTime)
		lastTime = now;
		return fps;
	}

	var cleanCanvas = function ()
	{
		context.clearRect(0,0,canvas.width,canvas.height)
	}

	var animate = function () 
	{
		cleanCanvas();
		fps = calcFPS();
		for (var i = 0; i < animations.length; i++) {
			animations[i]();
		}
		nextAnimFrame(animate);
	}

	startAnimation = function () 
	{
		lastTime = new Date();
		nextAnimFrame(animate);
	}

	init = function (cvs) 
	{
		var dX = 0;
		var dY = 0;
		var velocity = 100;
		var deltaX = 0;
		var deltaY = 0;
		var add = true;
		var subtract = false;

		canvas = cvs;
		context = canvas.getContext('2d');

		animations = [
			function () {
				if (add)
				{
					deltaX = (velocity / fps);
					deltaY = (velocity / fps);
					dX += deltaX;
					dY += deltaY;
					add = dX + 20 <= canvas.width && dY + 20 <= canvas.height;
					subtract = !add;
				}
				else if (subtract)
				{
					deltaX = velocity / fps
					deltaY = velocity / fps
					dX -= deltaX;
					dY -= deltaY;
					subtract = dY + 20 >= 0 && dY + 20 >= 0;
					add = !subtract;
				}
				context.fillRect(dX,dY,20,20);
			}
		];
	}

	return {
		start: startAnimation,
		init: init
	};
})();

var platform = Object.create(Platform);

platform.init(document.getElementById('game'));
platform.start();