export default class Altar {
  constructor(x, y,tileset) {
    this.x = x;
    this.y = y;
    this.tileset = tileset;
	this.health = 5;
  }
  render(context) {
	  this.tileset.drawTile(this.x,this.y,23,context);
  }
}
