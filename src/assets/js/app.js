import '../scss/style.scss';
import {
    fromEvent,
    Observable
} from 'rxjs';
import {
    throttleTime
} from 'rxjs/operators';

import Game from './models/game.model.js';





class Controller {
    constructor() {

        this.game = new Game();

        this.setupEventHandlers();

    }

    setupEventHandlers() {
        let savedTile = 0,
            color = '#fff';

        this.game.view.mapLayer.on('mouseover', (e) => {
            const   tile = this.game.map.mapArray[e.target.attrs.id];
            let color = '#fff';


            console.log(tile);
            console.log(savedTile);
            if (tile.id != savedTile.id) {
                color = '#00ff00';
            }
            color = '#fff';
            this.game.render(tile, color);
            savedTile = tile;
        });
        //When mouse hover over menu items
        this.game.view.hudLayer.on('click', (e) => {
            e.target.cache();
            e.target.filters([Konva.Filters.Brighten]);
            e.target.brightness(0.05);
            this.game.view.stage.container().style.cursor = 'pointer';
            this.game.view.hudLayer.batchDraw();
        });
        this.game.view.hudLayer.on('mouseover', (e) => {
            e.target.cache();
            e.target.filters([Konva.Filters.Brighten]);
            e.target.brightness(0.05);
            this.game.view.stage.container().style.cursor = 'pointer';
            this.game.view.hudLayer.batchDraw();
        });
        this.game.view.hudLayer.on('mouseleave', (e) => {
            e.target.cache();
            e.target.filters([Konva.Filters.Brighten]);
            e.target.brightness(0);
            this.game.view.stage.container().style.cursor = 'default';
            this.game.view.hudLayer.batchDraw();
        });
    }
}



const ctrl = new Controller();


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
