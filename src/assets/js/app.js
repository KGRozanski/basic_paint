// import 'bootstrap';
import '../scss/style.scss';
import * as $ from 'jquery';
import Konva from 'konva';
import {
    fromEvent
} from 'rxjs';
import {
    throttleTime
} from 'rxjs/operators';





class Controller {

    constructor() {
        this.map = new Map(50, 70, 30);
        this.view = new View();
    }

    startGame() {
        this.view.renderMap(this.map.mapArray);

        this.initEventHandlers();
    }
    initEventHandlers() {
       
        fromEvent(this.view.canvas, 'mousemove').pipe(throttleTime(50)).subscribe((e) => {
            this.view.render( this.map.selectTile(e.clientX, e.clientY));
        });
    }


   
}


class View {
    constructor() {
        this.canvas = null;
        this.stage = new Konva.Stage({
            container: 'container', // id of container <div>
            width: 1800,
            height: 850
        });
 
        this.mapLayer = new Konva.Layer();
        this.stage.add(this.mapLayer);        
        this.canvas = document.getElementsByTagName('canvas');
     
    }

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


class Map {
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
            this.mapArray.push([]);
            if (i % 2) {
                posCalc.x = tileDimensions.width;
            } else {
                posCalc.x = 0;
            }
            for (var cell = 0; cell < this.width; cell++) {
                let instance = new Tile(id, posCalc.x, posCalc.y,
                    new Konva.Path({
                        data: `M${posCalc.x} ${posCalc.y} l ${tileDimensions.width} ${tileDimensions.height} l -${tileDimensions.width} ${tileDimensions.height} l -${tileDimensions.width} -${tileDimensions.height}`,
                        fill: 'green'
                    }));
                this.mapArray[i].push(instance);
                //Calculate starting point for next tile
                posCalc.x += tileDimensions.width * 2;
                id++;
            }
            posCalc.y += tileDimensions.height;
        }
        return this.mapArray;
    }


    selectTile(clientX, clientY) {
        let row = Math.ceil((clientY / this.tileHeight)),
            col,
            vectorX,
            vectorY = (row * this.tileHeight) - clientY,
            direction = 0,
            slope,
            selectedRhombus;

        //Find approximate tile column index to find calculating point for slope
        //then find vector sides values to calculate if point is in upper or lower row
        if (row % 2) {
            col = Math.abs(Math.floor(clientX / (this.tileWidth * 2)));
            vectorX = clientX - (col * (this.tileWidth * 2));
        } else {
            col = Math.abs(Math.ceil((clientX - this.tileWidth) / (this.tileWidth * 2)));
            vectorX = clientX - (col * (this.tileWidth * 2) - this.tileWidth);
        }
        //If cursor is on right side of rhombus find vectorX from right hand side
        //and change direction of cursor terms of rhombus
        if (vectorX > this.tileWidth) {
            vectorX = (this.tileWidth) * 2 - vectorX;
            direction = 1;
        }
        //Set tile of currently most matching coordinates
        selectedRhombus = this.mapArray[row][col];

        //Check if cursor is over currently selected tile
        //If it's not, then figure out which to select
        slope = (this.tileHeight / this.tileWidth);
        if (vectorY > (vectorX * slope)) {
            if (row % 2) {
                selectedRhombus = this.mapArray[row - 1][col + direction];
            } else {
                //If row is even neutralize first tile shift
                if (direction == 1) {
                    selectedRhombus = this.mapArray[row - 1][col];
                } else {
                    selectedRhombus = this.mapArray[row - 1][col - 1];
                }
            }
        }
        //Rerender selected tile
        
        let selectedTile = 
        new Tile(selectedRhombus.id, selectedRhombus.x, selectedRhombus.y,
            new Konva.Path({
                data: `M${selectedRhombus.x} ${selectedRhombus.y} l ${this.tileWidth} ${this.tileHeight} l -${this.tileWidth} ${this.tileHeight} l -${this.tileWidth} -${this.tileHeight}`,
                fill: 'blue',
            }));

        return selectedTile;


        
    }

}

class Tile {
    constructor(id, x, y, path) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.path = path;
    }
}



const game = new Controller().startGame();



























// function makeReq() {
//   $.ajax({
//     url: 'https://5cdab372eb39f80014a758f6.mockapi.io/api/v1/user',
//     method: 'GET'
//   }).done(function (res) {
//     renderUsers(res);
//   }).fail(function (err) {
//     console.log(err);
//   })
// }

// function renderUsers(usersList) {
//   usersList.forEach((el) => {
//     $('#list').append(`
//       <div class="card m-2" style="width: 1fr;">
//         <img src="${el.avatar}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h5 class="card-title">${el.name}</h5>
//           <p class="card-text">${el.createdAt}</p>
//         </div>
//       </div>
//     `);
//   });
// }