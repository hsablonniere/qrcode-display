import 'jsqr';

function $ (selector) {
  return document.querySelector(selector);
}

const video = $('#video');
const message = $('#message');
const logs = $('#logs');

const dataList = new Set();

const canvasElement = document.createElement('canvas');
const canvasContext = canvasElement.getContext('2d');

// Use facingMode: environment to attemt to get the front camera on phones
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (stream) {
  video.srcObject = stream;
  video.play();
  requestAnimationFrame(tick);
});

function tick () {

  message.innerText = '⌛ Loading video...';

  if (video.readyState === video.HAVE_ENOUGH_DATA) {

    message.hidden = true;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;

    canvasContext.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    if (code && code.data !== '') {
      if (!dataList.has(code.data)) {
        dataList.add(code.data);
        logs.innerHTML = Array
          .from(dataList.values())
          .map((data) => `<textarea spellcheck="false">${data}</textarea>`)
          .reverse()
          .join('');
      }
    }
  }

  requestAnimationFrame(tick);
}
