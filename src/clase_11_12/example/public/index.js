/* eslint-disable no-undef */
// eslint-disable-next-line no-undef, no-unused-vars
const socketClient = io();

const form = document.querySelector('#form');
const input = document.querySelector('#info');

form.onsubmit = (e) => {
  e.preventDefault();
  const info = input.value;
  if(info) {
    socketClient.emit('mensaje', info);
  }
}


// eslint-disable-next-line no-alert
socketClient.on('respuesta', (msj) => alert(msj));