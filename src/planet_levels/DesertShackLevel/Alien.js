export default class Alien {

  constructor(level, x, y, direction)
  {
    this.level = level;
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.move_delay = 50;
    this.move_counter = 0;

    this.living = true;
  }

  update()
  {
    var random = Math.floor(Math.random() * (4));
    this.direction = random;

    if( this.move_counter >= this.move_delay )
    {
      this.move_counter = 0;

      switch( this.direction ) {
        case 0: // moving North
          if(this.level.tilePassable(this.x, this.y - 1)) {
            this.y--;
          }
          break;
        case 1: // moving West
          if(this.level.tilePassable(this.x - 1, this.y)) {
            this.x--;
          }
          break;
        case 2: // moving South
          if(this.level.tilePassable(this.x, this.y + 1)) {
            this.y++;
          }
          break;
        case 3: // moving East
          if(this.level.tilePassable(this.x + 1, this.y)) {
            this.x++;
          }
          break;
      }
    }
    else {
      this.move_counter += 1;
    }
  }

  render(context) {
    context.fillStyle = "red";
    context.beginPath();
    context.arc(this.x * 32 + 16, this.y * 32 + 16, 16, 0, 2*Math.PI);
    context.fill();
  }
}
