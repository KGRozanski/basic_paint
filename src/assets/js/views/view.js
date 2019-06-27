import Konva from 'konva';
import { isArray } from 'util';

export default class View {
    constructor() {
        this.canvas = document.getElementsByTagName('canvas');
        this.stage = new Konva.Stage({
            container: 'container', // id of container <div>
            width: 1800,
            height: 850
        });
        //Initialize new layer to handle the map
        this.mapLayer = new Konva.Layer();
        //Add layer to the Konva stage
        this.stage.add(this.mapLayer);
    }


    render(area) {
        switch (Array.isArray(area)) {
            case true:
                area.forEach((el) => {
                    el.forEach(tile => {
                        // add the shape to the layer
                        this.mapLayer.add(tile.path);
                    });
                });
                this.stage.add(this.mapLayer);
                break;
        
            default:
                this.mapLayer.add(area.path);
                area.path.draw();
                break;
        }
        
    }
}