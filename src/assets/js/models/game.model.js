let config = require('../config.json');
import Map from './map.model';
import View from '../views/view.js';
import Hud from './hud.model.js';


export default class Game {
    constructor() {
        this.map = new Map(50, 70, config.tileSize);
        this.view = new View();
        this.menu = new Hud();
        this.setup(this.map.mapArray);

        this.currentTile = null;
        this.previousTime = 0.0;
    }


    setup(map) {
        this.view.renderMap(map);
        this.view.renderMenu(this.menu.background, this.menu.buildingButtons);

        // Launch
        window.requestAnimationFrame(time => {
            
            this.previousTime = time;
            loop(time);
        });

        const loop = time => {
            // Compute the delta-time against the previous time
            const dt = time - this.previousTime;   
            // Update the previous time
            this.previousTime = time;
            // Update your game
            this.update(dt);
            // Render your game
            this.render();
            // Repeat
            window.requestAnimationFrame(loop);
          }
    }

    update() {
        if(this.buildMode == true) {
            
        }
    }

    render(tile, color) {
        this.view.render2(tile, color);
    }
}