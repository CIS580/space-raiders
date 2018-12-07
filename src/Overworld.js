import TempMenu from "./TempMenu"

export default class Overworld {
	constructor(game)
	{
		this.map = {
			start: {
				x: 0, y: 0,
				img: null,
				description: ""
			},
			test: {
				x: 100, y: 10
			}
		};
		
		this.ShipSprites = new Image;
		this.ShipSprites.src = 'resources/Overworld_Ship_Sprites.png';
		this.BackgroundSprites = new Image;
		this.BackgroundSprites.src = 'resources/Overworld_Background_Sprites.png';
		this.BackgroundAnimationRow = 0;
		this.BackgroundAnimationTimer = 0;
		
		this.map.start.right = this.map.test;
		this.map.test.left = this.map.start;
		
		this.currentNode = this.map.start;
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
			if(input.keyPressed('w')&&this.currentNode.up) {
				this.state = "move";
				this.nextNode = this.currentNode.up;
			} else if(input.keyPressed('a')&&this.currentNode.left) {
				this.state = "move";
				this.nextNode = this.currentNode.left;
			} else if(input.keyPressed('s')&&this.currentNode.down) {
				this.state = "move";
				this.nextNode = this.currentNode.down;
			} else if(input.keyPressed('d')&&this.currentNode.right) {
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
				game.pushGameState(new TempMenu(["hello","hi"],this.callback,game));
			}
		}
	}
	
	callback(string)
	{
		console.log(string);
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
	
	drawLine(context,game,x1,y1,x2,y2)
	{
		context.beginPath();
		context.strokeStyle = "orange";
		context.lineWidth = 2;
		context.moveTo(x1-this.x+game.WIDTH/2,y1-this.y+game.HEIGHT/2);
		context.lineTo(x2-this.x+game.WIDTH/2,y2-this.y+game.HEIGHT/2);
		context.stroke();
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
		
		if(this.currentNode.up)
		{
			this.drawLine(context,game,this.currentNode.x,this.currentNode.y,this.currentNode.up.x,this.currentNode.up.y);
		}
		if(this.currentNode.left)
		{
			this.drawLine(context,game,this.currentNode.x,this.currentNode.y,this.currentNode.left.x,this.currentNode.left.y);
		}
		if(this.currentNode.down)
		{
			this.drawLine(context,game,this.currentNode.x,this.currentNode.y,this.currentNode.down.x,this.currentNode.down.y);
		}
		if(this.currentNode.right)
		{
			this.drawLine(context,game,this.currentNode.x,this.currentNode.y,this.currentNode.right.x,this.currentNode.right.y);
		}
		
		this.drawNode(context,this.currentNode.x-this.x+game.WIDTH/2,this.currentNode.y-this.y+game.HEIGHT/2);
		
		if(this.currentNode.up)
		{
			this.drawNode(context,this.currentNode.up.x-this.x+game.WIDTH/2,this.currentNode.up.y-this.y+game.HEIGHT/2);
		}
		if(this.currentNode.left)
		{
			this.drawNode(context,this.currentNode.left.x-this.x+game.WIDTH/2,this.currentNode.left.y-this.y+game.HEIGHT/2);
		}
		if(this.currentNode.down)
		{
			this.drawNode(context,this.currentNode.down.x-this.x+game.WIDTH/2,this.currentNode.down.y-this.y+game.HEIGHT/2);
		}
		if(this.currentNode.right)
		{
			this.drawNode(context,this.currentNode.right.x-this.x+game.WIDTH/2,this.currentNode.right.y-this.y+game.HEIGHT/2);
		}
		
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