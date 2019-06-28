import Konva from 'konva';

export default class View {
    constructor() {
        this.canvas = document.getElementsByTagName('canvas');
        this.stage = new Konva.Stage({
            container: 'container', // id of container <div>
            width: window.innerWidth,
            height: window.innerHeight
        });
        //Initialize new layer to handle the map
        this.mapLayer = new Konva.Layer();

        this.mapGroup = new Konva.Group({
            x: 0,
            y: 0
        });
        this.menuGroup = new Konva.Group({
            x: 0,
            y: 0
        });

        //Add layer to the Konva stage
        this.stage.add(this.mapLayer);
    }

    getFrame() {
        this.mapLayer.batchDraw();
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
            this.menuGroup.add(v);
            this.mapLayer.add(this.menuGroup).batchDraw();
        })
    }

    renderShape(area) {
        this.mapLayer.add(area.path).batchDraw();
    }
}
