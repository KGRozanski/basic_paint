// import 'bootstrap';
import '../scss/style.scss';
// import * as $ from 'jquery';
// import { fromEvent } from 'rxjs';
// import { throttleTime } from 'rxjs/operators';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Set canvas sizes
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;


class Map {
  constructor(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.mapArray = [];
  }

  generateMap() {
    let id = 0,
    startPoint = -100,
    posCalc = {
      x: 0,
      y: startPoint
    };

    for (let i = 0; i < this.height; i++) {
      this.mapArray.push([]);
      if (i % 2) {
        posCalc.x = 173;
      } else {
        posCalc.x = 0;
        posCalc.y = startPoint;
      }
      for (var cell = 0; cell < this.width; cell++) {
        let instance = new Tile(id, posCalc.x, posCalc.y, new Path2D(`M${posCalc.x} ${posCalc.y} l 173 100 l -173 100 l -173 -100`));
        this.mapArray[i].push(instance);
        //Calculate starting point for next tile
        posCalc.x += 346;
        id++;
      }
      posCalc += 100;
    }
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

let map = new Map(10, 12);
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

// fromEvent(document, 'mousemove').pipe(throttleTime(50)).subscribe((e) => {
//   $('body').append(`
//     <div class="pointer" style="left: ${e.clientX}px; top: ${e.clientY}px"></div>
//   `);
// });