
export default class Hud {
    constructor() {
        this.menu = {
            backgrounds: []
        };
        this.menu.backgrounds['initial'] = 'assets/img/menu.jpg';
    }


    renderMenu() {

    }

    get menuItem() {
        var imageObj = new Image();
        imageObj.src = this.menu.backgrounds.initial;
        return new Promise((resolve) => {
            imageObj.onload = resolve;
        }).then(() => {
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
