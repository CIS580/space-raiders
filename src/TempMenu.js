export default class TempMenu {
	constructor(strings,callback,game)
	{
		this.selected = 0;
		this.strings = strings;
		this.callback = callback;
		this.caller = game.gameState[game.gameState.length-1];
		this.game = game;
		this.loadSound = new Audio;
		this.loadSound.src = "resources/overworld_assets/sfx/planet_click.wav";
		this.loadSound.volume = .2;
	}

	update(elapsedTime,input,game)
	{
		if(input.keyDown('ArrowDown'))
		{
			this.selected++;
			if(this.selected>=this.strings.length) this.selected = this.strings.length-1;
		}
		if(input.keyDown('ArrowUp'))
		{
			this.selected--;
			if(this.selected<0) this.selected = 0;
		}
		if(input.keyDown(' '))
		{
			
			if(this.strings[this.selected] != "Exit") this.loadSound.play();
			
			game.popGameState();
			game.popGameState();
			this.callback(this.strings[this.selected]);
		}
	}

	render(elapsedTime,context,game)
	{
		this.caller.render(elapsedTime,context,game);
		context.fillStyle = "#444444";
		context.fillRect(0,0,110, this.strings.length *20+30);
		context.fillStyle = "#222222";
		context.fillRect(5,5,100,this.strings.length *20 +20);
		context.fillStyle = "white";
		context.font = "20 px Arial";
		for(let i = 0; i < this.strings.length; i++)
		{
		context.fillText(this.strings[i],(i==this.selected?20:10),i*20+20);
		}
	}
}
