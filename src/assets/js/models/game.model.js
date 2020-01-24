let config = require('../config.json');
import Map from './map.model';
import View from '../views/view.js';

var lastRender = 0;

export default class Game {
    constructor(state) {
        this.state = state;
        this.buildings = require('../data/buildings.json');
        this.map = new Map(50, 100, config.tileSize);
        this.view = new View(this.state);
        this.that = this;
        this.loadedImage = null;
        
        this.setup(this.map.mapArray);
            this.setupEventHandlers();
        
        this.setupEventHandlers();
    }



    setup(map) {
        //Money counter interval
        setInterval(() => {
            this.state.money += this.state.profits;
        }, 1000);
        this.view.renderMap(map);
        this.view.renderMenu();

        this.view.renderBuilding('assets/img/hut.png', 100, 100, 75, 75);
        window.requestAnimationFrame(this.loop.bind(this));

    }

    setupEventHandlers() {

        //Function coloring currently selected tile
        this.view.mapLayer.on('mouseover', (e) => {
            const tile = this.map.mapArray[e.target.attrs.id];
            this.state.hoveredTile = tile;
            // let color = '#fff';
            // tile.path.fill(color);
        });

        //Function drawing buildings
        this.view.menuLayer.on('click', (e) => {
            this.state.menuSelectedItem = this.buildings.filter((building) => {
                return building.name == e.target.attrs.name;
            })
        })

    }

    loadMenuItem() {
            new Promise ((resolve, reject) => {
                let bg = new Image();
                bg.src = this.state.menuSelectedItem[0].image;
                bg.addEventListener('load', ()=> {
                    resolve (new Konva.Image({
                        name: this.state.menuSelectedItem[0].name,
                        x: this.state.hoveredTile.x,
                        y: this.state.hoveredTile.y,
                        image: bg,
                        width: 100,
                        height: 100
                    }))
                });

            }).then((building) => {
                console.log(this.state.menuSelectedItem)
                this.loadedImage = building;
            })

    }

    //
    //Game loop stuff
    //
    update(progress) {
        // Update the state of the world for the elapsed time since last render
        this.view.updateWallet();
        if(this.state.menuSelectedItem) {
            this.loadMenuItem();
        } 
        console.log(this.state.menuSelectedItem)
        if(this.loadedImage) {
            this.view.buildingsLayer.destroyChildren();
            this.view.buildingGroup.add(this.loadedImage);
            this.view.buildingsLayer.add(this.view.buildingGroup).draw()
        }


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