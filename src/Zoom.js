import TempMenu from "./TempMenu";

export default class Zoom {
	constructor(x, y, callback,game, color, name)
	{
		this.x = x;
		this.y = y;
		this.callback = callback;
		this.caller = game.gameState[game.gameState.length-1];
		this.selected = 0;
		this.counter = 50;
		this.color = color;
		this.name = name;
		this.planetSprites = new Image;
		this.planetSprites.src = "resources/overworld_assets/img/colored_planets.png";
		this.zoomSound = new Audio;
		this.soundFlag = false;
		this.zoomSound.src = "resources/overworld_assets/sfx/planet_hover.wav";
		this.zoomSound.volume = .2;
	}

	update(elapsedTime,input,game)
	{
		/*
		//this is just for one little sound when the zoom first is pushed as a gameState
		if(!this.soundFlag){
			this.zoomSound.play();
			this.soundFlag = true;
		}
		*/
		
		//Don't uncomment this
		/*if(input.keyDown(' '))
		{
			//this.callback(this.strings[this.selected]);
			game.popGameState();
		}*/
		this.counter += 3;

		if (this.counter > 300) {
			this.counter = 300;

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
		context.imageSmoothingEnabled = false;
		if(this.planetSprites.complete){
			this.caller.render(elapsedTime,context,game);
			//the numbers are supposed to not be exact 64, weird white edges were appearing, please dont change ;)))))
			if(this.name === "Erena")context.drawImage(this.planetSprites,0,0,64,64,game.WIDTH/2 - this.counter/2,game.HEIGHT/2 - this.counter/2,this.counter,this.counter);
			if(this.name === "Zuberon")context.drawImage(this.planetSprites,0,64,64,64,game.WIDTH/2 - this.counter/2,game.HEIGHT/2 - this.counter/2,this.counter,this.counter);
			if(this.name === "Thermos")context.drawImage(this.planetSprites,65,64,64,64,game.WIDTH/2 - this.counter/2,game.HEIGHT/2 - this.counter/2,this.counter,this.counter);
			if(this.name === "Clareo IV")context.drawImage(this.planetSprites,65,0,64,64,game.WIDTH/2 - this.counter/2,game.HEIGHT/2 - this.counter/2,this.counter,this.counter);

	}
 }
}
