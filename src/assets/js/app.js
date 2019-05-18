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
canvas.width = window.innerWidth - 20;
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
    console.log(this.mapArray);

    //Execute observable for mouse inputs
    this.addListener();
  }

  addListener() {
    fromEvent(canvas, 'click').pipe(throttleTime(50)).subscribe((e) => {
      this.selectTile(e.clientX, e.clientY);
    });
  }

  selectTile(clientX, clientY) {
    let fullRows = Math.ceil((clientY / this.tileHeight)),
      fullCols,
      pointInTileOffsetX,
      pointInTileOffsetY,
      checkingHeight,
      direction = 0;

    if (fullRows % 2) {
      fullCols = Math.abs(Math.floor(clientX / (this.tileWidth * 2)));
      pointInTileOffsetX = clientX - (fullCols * (this.tileWidth * 2));
    } else {
      fullCols = Math.abs(Math.ceil((clientX - this.tileWidth) / (this.tileWidth * 2)));
      pointInTileOffsetX = (fullCols * (this.tileWidth  * 2)) - clientX;
    };

    // if (clientY >= ((this.tileHeight * fullRows) + this.tileHeight)) {
    //   fullRows += 2;
    // }

    let selectedRhombus = this.mapArray[fullRows][fullCols];


    //Calculate coordinates inside tile area to find 
    //if mouse covers currently selected tile
    //depending
    
    if (pointInTileOffsetX > this.tileWidth ) {
      direction = 1;
      pointInTileOffsetX = clientX - ((fullCols + 1) * (this.tileWidth * 2));
    }

    pointInTileOffsetY = Math.ceil((Math.tan(0.523598776) * Math.abs(pointInTileOffsetX)));
    checkingHeight = (this.tileHeight * fullRows) - clientY;
    console.log(clientX - (fullCols * (this.tileWidth)))

    if (checkingHeight > pointInTileOffsetY) {
      let grabRow = fullRows - 1;
    
      if (pointInTileOffsetX < this.tileWidth && direction == 0) {
        selectedRhombus = this.mapArray[grabRow][fullCols];
      } else {
        let grabCol = fullCols + 1;
        selectedRhombus = this.mapArray[grabRow][grabCol];
      }

    }



    let logging = {
      'fullRows': fullRows,
      'clientY': clientY,
      'fullCols': fullCols,
      'clientX': clientX,
      'pointInTileOffsetX': pointInTileOffsetX
    }
    console.log(logging);
    console.log(this.mapArray[fullRows][fullCols]);





    //Rerender selected tile
    ctx.fillStyle = "#00FF00";
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

let map = new Map(50, 90, 200);
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