
export default class Hud {
    constructor() {
        this.buildings = ['hut', 'mine'];
        this.menu = {
            backgrounds: []
        };
        this.menu.backgrounds['initial'] = 'assets/img/menu.jpg';
    }

    get buildingButtons() {
        return this.buildings;
    }

    get background() {
        var imageObj = new Image();
        imageObj.src = this.menu.backgrounds.initial;

        return new Promise((resolve) => {
            imageObj.onload = resolve;
        }).then(() => {
            return new Konva.Image({
                building: name,
                x: 0,
                y: 0,
                image: imageObj,
                width: 100,
                height: 100
            });
        });
    }




}
