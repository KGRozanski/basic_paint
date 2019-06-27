

export default class Menu {
    constructor() {
        
    }

    get itemBg() {
        var imageObj = new Image();
        imageObj.src = 'assets/img/menu.jpg';
        
         return new Konva.Image({
            x: 50,
            y: 50,
            image: imageObj,
            width: 106,
            height: 118
          });

    }
}