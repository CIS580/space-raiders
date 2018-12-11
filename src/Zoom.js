export default class Zoom {
	constructor(x, y, callback,game)
	{
		this.x = x;
		this.y = y;
		this.callback = callback;
		this.caller = game.gameState[game.gameState.length-1];
		this.selected = 0;
	}

	update(elapsedTime,input,game)
	{
		if(input.keyDown(' '))
		{
			console.log(elapsedTime);
			//this.callback(this.strings[this.selected]);
			game.popGameState();
		}
	}

	render(elapsedTime,context,game)
	{
		this.caller.render(elapsedTime,context,game);
		context.beginPath();
		context.fillStyle = "pink";
		context.arc(this.x, this.y,500,0,2*Math.PI);
		context.fill();
		context.closePath();
	}
}
