
/** Path to folder assets are in */
const ASSET_FOLDER = 'resources/space/';        // TODO: Figure out correct way how to include images

/** Type of asset files */
const ASSET_FILE_TYPE = '.png';

/**
 * @class AssetLoader
 *
 * A class providing means to load assets
 */
class AssetLoader {

    /**
     * Constructs object for loading assets
     */
    constructor() {
        if (!AssetLoader.instance) {
            AssetLoader.instance = this;

            this.loadedImages = [];
            this.preloadImages();
        }

        return AssetLoader.instance;
    }

    /**
     * Preloads images needed
     */
    preloadImages() {
        this.getAsset("starBackground");

        this.getAsset("player");
        this.getAsset("playerLeft");
        this.getAsset("playerRight");
        this.getAsset("jetFlame1");
        this.getAsset("jetFlame2");
        this.getAsset("shield");

        // TODO: Preload required images
    }

    /**
     * Retrieves asset specified by its name
     *
     * @param {String} name - name of asset to retrieve
     * @returns Required asset
     */
    getAsset(name) {
        if (this.loadedImages[name]) {
            return this.loadedImages[name];
        } else {
            let image = new Image();
            image.src = ASSET_FOLDER + name + ASSET_FILE_TYPE;

            this.loadedImages[name] = image;
            return image;
        }
    }
}

/** The only instance of this singleton */
const assetLoader = new AssetLoader();
Object.freeze(assetLoader);

export default assetLoader;