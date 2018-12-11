import TempMenu from "./TempMenu";

export default class Zoom {
	constructor(x, y, callback,game)
	{
		this.x = x;
		this.y = y;
		this.callback = callback;
		this.caller = game.gameState[game.gameState.length-1];
		this.selected = 0;
		this.counter = 0;
	}

	update(elapsedTime,input,game)
	{

		/*if(input.keyDown(' '))
		{
			console.log("in space");
			//this.callback(this.strings[this.selected]);
			game.popGameState();
		}*/
		this.counter += 5;

		if (this.counter > 250) {
			this.counter = 250;
			if(!this.flag)
			{
				this.flag = true;
				game.pushGameState(new TempMenu(this.caller.currentNode.options,this.caller.callback,game));
			}
		}
	}

	render(elapsedTime,context,game)
	{
		this.caller.render(elapsedTime,context,game);
		context.beginPath();
		context.fillStyle = "pink";
		context.arc(this.x, this.y,Math.floor(this.counter),0,2*Math.PI);
		context.fill();
		context.closePath();
	}
}
