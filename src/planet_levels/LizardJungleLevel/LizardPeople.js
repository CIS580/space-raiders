export default class LizardPeople {
  constructor(x, y, direction, tileset, text) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.text = text;
    this.tileset = tileset;
    this.count = 1;
  }

  update(elapsedTime) {
    this.count++;
    if ((this.count % 45 === 0) && (this.x === 7)) {
      this.direction = Math.floor(Math.random()*3)+1;
      this.count = 0;
    }
    else if ((this.count % 75 === 0) && (this.x === 12)) {
      this.direction = Math.floor(Math.random()*3)+1;
      this.count = 0;
    }
    else if ((this.count % 90 === 0) && (this.x === 21)) {
      this.direction = Math.floor(Math.random()*3)+1;
      this.count = 0;
    }
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
