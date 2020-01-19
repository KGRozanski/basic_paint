import Konva from 'konva';


export default class View {
    constructor(state) {
        this.state = state;
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
        this.walletLayer = new Konva.Layer();
        this.buildingsLayer = new Konva.Layer();


        //Add layer to the Konva stage
        this.stage.add(this.mapLayer);
        this.stage.add(this.walletLayer);
        this.stage.add(this.buildingsLayer);

        
    }

    updateWallet() {
        this.walletLayer.destroyChildren();
        //Rendering wallet
        this.walletAmount = new Konva.Text({
            x: 5,
            y: 6,
            text: '$ ' + this.state.money.toString(),
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: 'black'
          });
        var rect = new Konva.Rect({
            width: 200,
            height: 40,
            fill: '#fff',
            stroke: 'black'
          });
          
        this.walletLayer.add(rect);
        this.walletLayer.add(this.walletAmount);
    }








    renderMap(mapArray) {
        this.mapGroup = new Konva.Group({ x: 0, y: 0 });
        mapArray.forEach((el) => {
            // add every shape to the layer
            this.mapGroup.add(el.path);
        });
        this.mapLayer.add(this.mapGroup);
    }

    renderImage(url, x, y, w, h) {
        var imageObj = new Image();
        imageObj.src = url;
    
        imageObj.onload = () => {
            var image = new Konva.Image({
                x: x,
                y: y,
                image: imageObj,
                width: w,
                height: h
            });
            this.buildingsLayer.add(image).draw()
        }
    }


}
