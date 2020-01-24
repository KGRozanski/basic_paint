import '../scss/style.scss';
import Game from './models/game.model.js';

class Controller {
    constructor() {
        this.state = {
            money: 0,
            profits: 1,
            hoveredTile: null,
            menuSelectedItem: false,
        };
        this.game = new Game(this.state);
    }




}

const ctrl = new Controller();

