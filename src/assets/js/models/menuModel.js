export default class Menu {
    constructor() {

    }

    get itemBg() {
        var imageObj = new Image();
        imageObj.src = 'assets/img/menu.jpg';
        return new Promise((resolve) => {
                imageObj.onload = resolve
            })
            .then(() => {
                return new Konva.Image({
                    x: 0,
                    y: 0,
                    image: imageObj,
                    width: 100,
                    height: 100
                });
            });
    }
}
