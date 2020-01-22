import Konva from 'konva';


export default class View {
    constructor(state) {
        this.state = state;
        this.buildings = require('../data/buildings.json');
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
        this.menuLayer = new Konva.Layer();

        //Groups
        this.menuGroup = new Konva.Group({
            x: 0,
            y: this.height - 100
        });



        //Add layer to the Konva stage
        this.stage.add(this.mapLayer);
        this.stage.add(this.walletLayer);
        this.stage.add(this.buildingsLayer);
        this.stage.add(this.menuLayer);

        
    }

    updateWallet() {
        this.walletLayer.destroyChildren();
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


    renderMenu() {
        let i = 0;
        this.buildings.forEach((building) => {
            let bg = new Image();
            bg.src = 'assets/img/menu_bg.jpg';

            bg.onload = () => {
                console.log(i)
                let background = new Konva.Image({
                    x: i,
                    y: 0,
                    image: bg,
                    width: 100,
                    height: 100
                })
                this.menuGroup.add(background);
                this.menuLayer.add(this.menuGroup).draw()
                i += 100;
            }

        });
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
