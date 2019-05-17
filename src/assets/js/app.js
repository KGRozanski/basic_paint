// import 'bootstrap';
import '../scss/style.scss';
//import * as $ from 'jquery';
//import { fromEvent } from 'rxjs';
//import { throttleTime } from 'rxjs/operators';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Set canvas sizes
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight;

class Map {
  constructor(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize / 2 || 25;
    this.mapArray = [];
  }

  generateMap() {
    let id = 0,
      rowOffset = -this.tileSize,
      tileDimensions = {
        height: this.tileSize,
        width: Math.round(Math.tan(1.04719755) * this.tileSize)
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

//fromEvent(document, 'click').pipe(throttleTime(50)).subscribe((e) => {
//  $('body').append(`
//    <div class="pointer" style="left: ${e.clientX}px; top: ${e.clientY}px"></div>
//  `);
//});