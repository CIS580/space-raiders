export default class Zoom {
	constructor(x, y, callback,game)
	{
		this.x = x;
		this.y = y;
		this.callback = callback;
		this.caller = game.gameState[game.gameState.length-1];
	}

	update(elapsedTime,input,game)
	{
		if(input.keyDown('w'))
		{
			this.selected--;
			if(this.selected<0) this.selected = 0;
		}
		if(input.keyDown('s'))
		{
			this.selected++;
			if(this.selected>=this.strings.length) this.selected = this.selected-1;
		}
		if(input.keyDown(' '))
		{
			this.callback(this.strings[this.selected]);
			game.popGameState();
		}
	}

	render(elapsedTime,context,game)
	{
		this.caller.render(elapsedTime,context,game);
		context.beginPath();
		context.fillStyle = "pink";
		context.arc(this.x, this.y,20,0,2*Math.PI);
		context.fillText("<-- FILL WITH PLANET COLOR", this.x+50, this.y);
		context.fillText("Alex will make bigger", this.x+50, this.y+50);
		context.fill();




	}
}
