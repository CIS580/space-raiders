
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
        this.getAsset("player");
        this.getAsset("playerLeft");
        this.getAsset("playerRight");
        this.getAsset("jetFlame1");
        this.getAsset("jetFlame2");
        this.getAsset("shield");

        this.getAsset("loophole");
        this.getAsset("winhole");
        this.getAsset("black-hole");

        this.getAsset("spaceBackground/starBackground");
        this.getAsset("spaceBackground/starSmall");
        this.getAsset("spaceBackground/starBig");
        for (let i = 1; i <= 12; i++) {
            this.getAsset("spaceBackground/planet-" + i );
        }

        this.getAsset("barrel");
        this.getAsset("barrel_inactive");

        for (let i = 0; i <= 31; i++) {
            this.getAsset("expl_08/expl_08_00" + i );
        }


        // Aparently there is some importing issue and it cant get it directly from Asteroids.js
        ["001","002","003","004"].forEach(ass => {
            this.getAsset("spaceMeteors/" + ass)
        });

        this.getAsset("DUX");

        // TODO: Preload all required images
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