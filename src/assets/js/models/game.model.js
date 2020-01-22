let config = require('../config.json');
import Map from './map.model';
import View from '../views/view.js';

var lastRender = 0;

export default class Game {
    constructor(state) {
        this.state = state;
        this.map = new Map(50, 70, config.tileSize);
        this.view = new View(this.state);
        this.that = this;
        
        this.setupEventHandlers();
        this.setup(this.map.mapArray);
    }



    setup(map) {
        //Money counter interval
        setInterval(() => {
            this.state.money += this.state.profits;
        }, 1000);
        this.view.renderMap(map);
        this.view.renderMenu();

        this.view.renderImage('assets/img/hut.png', 100, 100, 75, 75)
        window.requestAnimationFrame(this.loop.bind(this));

    }

    setupEventHandlers() {

        //Function coloring currently selected tile
        this.view.mapLayer.on('mouseover', (e) => {
            const tile = this.map.mapArray[e.target.attrs.id];
            this.state.hoveredTile = tile;
            let color = '#fff';
            tile.path.fill(color);
            console.log(this.state)
        });

    }

    //
    //Game loop stuff
    //
    update(progress) {
        // Update the state of the world for the elapsed time since last render
        this.view.updateWallet();

    }
      
    draw() {
        // Draw the state of the world
        this.view.mapLayer.batchDraw();
        this.view.walletLayer.batchDraw();
        this.view.buildingsLayer.batchDraw();
    }
      
    loop(timestamp) {
        var progress = timestamp - lastRender;
      
        this.update(progress);
        this.draw();
      
        this.lastRender = timestamp;
        window.requestAnimationFrame(this.loop.bind(this));
    }

}