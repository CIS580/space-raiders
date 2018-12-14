export default class TempMenu {
	constructor(strings,callback,game)
	{
		this.selected = 0;
		this.strings = strings;
		this.callback = callback;
		this.caller = game.gameState[game.gameState.length-1];
		this.game = game;
    }

    render(elapsedTime,context,game){
        this.caller.render(elapsedTime,context,game);

        var grd = screenCtx.createRadialGradient(WIDTH/2,HEIGHT/2,WIDTH/2+WIDTH/4,WIDTH/2,HEIGHT/2,WIDTH/4);
        grd.addColorStop(0,"red");
        grd.addColorStop(1,"rgba(0, 0, 0,0)");
        // Fill with gradient
        screenCtx.fillStyle = grd;
        screenCtx.fillRect(0,0,WIDTH,HEIGHT);
        //Draw Text
        screenCtx.fillStyle = "#555555";
        screenCtx.fillRect(WIDTH/4-5, HEIGHT/5*4-5, WIDTH/2+10, 50+10);
        screenCtx.fillStyle = "#999999";
        screenCtx.fillRect(WIDTH/4, HEIGHT/5*4, WIDTH/2, 50);
        screenCtx.fillStyle = "#ff0000";
        screenCtx.font="30px Arial";
        screenCtx.fillText("HOSTILE DETECTED", WIDTH/4+35,HEIGHT/5*4+35)
    }
}