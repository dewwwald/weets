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
		var d = 0;
		var velocity = 1000;
		var delta = 0;
		var add = true;
		var subtract = false;

		canvas = cvs;
		context = canvas.getContext('2d');

		animations = [
			function () {
				if (add)
				{
					delta = (velocity / fps);
					d += delta;
					add = d + 20 <= canvas.width;
					subtract = !add;
				}
				else if (subtract)
				{
					delta = velocity / fps
					d -= delta;					
					subtract = d + 20 >= 0;
					add = !subtract;
				}
				context.fillRect(d,d,20,20);
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