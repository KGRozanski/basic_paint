import 'bootstrap';
import '../scss/style.scss';
import * as $ from 'jquery';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

$(document).ready(function () {
  // makeReq();
});


function makeReq() {
  $.ajax({
    url: 'https://5cdab372eb39f80014a758f6.mockapi.io/api/v1/user',
    method: 'GET'
  }).done(function (res) {
    renderUsers(res);
  }).fail(function (err) {
    console.log(err);
  })
}

function renderUsers(usersList) {
  usersList.forEach((el) => {
    $('#list').append(`
      <div class="card m-2" style="width: 1fr;">
        <img src="${el.avatar}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${el.name}</h5>
          <p class="card-text">${el.createdAt}</p>
        </div>
      </div>
    `);
  });
}

fromEvent(document, 'mousemove').pipe(throttleTime(50)).subscribe((e) => {
  $('body').append(`
    <div class="pointer" style="left: ${e.clientX}px; top: ${e.clientY}px"></div>
  `);
});