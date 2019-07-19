let config = require('../config.json');
import Konva from 'konva';


export default class View {
    constructor() {
        this.width = window.innerWidth,
        this.height = window.innerHeight,
        this.canvas = document.getElementsByTagName('canvas');
        this.stage = new Konva.Stage({
            container: 'container', // id of container <div>
            width: this.width,
            height: this.height
        });
        //Initialize new layer to handle the map
        this.mapLayer = new Konva.Layer();
        this.hudLayer = new Konva.Layer();

        this.mapGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        this.hudGroup = new Konva.Group({
            x: 0,
            y: this.height - 100
        });

        //Add layer to the Konva stage
        this.stage.add(this.mapLayer);
        this.stage.add(this.hudLayer);
    }


    renderMap(mapArray) {
        mapArray.forEach((el) => {
            el.forEach(tile => {
                // add every shape to the layer
                this.mapGroup.add(tile.path);
            });
        });
        this.mapLayer.add(this.mapGroup).batchDraw();
    }

    render(area) {
        area.then((v) => {
            this.hudGroup.add(v);
            this.hudLayer.add(this.hudGroup).batchDraw();
        })
    }


}
