/**
 * Loads a tileset from the Tiled program only.
 * Provides rendering logic.
 * Provides tile retrieval and property querying.
 * If customizing, ensure you don't break any existing functionality (eg, if you're using a tilemap not made in Tiled).
 *
 * Properties of tiles can be queried easily:
 *  if(getTile(10, 5)["passable"]) {...}
 * where "passable" is a property defined for the tile in Tiled.
 *
 * Construct with already loaded tileset and tilemaps, and just the path to the image:
 *  new PlanetTileset(
 *    require('path/to/tileset.json'),
 *    require('path/to/tilemap.json'),
 *    'path/to/image.png');
 *
 * See sample planet level for more examples.
 */
export default class PlanetTileset {

  /**
   * Create a new planet tileset.
   * @param tilesetJson - Must be an already loaded tileset (defines each tile type).
   * @param tilemapJson - Must be an already loaded tilemap (defines the map using each of the tile types).
   * @param tilesetImageFilePath - Provide the path relative to the dist folder (ie 'resources/...').
   */
  constructor(tilesetJson, tilemapJson, tilesetImageFilePath) {
    this.imageLoaded = false;
    this.tilesetJson = tilesetJson;

    // Check if the tileset is valid.
    console.assert(
      this.tilesetJson.tilewidth === 32 && this.tilesetJson.tileheight === 32,
      "A planet tileset json is not using 32x32 tiles! Fix the json in Tiled.");

    // Load the tileset image.
    this.tileImage = new Image();
    this.imageLoaded = false;
    this.tileImage.onload = (() => {
      this.imageLoaded = true;
    });
    this.tileImage.src = tilesetImageFilePath;

    /// Load the tileset. Create an array of properties for each tile type which can be easily queried.
    this.tileset = [];
    for(let i = 0; i < this.tilesetJson.tilecount; i++) {
      let properties = [];
      properties["id"] = this.tilesetJson.tiles[i].id;
      properties["imageX"] = this.tilesetJson.spacing + ((i % this.tilesetJson.columns) * (32 + this.tilesetJson.margin));
      properties["imageY"] = this.tilesetJson.spacing + (Math.floor(i / this.tilesetJson.columns) * (32 + this.tilesetJson.margin));

      let jsonProperties = this.tilesetJson.tiles[i].properties;
      for(let j = 0; j < jsonProperties.length; j++) {
        properties[jsonProperties[j].name] = jsonProperties[j].value;
      }

      this.tileset[i] = properties;
    }

    // Prepare the tilemap.
    this.loadNewTilemap(tilemapJson);
  }

  /**
   * Load a new tilemap into this tileset.
   * Overwrites the previous tilemap.
   * @param tilemapJson Loaded tilemap json (created in Tiled.) Use require('path/to/file'). Path is relative to where
   * the require() is used.
   */
  loadNewTilemap(tilemapJson) {
    this.tilemapJson = tilemapJson;

    // Check if the tilemap is correctly set up. This might not be necessary.
    console.assert(
      this.tilemapJson.renderorder === "right-down",
      "A planet tilemap json is not renderorder exported as 'right-down'! Fix the json in Tiled or manually override the json.");

    // Current level width and height (in grid squares) is all defined in the tilemap.json from Tiled.
    this.width = this.tilemapJson.width;
    this.height = this.tilemapJson.height;
    this.numberOfTilesInMap = this.width * this.height;
  }

  /** @method
   * Retrieve the tile object for a tile at the given coordinates.
   * The y coordinate can be omitted if the tiles are being indexed by a single dimension.
   * @param x - X grid coordinate for the requested tile.
   * @param y - Y grid coordinate for the requested tile.
   * @returns An array of properties defined by that tile, including imageX, imageY, and id, as well as other custom
   * properties defined in Tiled.
   */
  getTile(x, y) {
    if(y === undefined) {
      y = 0;
    }

    // We must take the tile id - 1 here because the 0 id within **tilemaps** is reserved for undefined tiles (as per
    // Tiled standard). The id of each tile returned should be what we'd normally expect.
    // Other than this fix, the id's work as expected.
    return this.tileset[this.tilemapJson.layers[0].data[x + (this.tilemapJson.width * y)] - 1];
  }

  /** @method
   * Render the tileset.
   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.
   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
   * @param {CanvasRenderingContext2D} context - the rendering context
   */
  render(elapsedTime, context) {
    if(this.imageLoaded) {
      for(let i = 0; i < this.numberOfTilesInMap; i++) {
        let tile = this.getTile(i);
        context.drawImage(
          this.tileImage,
          tile["imageX"],                                   // X position within the image
          tile["imageY"],                                   // Y position within the image
          32,                                               // Width of the tile within the image
          32,                                               // Height of the tile within the image
          (i % this.tilemapJson.width) * 32,                // X position within the rendered context
          Math.floor(i / this.tilemapJson.width) * 32,   // Y position within the rendered context
          32,                                               // Width of the tile within the rendered context
          32);                                              // Height of the tile within the rendered context
      }
    }
  }
}