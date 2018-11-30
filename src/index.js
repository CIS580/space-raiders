import Game from './game';
import css from './index.css';

var game = new Game((32*32), (24*32)); //1024 x 768 (could be changed as long as factor of 32)
game.loop();
