export default class LizardPeople {
  constructor(x, y, direction, tileset, text) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.text = text;
    this.tileset = tileset;
  }

  render(ctx) {
    switch (this.direction) {
      case 1:
        this.tileset.drawTile(this.x, this.y, 15, ctx);
        break;
      case 2:
        this.tileset.drawTile(this.x, this.y, 16, ctx);
        break;
      case 3:
        this.tileset.drawTile(this.x, this.y, 17, ctx);
        break;
      case 4:
        this.tileset.drawTile(this.x, this.y, 18, ctx);
        break;
    }
  }
}
