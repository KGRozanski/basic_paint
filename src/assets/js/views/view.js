import Konva from 'konva';

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

    //Rendering map function
    renderMap(shapes) {
        shapes.forEach((el) => {
            el.forEach(tile => {
                // add the shape to the layer
                this.mapLayer.add(tile.path);
            });
        });
        // add the layer to the stage
        this.stage.add(this.mapLayer);
        this.mapLayer.draw();
    }

    render(shape) {
        this.mapLayer.add(shape.path);
        shape.path.draw();
    }
}