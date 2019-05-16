import 'bootstrap';
import '../scss/style.scss';
import * as $ from 'jquery';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//Set canvas sizes
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;



$(document).ready(function () {
  new Map(10, 10).generateMap();
  let rects = [
    new Path2D('M0 0 l 173 100 l -173 100 l -173 -100'),
    new Path2D('M346 0 l 173 100 l -173 100 l -173 -100')
  ];
  // rects.forEach(el => {
  //   ctx.fill(el);
  // });

});

class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.mapArray = [];
  }

  generateMap() {
    let startPoint = {x: 173, y: -100};

    let id = 0;

    for(let i = 0; i < this.height; i++){
      let posCalc = {};
      if (i % 2) {
        posCalc = startPoint;
      } else {
        posCalc.x = 0;
        posCalc.y = startPoint.y;
      }
      this.mapArray.push([]);

      for(let cell = 0; cell < this.width; cell++) {
        console.log(posCalc);
        this.mapArray[i].push({id: id, x: posCalc.x, y: posCalc.y, path: new Path2D(`M${posCalc.x} ${posCalc.y} l 173 100 l -173 100 l -173 -100`)});
        //Calculate starting point for next tile
        posCalc.x += 346;
        id++;
      }
      startPoint.y += 100;
    }

    this.mapArray.forEach((el) => {
      el.forEach(tile => {
        ctx.fill(tile.path);
      });
    });
  }
}
















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