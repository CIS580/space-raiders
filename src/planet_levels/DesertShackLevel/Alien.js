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

    this.animationDuration = 150;
    this.animationMsPerImage = 100;

    this.animationXOffset = 0;
    this.animationYOffset = 0;
    this.animationDirection = 0;
    this.animationXOffset = 0;
    this.animationYOffset = 0;
    this.animationTimer = 0;
    this.animationImageSequence = 0;
    this.animationImageTile = undefined;

    this.imagesLoading = 1;
    this.imageJson = "../../../dist/resources/planet_tilesets/DesertShackLevel/crab.png";
    this.image = new Image();
    this.image.onload = (() => {
      this.imagesLoading--;
    });
    this.image.src = "/resources/planet_tilesets/DesertShackLevel/crab.png";

    console.log( this.imageJson );
    console.log( this.image.src );

    /// Load the tileset. Create an array of properties for each tile type which can be easily queried.
    this.tileset = [];
    for(let i = 0; i < this.imageJson.tilecount; i++) {
      let properties = [];
      properties["id"] = i;
      properties["imageX"] = this.imageJson.spacing + ((i % this.imageJson.columns) * (32 + this.imageJson.margin));
      properties["imageY"] = this.imageJson.spacing + (Math.floor(i / this.imageJson.columns) * (32 + this.imageJson.margin));

      this.tileset[i] = properties;
    }

    this.animationImageTile = this.tileset[1];
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
    /*
    context.fillStyle = "red";
    context.beginPath();
    context.arc(this.x * 32 + 16, this.y * 32 + 16, 16, 0, 2*Math.PI);
    context.fill();
    */

    context.drawImage(
        this.image,
        1, //this.animationImageTile["imageX"],                        // X position within the image
        1, //this.animationImageTile["imageY"],                        // Y position within the image
        32,                                                       // Width of the tile within the image
        32,                                                       // Height of the tile within the image
        (this.x) * 32 + this.animationXOffset,                    // X position within the rendered context
        (this.y) * 32 + this.animationYOffset,                    // Y position within the rendered context
        32,                                                       // Width of the tile within the rendered context
        32);                                                      // Height of the tile within the rendered context

  }
}
