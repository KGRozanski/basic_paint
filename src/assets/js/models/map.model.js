import Konva from 'konva';
import Tile from './tile.model';

export default class Map {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileHeight = tileSize / 2 || 25;
        this.tileWidth = Math.round(Math.tan(1.04719755) * this.tileHeight);
        this.mapArray = [];
        this.generateMap();

    }

    generateMap() {
        let id = 0,
            rowOffset = -this.tileHeight,
            tileDimensions = {
                height: this.tileHeight,
                width: this.tileWidth
            },
            posCalc = {
                x: 0,
                y: rowOffset,
            };

        for (let i = 0; i < this.height; i++) {
            if (i % 2) {
                posCalc.x = tileDimensions.width;
            } else {
                posCalc.x = 0;
            }
            for (var cell = 0; cell < this.width; cell++) {
                let tile = new Tile(id, posCalc.x, posCalc.y,
                    new Konva.Path({
                        data: `M${posCalc.x} 
                            ${posCalc.y} l 
                            ${tileDimensions.width} 
                            ${tileDimensions.height} l 
                            -${tileDimensions.width} 
                            ${tileDimensions.height} l 
                            -${tileDimensions.width} 
                            -${tileDimensions.height}`,
                        fill: 'green',
                        id: id
                    }));
                this.mapArray.push(tile);
                //Calculate starting point for next tile
                posCalc.x += tileDimensions.width * 2;
                id++;
            }
            posCalc.y += tileDimensions.height;
        }
        console.log(this.mapArray)
        return this.mapArray;
    }


}