export default class TempMenu {
	constructor(strings,callback,game)
	{
		this.selected = 0;
		this.strings = strings;
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
		context.fillStyle = "black";
		context.fillRect(0,0,100,100);
		context.fillStyle = "white";
		context.font = "30px Arial";
		for(let i = 0; i < this.strings.length; i++)
		{
		context.fillText(this.strings[i],(i==this.selected?10:0),i*32+20);	
		}
	}
}