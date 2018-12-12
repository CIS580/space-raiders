import TempMenu from "./TempMenu";

export default class Zoom {
	constructor(x, y, callback,game, color)
	{
		this.x = x;
		this.y = y;
		this.callback = callback;
		this.caller = game.gameState[game.gameState.length-1];
		this.selected = 0;
		this.counter = 0;
		this.color = color;
	}

	update(elapsedTime,input,game)
	{

		//Don't uncomment this
		/*if(input.keyDown(' '))
		{
			//this.callback(this.strings[this.selected]);
			game.popGameState();
		}*/
		this.counter += 5;

		if (this.counter > 242) {
			this.counter = 242;
			
			//Don't erase this again
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
		context.fillStyle = this.color;
		context.arc(this.x, this.y,Math.floor(this.counter),0,2*Math.PI);
		context.fill();
		context.closePath();
	}
}
