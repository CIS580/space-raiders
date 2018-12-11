import TempMenu from "./TempMenu"
import Zoom from "./Zoom"
import PlanetLevelManager from "./menus/PlanetLevelManager";
import SamplePlanetLevel from "./planet_levels/SamplePlanetLevel";

export default class Overworld {
	constructor(game)
	{
		this.map = {
			erena: {
				name: "Erena",
				description: "Erena's desolate surface is almost completely covered   in sand. The planet's devasting climate and frequent   high winds gave scientists the impression that Erena   was uninhabitable, but there may be more to Erena than meets the eye...",
				x: 0, y: 0,
				options: ["Sample","Exit"],
				color: "#c2b280"
			},
			clareo: {
				name: "Clareo IV",
				description: "Clareo IV is a luscious forested planet with livable weather conditions for the human species. Despite the accommodating climate, there are foreseen diplomatic problems with Clareo's natives and additional challenges adapting to the planet's flora and fauna.",
				x: 300, y: 45,
				options: ["Exit"],
				color: "#add8e6"
			},
			zuberon: {
				name: "Zuberon",
				description: "Zuberon is completely encased in ice. Its freezing temperatures frequently fall bellow -30°F. Little is known about Zuberon's previous inhabitants, the Satchuan, except that their impact on the planet indicates obvious signs of intelligence.",
				x: -100, y: 180,
				options: ["Exit"],
				color: "#228b22"
			},
			thermos: {
				name: "Thermos",
				description: "Thermos is a treacherous planet, comprised of unrelenting molten lava and razor-sharp obsidian rocks. Oh yea, and the hoard of blood-lusting creatures that roam the surface looking for the next source of food to satisfy their hellish appetites.",
				x: -500, y: -200,
				options: ["Exit"],
				color: "#cf1020"
			}
		};

		this.ShipSprites = new Image;
		this.ShipSprites.src = 'resources/overworld_assets/img/Overworld_Ship_Sprites.png';
		this.BackgroundSprites = new Image;
		this.BackgroundSprites.src = 'resources/overworld_assets/img/Overworld_Background_Sprites.png';
		this.BackgroundAnimationRow = 0;
		this.BackgroundAnimationTimer = 0;
		this.planetSprites = new Image;
		this.planetSprites.src = "resources/overworld_assets/img/colored_planets.png";

		this.map.erena.right = this.map.clareo;
		this.map.clareo.left = this.map.erena;
		this.map.erena.down = this.map.zuberon;
		this.map.zuberon.up = this.map.erena;
		this.map.erena.left = this.map.thermos;
		this.map.thermos.right = this.map.erena;

		this.currentNode = this.map.erena;
		this.nextNode = this.currentNode;
		this.x = 0;
		this.y = 0;
		this.time = 0;
		this.state = "stop";
		this.game = game;

		this.starList = []
		for (var i = 0; i < 50; i++) {
			var star = {
			  x: Math.floor(Math.random() * game.WIDTH),
			  y: Math.floor(Math.random() * game.HEIGHT),
			  vx: Math.floor(Math.random() * 5)
			};
			this.starList.push(star);
		  }

		  this.game.pushGameState(new PlanetLevelManager(new SamplePlanetLevel(),this.callback2));
	}



	lerp(a,min,max)
	{
		if(a<0) return min;
		if(a>1) return max;
		return (1-a)*min+a*max;
	}

	update(elapsedTime, input, game) {
		if(this.state=="stop")
		{

			// TODO: Load inital game state object
			if(input.keyPressed('ArrowUp')&&this.currentNode.up) {
				this.state = "move";
				this.nextNode = this.currentNode.up;
			} else if(input.keyPressed('ArrowLeft')&&this.currentNode.left) {
				this.state = "move";
				this.nextNode = this.currentNode.left;
			} else if(input.keyPressed('ArrowDown')&&this.currentNode.down) {
				this.state = "move";
				this.nextNode = this.currentNode.down;
			} else if(input.keyPressed('ArrowRight')&&this.currentNode.right) {
				this.state = "move";
				this.nextNode = this.currentNode.right;
			}
		} else if(this.state=="move")
		{
			if(this.time<.5)
			{
				this.flag = false;
			} else if(!this.flag){
				this.flag = true;
				//do encounter
				if(Math.random()>.5)
				{
					console.log("Encounter");
				}
			}
			this.time += elapsedTime/1000;
			this.x = this.lerp(this.time,this.currentNode.x,this.nextNode.x);
			this.y = this.lerp(this.time,this.currentNode.y,this.nextNode.y);
			if(this.x==this.nextNode.x&&this.y==this.nextNode.y)
			{
				this.state = "stop";
				this.time = 0;
				this.currentNode = this.nextNode;
				game.pushGameState(new Zoom(game.WIDTH/2, game.HEIGHT/2,this.callback,game, this.currentNode.color));
			}
		}
	}

	callback(string)
	{
		if(string!="Exit")
		{
			var state = null;
			if(string=="Sample") state = new SamplePlanetLevel();
			if(state!=null) this.game.pushGameState(new PlanetLevelManager(state),this.caller.callback2);
		}
	}

	callback2(success)
	{
	}

	drawNode(context,x,y)
	{
		context.beginPath();
		context.fillStyle = "orange";
		context.arc(x,y,20,0,2*Math.PI);
		context.fill();
		context.beginPath();
		context.fillStyle = "yellow";
		context.arc(x,y,18,0,2*Math.PI);
		context.fill();
	}

	nineSlice(x, y, name, color, txt, ctx){
		var textContent = txt;
		var textX = x;
		var textY = y;
		var charArr = Array.from(textContent); //string converted to char arr
		var arrLength = charArr.length; //length of char arr
		var maxLineLength = 55; //max amount of characters on one line
		var planetName = name //string
		var planetColor = color; //hex string
		var lineSpace = 14; //buffer space between lines
		var fontSize = 14; //size of text
		var planetNameLength = 35; //length of space that the planet name and buffer space takes up
		var borderBuffer = 10; //space between text and border
		var borderDimension = 3; //width, or length, of border around text

		var newCharArr = [];
		var lengthCounter = 0; //counts vertical length of text

		ctx.font = fontSize + "px Times New Roman";//font of the Planet Name
		ctx.fillStyle = planetColor; //color of the planet
		ctx.fillText(planetName, textX, textY-6);//writing the Planet Name on screen

		/**
		Since fillText does not have multiline functionality, this for loop allows for that
		fauxI takes the iterator and looks for when i is at the desired max length.
		It then draws the text that has been iterated through on screen and clears the array
		and then moves onto the next line by increasing the lengthCounter
		**/
		for(var i = 0; i < arrLength; i++){
			var fauxI = i % maxLineLength;
			if(fauxI === 0 && charArr[i] === " "){
				newCharArr[fauxI] = "";
			}
			else if(fauxI % (maxLineLength-1) === 0 && fauxI !== 0){
				if(charArr[i+1] !== " " && charArr[i] !== "."){
					newCharArr[fauxI+1] = "-"
				}
				else{
					newCharArr[fauxI+1] = "";
				}
				newCharArr[fauxI] = charArr[i];
				lengthCounter += lineSpace;
				ctx.font = fontSize-2 + "px Arial";
				ctx.fillText(newCharArr.join(""), textX, textY+lengthCounter);
			}
			else{
				newCharArr[fauxI] = charArr[i];
			}

			if(i === arrLength - 1){
				for(var j = fauxI + 1; j < newCharArr.length; j++){
					newCharArr[j] = "";
				}
			}
		}

		//If the array is not after going through the entire char arr, write the remaining text
		//on screen and clear array. Then draw border around it.
		//Otherwise, if the array is empty, create the broder.
		if(newCharArr !== []){
			ctx.font = fontSize-2 + "px Arial";
			ctx.fillStyle = planetColor;
			ctx.fillText(newCharArr.join(""), textX, textY+lengthCounter+lineSpace);
			newCharArr = [];


			ctx.fillStyle = "#696969";
			ctx.fillRect(textX-lineSpace, textY-lineSpace-borderBuffer, borderDimension, lengthCounter+lineSpace+planetNameLength); //left border (x, y, width, length)
			ctx.fillRect(textX-lineSpace+(maxLineLength*(Math.floor(fontSize/2.3))), textY-lineSpace-borderBuffer, borderDimension, lengthCounter+lineSpace+planetNameLength+2); //right border
			//(x, y, width, length)
			ctx.fillRect(textX-lineSpace, textY-lineSpace-borderBuffer, maxLineLength*(Math.floor(fontSize/2.3)), borderDimension);//top border (x, y, width, length)
			ctx.fillRect(textX-lineSpace, textY+lengthCounter+lineSpace+borderBuffer, maxLineLength*(Math.floor(fontSize/2.3)), borderDimension); //bottom border (x, y, width, length)
		}
		else{
			ctx.fillStyle = "#696969";
			ctx.fillRect(textX-lineSpace, textY-lineSpace-borderBuffer, borderDimension, lengthCounter+lineSpace+planetNameLength); //left border (x, y, width, length)
			ctx.fillRect(textX-lineSpace+(maxLineLength*(Math.floor(fontSize/2.3))), textY-lineSpace-borderBuffer, borderDimension, lengthCounter+lineSpace+planetNameLength+2); //right border
			//(x, y, width, length)
			ctx.fillRect(textX-lineSpace, textY-lineSpace-borderBuffer, maxLineLength*(Math.floor(fontSize/2.3)), borderDimension);//top border (x, y, width, length)
			ctx.fillRect(textX-lineSpace, textY+lengthCounter+lineSpace+borderBuffer, maxLineLength*(Math.floor(fontSize/2.3)), borderDimension); //bottom border (x, y, width, length)
		}
	}

	drawLine(context,game,x1,y1,x2,y2)
	{
		context.beginPath();
		context.strokeStyle = "orange";
		context.lineWidth = 2;
		context.moveTo(x1-this.x+game.WIDTH/2,y1-this.y+game.HEIGHT/2);
		context.lineTo(x2-this.x+game.WIDTH/2,y2-this.y+game.HEIGHT/2);
		context.stroke();
	}

	drawPlanet(context,game,index,x,y)
	{
		context.drawImage(this.planetSprites,Math.floor(index/2)*64,Math.floor(index%2)*64,64,64,x-32-this.x+game.WIDTH/2,y-32-this.y+game.HEIGHT/2,64,64);
	}

	  /** @method
		* Renders the starting screen.
		* @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
		* @param {CanvasRenderingContext2D} context - the rendering context
		*/
	render(elapsedTime, context,game) {
		var vx = 0;
		var vy = 0;
		if(this.state=="move")
		{
			vx = this.currentNode.x-this.nextNode.x;
			vy = this.currentNode.y - this.nextNode.y;
		}
		var star;
	    for(var i=0, j=this.starList.length; i<j; i++) {
			star = this.starList[i];

			star.x += elapsedTime/1000*vx*star.vx/5;
			star.y += elapsedTime/1000*vy*star.vx/5;
			if(star.x < -star.vx){
				star.x = this.game.WIDTH;
				star.y = Math.floor(Math.random() * this.game.HEIGHT)
			} else if(star.y<-star.vx) {
				star.x = Math.floor(Math.random()*this.game.WIDTH)
				star.y = this.game.HEIGHT;
			} else if(star.x>this.game.WIDTH+star.vx)
			{
				star.x = 0;
				star.y = Math.floor(Math.random() * this.game.HEIGHT)
			} else if(star.y>this.game.HEIGHT+star.vx)
			{
				star.x = Math.floor(Math.random()*this.game.WIDTH)
				star.y = 0;
			}
			context.fillStyle = "white";
			context.beginPath();
			context.arc(star.x, star.y, .1+ star.vx, 0, Math.PI * 2, true);
			context.closePath();
			context.fill();
		}

		context.save();
		this.drawLine(context,game,this.map.erena.x,this.map.erena.y,this.map.clareo.x,this.map.clareo.y);
		this.drawLine(context,game,this.map.erena.x,this.map.erena.y,this.map.zuberon.x,this.map.zuberon.y);
		this.drawLine(context,game,this.map.erena.x,this.map.erena.y,this.map.thermos.x,this.map.thermos.y);

		this.drawPlanet(context,game,0,this.map.erena.x,this.map.erena.y);
		this.drawPlanet(context,game,1,this.map.clareo.x,this.map.clareo.y);
		this.drawPlanet(context,game,2,this.map.zuberon.x,this.map.zuberon.y);
		this.drawPlanet(context,game,3,this.map.thermos.x,this.map.thermos.y);

		//this.drawNode(context,this.map.erena.x-this.x+game.WIDTH/2,this.map.erena.y-this.y+game.HEIGHT/2);
		//this.drawNode(context,this.map.clareo.x-this.x+game.WIDTH/2,this.map.clareo.y-this.y+game.HEIGHT/2);
		//this.drawNode(context,this.map.zuberon.x-this.x+game.WIDTH/2,this.map.zuberon.y-this.y+game.HEIGHT/2);
		//this.drawNode(context,this.map.thermos.x-this.x+game.WIDTH/2,this.map.thermos.y-this.y+game.HEIGHT/2);

		//TODO draw player

		context.save();
		context.translate(game.WIDTH/2,game.HEIGHT/2);
		if(this.state=="move")
		{
			context.rotate(Math.atan2(this.nextNode.y-this.currentNode.y,this.nextNode.x-this.currentNode.x));
		}
		context.translate(-game.WIDTH/2,-game.HEIGHT/2);
		context.fillStyle = "red";
		context.fillRect(game.WIDTH/2-16,game.HEIGHT/2-16,32,32);
		context.restore();

		context.restore();

		this.renderBackgroundSprites(context,elapsedTime);

		//textbox rendering, done after the background sprite render so that the stars don't
		//overlap the text
		if(this.state === "stop"){
			this.nineSlice((game.WIDTH/2)-150, 650, this.currentNode.name, this.currentNode.color, this.currentNode.description, context);
		}
	}

	renderBackgroundSprites(context,elapsedTime){

		if(this.BackgroundAnimationTimer >= 300){
			this.BackgroundAnimationRow++;
			if(this.BackgroundAnimationRow > 3){
				this.BackgroundAnimationRow = 0;
			}
			this.BackgroundAnimationTimer = 0;
		}

		context.drawImage(this.BackgroundSprites,3 * 63,this.BackgroundAnimationRow * 63,63,63,100-this.x,100-this.y,63,63);
		context.drawImage(this.BackgroundSprites,4 * 63,this.BackgroundAnimationRow * 63,63,63,50-this.x,600-this.y,63,63);

		context.drawImage(this.BackgroundSprites,2 * 32, 256 + this.BackgroundAnimationRow * 32,32,32,800-this.x,700-this.y,32,32);
		context.drawImage(this.BackgroundSprites,0 * 32, 256 + this.BackgroundAnimationRow * 32,32,32,500-this.x,30-this.y,32,32);

		context.drawImage(this.BackgroundSprites,0 * 32, 386,32,32,500-this.x,600-this.y,32,32);
		context.drawImage(this.BackgroundSprites,2 * 32, 386,32,32,700-this.x,150-this.y,32,32);

		this.BackgroundAnimationTimer += elapsedTime;
	}
}
