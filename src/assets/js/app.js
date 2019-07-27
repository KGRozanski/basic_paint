import '../scss/style.scss';

import Game from './models/gameModel.js';
import Hud from './models/hudModel.js';
import View from './views/view.js';




class Controller {
    constructor() {
        this.view = new View();
        this.game = new Game();
        this.menu = new Hud();
        this.setup(this.game.map.mapArray, this.menu.menuItem);
        console.log(this.menu.menuItem)



    }

    setup(map, img) {
        this.view.renderMap(map);
        this.view.render(img);
        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.view.mapLayer.on('click', (e) => {
            const selectedTile = e.target;
            selectedTile.fill('blue');
            selectedTile.draw();
        });
   
        //When mouse hover over menu items
        this.view.hudLayer.on('mouseover', (e) => {
            e.target.cache();
            e.target.filters([Konva.Filters.Brighten]);
            e.target.brightness(0.05);
            this.view.stage.container().style.cursor = 'pointer';
            this.view.hudLayer.batchDraw();
        });
        this.view.hudLayer.on('mouseleave', (e) => {
            e.target.cache();
            e.target.filters([Konva.Filters.Brighten]);
            e.target.brightness(0);
            this.view.stage.container().style.cursor = 'default';
            this.view.hudLayer.batchDraw();
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
