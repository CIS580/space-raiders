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
      properties["id"] = i;
      properties["imageX"] = this.tilesetJson.spacing + ((i % this.tilesetJson.columns) * (32 + this.tilesetJson.margin));
      properties["imageY"] = this.tilesetJson.spacing + (Math.floor(i / this.tilesetJson.columns) * (32 + this.tilesetJson.margin));

      this.tileset[i] = properties;
    }

    for(let i = 0; i < this.tilesetJson.tiles.length; i++) {
      let jsonProperties = this.tilesetJson.tiles[i].properties;
      let id = this.tilesetJson.tiles[i].id;
      for(let j = 0; j < jsonProperties.length; j++) {
        this.tileset[id][jsonProperties[j].name] = jsonProperties[j].value;
      }
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
    this.tilemapOrder = [];
    for(let layerIndex = 0; layerIndex < this.tilemapJson.layers.length; layerIndex++) {
      if(this.tilemapJson.layers[layerIndex].type === "tilelayer") {
        this.tilemapOrder.push({
          id: this.tilemapJson.layers[layerIndex].id,
          location: layerIndex
        });
      }
    }
    this.tilemapOrder.sort((a, b) => { return a.id - b.id; });
  }

  /** @method
   * Retrieve the highest layer tile object for a tile at the given coordinates.
   * The y coordinate can be omitted if the tiles are being indexed by a single dimension.
   * @param x - X grid coordinate for the requested tile.
   * @param y - Y grid coordinate for the requested tile.
   * @returns An array of properties defined by that tile, including imageX, imageY, and id, as well as other custom
   * properties defined in Tiled. The highest layer with an actual tile in this location is returned.
   */
  getTile(x, y) {
    if(y === undefined) {
      y = 0;
    }

    let highestTile = undefined;
    this.getStackedTiles(x, y).reverse().some((value) => {
      if(value !== undefined) {
        highestTile = value;
        return true;
      }
      return false;
    });
    return highestTile;
  }

  /** @method
   * Retrieves all tiles at the given coordinates (if using multiple layers in Tiled).
   * THe y coordinate can be omitted if the tiles are being index by a single dimension.
   * @param x - X grid coordinate to retrieve from.
   * @param y - Y grid coordinate to retrieve from.
   * @returns {array} List of tiles for the provided coordinates where the "key" or index for each item is the layer id
   * that the tile is found on.
   * NOTE: Layer ID's start from 1 in Tiled, not 0! Requesting the 0 index will return undefined for this array.
   */
  getStackedTiles(x, y) {
    if(y === undefined) {
      y = 0;
    }

    let tiles = [];
    for(let i = 0; i < this.tilemapOrder.length; i++) {
      let layerIndex = this.tilemapOrder[i].location;

      // We must take the tile id - 1 here because the 0 id within **tilemaps** is reserved for undefined tiles (as
      // per Tiled standard). The id of each tile returned should be what we'd normally expect.
      // Other than this fix, the id's work as expected.
      let tileId = this.tilemapJson.layers[layerIndex].data[x + (this.tilemapJson.width * y)] - 1;

      // -1 refers to undefined (unspecified) tiles in this layer.
      if(tileId !== -1) {
        // For some reason Tiled may "wrap" the tileId to be realId + (n * tilesetCount)
        // To get the actual tile, we mod the tilecount.
        tiles[this.tilemapJson.layers[layerIndex].id] = this.tileset[tileId % this.tilesetJson.tilecount];
      }
    }
    return tiles;
  }

  /** @method
   * Render the tileset.
   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.
   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame
   * @param {CanvasRenderingContext2D} context - the rendering context
   */
  render(elapsedTime, context) {
    if(this.imageLoaded) {
      // We don't use the getStackedTiles function here primarily for efficiency.
      // We want to draw each layer in order, then go to the next layer (instead of tile by tile) to avoid cache miss.

      // Draw each layer
      for(let i = 0; i < this.tilemapOrder.length; i++) {
        let layerIndex = this.tilemapOrder[i].location;
        // Draw each tile
        for(let tilemapIndex = 0; tilemapIndex < this.numberOfTilesInMap; tilemapIndex++) {
          // Only draw the tile if the tile exists
          // Non-existent tiles in a layer are 0 in JSON with each tile id for every other tile incremented by one
          // We subtract 1 here to offset this, so -1 is non-existent and 0 and above is the actual tile id.
          let tileId = this.tilemapJson.layers[layerIndex].data[tilemapIndex] - 1;
          if(tileId !== -1) {
            // For some reason Tiled may "wrap" the tileId to be realId + (n * tilesetCount)
            // To get the actual tile, we mod the tilecount.
            let tile = this.tileset[tileId % this.tilesetJson.tilecount];
            context.drawImage(
              this.tileImage,
              tile["imageX"],                                           // X position within the image
              tile["imageY"],                                           // Y position within the image
              32,                                                       // Width of the tile within the image
              32,                                                       // Height of the tile within the image
              (tilemapIndex % this.tilemapJson.width) * 32,             // X position within the rendered context
              Math.floor(tilemapIndex / this.tilemapJson.width) * 32,   // Y position within the rendered context
              32,                                                       // Width of the tile within the rendered context
              32);                                                      // Height of the tile within the rendered context
          }
        }
      }
    }
  }
}