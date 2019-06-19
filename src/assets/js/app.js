// import 'bootstrap';
import '../scss/style.scss';
import * as $ from 'jquery';
import {
    fromEvent
} from 'rxjs';
import {
    throttleTime
} from 'rxjs/operators';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Set canvas sizes
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



class Map {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileHeight = tileSize / 2 || 25;
        this.tileWidth = Math.round(Math.tan(1.04719755) * this.tileHeight);
        this.mapArray = [];
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
                let instance = new Tile(id, posCalc.x, posCalc.y, new Path2D(`M${posCalc.x} ${posCalc.y} l ${tileDimensions.width} ${tileDimensions.height} l -${tileDimensions.width} ${tileDimensions.height} l -${tileDimensions.width} -${tileDimensions.height}`));
                this.mapArray[i].push(instance);
                //Calculate starting point for next tile
                posCalc.x += tileDimensions.width * 2;
                id++;
            }
            posCalc.y += tileDimensions.height;
        }
        this.renderMap();
    }

    renderMap() {
        this.mapArray.forEach((el) => {
            el.forEach(tile => {
                ctx.fill(tile.path);
            });
        });

        //Execute observable for mouse inputs
        this.addListener();
    }

    addListener() {
        fromEvent(canvas, 'mousemove').pipe(throttleTime(50)).subscribe((e) => {
            this.selectTile(e.clientX, e.clientY);
        });
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
        ctx.fillStyle = "#006f00";
        ctx.fill(new Path2D(`M${selectedRhombus.x} ${selectedRhombus.y} l ${this.tileWidth} ${this.tileHeight} l -${this.tileWidth} ${this.tileHeight} l -${this.tileWidth} -${this.tileHeight}`));
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

let map = new Map(50, 70, 50);
map.generateMap();







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
