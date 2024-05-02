const wsUrl = 'wss://echo-ws-service.herokuapp.com';

const output = document.querySelector('.output');
const btnSend = document.querySelector('.button.send');
const geolocation = document.querySelector('.button.geolocation');
const input = document.querySelector('.input');
let inputMsg = '';

let websocket = new WebSocket(wsUrl);
websocket.onmessage = function(e) {
    displayMessage(e.data, 'output-msg', false);
}

function displayMessage(text, side, isGeolocation, mapUrl) {
    let message = !isGeolocation ? document.createElement('span') : Object.assign(document.createElement('a'), { href: mapUrl, target: '_blank'});
    message.classList.add('message', side);
    message.textContent = text;
    output.appendChild(message);
}

input.addEventListener('input', (e) => {
    inputMsg = e.target.value;
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        btnSend.click();
    }
});

btnSend.addEventListener('click', () => {;
    displayMessage(inputMsg, 'input-msg', false)
    websocket.send(inputMsg);
    input.value = '';
})

geolocation.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const mapUrl = "https://www.openstreetmap.org/?mlat=" + latitude + "&mlon=" + longitude + "#map=15/" + latitude + "/" + longitude;
          displayMessage('Геолокация', 'input-msg', true, mapUrl);
        })
    } else {
        alert("Ваш браузер не поддерживает геолокацию.");
    }
})

