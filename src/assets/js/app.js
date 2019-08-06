import '../scss/style.scss';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import Game from './models/game.model.js';
import Hud from './models/hud.model.js';
import View from './views/view.js';




class Controller {
    constructor() {
        this.view = new View();
        this.game = new Game();
        this.menu = new Hud();
        this.setup(this.game.map.mapArray);
        this.previousTime = 0.0;
        this.currentTile = null;
    }

    

    setup(map) {
        this.view.renderMap(map);
        this.view.renderMenu(this.menu.background, this.menu.buildingButtons);
        this.setupEventHandlers();
        // Launch
        window.requestAnimationFrame(time => {
            
            this.previousTime = time;
            loop(time);
        });

        const loop = time => {
            // Compute the delta-time against the previous time
            const dt = time - this.previousTime;   
            // Update the previous time
            this.previousTime = time;
            // Update your game
            this.update(dt);
            // Render your game
            this.render();
            // Repeat
            window.requestAnimationFrame(loop);
          }
    }

    update() {
        if(this.buildMode == true) {
            
        }
    }

    render() {
    }

   
      
      
    
   
  


    setupEventHandlers() {
        this.view.mapLayer.on('mouseover', (e) => {
            const tile = this.game.map.mapArray[e.target.attrs.id];
            tile.path.fill('white');
            tile.path.draw();
            setTimeout(()=>{
                tile.path.fill('green');
                tile.path.draw();
            },5);
            this.currentTile = tile;
        });
        
  
        //When mouse hover over menu items
        this.view.hudLayer.on('click', (e) => {
            console.log(e.target)
            e.target.cache();
            e.target.filters([Konva.Filters.Brighten]);
            e.target.brightness(0.05);
            this.view.stage.container().style.cursor = 'pointer';
            this.view.hudLayer.batchDraw();
        });
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
