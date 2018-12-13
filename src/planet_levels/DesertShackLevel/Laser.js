export default class Laser {

  constructor(level, x, y, direction)
  {
    this.level = level;
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.move_delay = 5;
    this.move_counter = 0;
    this.max_distance = 5;
    this.distance_traveled = 0;
    this.living = true;
  }

  update()
  {
    if( this.move_counter >= this.move_delay )
    {
      this.move_counter = 0;

      if (this.direction == 0) // moving North
      {
        if(this.level.tilePassable(this.x, this.y - 1)) {
          this.y--;
          this.distance_traveled++;
        }
        else {
          this.living = false;
        }
      }
      else if (this.direction == 1) // moving West
      {
        if(this.level.tilePassable(this.x - 1, this.y)) {
          this.x--;
          this.distance_traveled++;
        }
        else {
          this.living = false;
        }
      }
      else if (this.direction == 2) // moving South
      {
        if(this.level.tilePassable(this.x, this.y + 1)) {
          this.y++;
          this.distance_traveled++;
        }
        else {
          this.living = false;
        }
      }
      else if (this.direction == 3) // moving East
      {
        if(this.level.tilePassable(this.x + 1, this.y)) {
          this.x++;
          this.distance_traveled++;
        }
        else {
          this.living = false;
        }
      }
    }
    else {
      this.move_counter += 1;
    }

    if (this.distance_traveled > this.max_distance)
      this.living = false;
  }

  render(context) {
    context.fillStyle = "blue";
    context.beginPath();
    context.arc(this.x * 32 + 16, this.y * 32 + 16, 2, 0, 2*Math.PI);
    context.fill();
  }
}
