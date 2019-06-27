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
        this.menuLayer = new Konva.Layer();
        this.mapGroup =  new Konva.Group({
            x: 0,
            y: 0
        });

        //Add layer to the Konva stage
        this.stage.add(this.mapLayer);
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
        this.mapGroup.add(area);
        this.mapLayer.add(this.mapGroup).batchDraw();

    }

    renderShape(area) {
         this.mapLayer.add(area.path).batchDraw();
    }
}