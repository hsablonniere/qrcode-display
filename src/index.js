// based on version 13
const QRCODE_SIZE = 69;
// // based on version 14
// const QRCODE_SIZE = 73;
const CANVAS_FACTOR = 10;

// https://github.com/soldair/node-qrcode
const QRCODE_OPTIONS = {
  margin: 0,
  version: 13,
  width: QRCODE_SIZE * CANVAS_FACTOR,
};

const LETTER_HEIGHT = 5;
const LETTER_WIDTH = 4;

const LETTERS = {
  A: '11111001111110011001',
  B: '11101010111110011111',
  C: '11111000100010001111',
  D: '11101001100110011110',
  E: '11111000111010001111',
  F: '11111000111010001000',
  G: '11111000101110011111',
  H: '10011001111110011001',
  I: '11110100010001001111',
  J: '11110010001000101110',
  K: '10011010110010101001',
  L: '10001000100010001111',
  M: '11111010101010101010',
  N: '11111001100110011001',
  O: '11111001100110011111',
  P: '11111001111110001000',
  Q: '11111001100110111111',
  R: '11101010111110011001',
  S: '11111000111100011111',
  T: '11110100010001000100',
  U: '10011001100110011111',
  V: '10011001100110010110',
  W: '10101010101010100101',
  X: '10010110011001101001',
  Y: '10011001111101100110',
  Z: '11110011011011001111',
};

function $$ (selector) {
  return Array.from(document.querySelectorAll(selector));
}

function drawQrCode (canvas, text, rawData) {
  const canvasContext = canvas.getContext('2d');
  canvas.height = QRCODE_SIZE * CANVAS_FACTOR;
  canvas.width = QRCODE_SIZE * CANVAS_FACTOR;

  QRCode.toCanvas(canvas, rawData, { ...QRCODE_OPTIONS });
  canvas.removeAttribute('style');

  drawText(canvasContext, text);
}

function drawText (canvasContext, text) {

  const textWidth = text.length * (LETTER_WIDTH + 1) - 1;
  const textX = Math.floor((QRCODE_SIZE - textWidth) / 2);
  const textY = Math.floor((QRCODE_SIZE - LETTER_HEIGHT) / 2);

  text
    .split('')
    .forEach((letter, i) => {
      const letterData = LETTERS[letter];
      drawLetter(canvasContext, textX + i * (LETTER_WIDTH + 1), textY, letterData);
    });

  for (let x = -1; x < textWidth + 1; x += 1) {
    canvasContext.fillStyle = (x % 2 === 0) ? 'black' : 'white';
    canvasContext.fillRect((textX + x) * CANVAS_FACTOR, (textY - 2) * CANVAS_FACTOR, 1 * CANVAS_FACTOR, 1 * CANVAS_FACTOR);
    canvasContext.fillStyle = (x % 2 === 0) ? 'white' : 'black';
    canvasContext.fillRect((textX + x) * CANVAS_FACTOR, (textY + LETTER_HEIGHT + 1) * CANVAS_FACTOR, 1 * CANVAS_FACTOR, 1 * CANVAS_FACTOR);
  }

  for (let y = -1; y < LETTER_HEIGHT + 1; y += 1) {
    canvasContext.fillStyle = (y % 2 === 0) ? 'black' : 'white';
    canvasContext.fillRect((textX - 2) * CANVAS_FACTOR, (textY + y) * CANVAS_FACTOR, 1 * CANVAS_FACTOR, 1 * CANVAS_FACTOR);
    canvasContext.fillStyle = (y % 2 === 0) ? 'white' : 'black';
    canvasContext.fillRect((textX + textWidth + 1) * CANVAS_FACTOR, (textY + y) * CANVAS_FACTOR, 1 * CANVAS_FACTOR, 1 * CANVAS_FACTOR);
  }
}

function drawLetter (canvasContext, x, y, letter) {
  const bits = letter.split('');
  // canvasContext.fillStyle = 'black';
  canvasContext.fillStyle = 'white';
  canvasContext.fillRect((x - 1) * CANVAS_FACTOR, (y - 1) * CANVAS_FACTOR, 6 * CANVAS_FACTOR, 7 * CANVAS_FACTOR);
  for (let i = 0; i < bits.length; i += 1) {
    const xx = i % 4;
    const yy = Math.floor(i / 4);
    canvasContext.fillStyle = bits[i] === '1' ? 'black' : 'white';
    canvasContext.fillRect((x + xx) * CANVAS_FACTOR, (y + yy) * CANVAS_FACTOR, 1 * CANVAS_FACTOR, 1 * CANVAS_FACTOR);
  }
}

$$('.qrcode-hubert').forEach((canvas) => {
  drawQrCode(canvas, 'HS', 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. QUISQUE FEUGIAT DUI AT LEO PORTA DIGNISSIM. ETIAM UT PURUS ULTRICES, PULVINAR TELLUS QUIS, CURSUS MASSA. MAURIS DIGNISSIM ACCUMSAN EX, AT VESTIBULUM LECTUS FERMENTUM ID. QUISQUE NEC MAGNA ARCU. QUISQUE IN METUS SED ERAT SODALES EUISMOD EGET ID PURUS. SED SAGITTIS RHONCUS MAURIS. UT SIT AMET URNA AC NUNC SEMPER PORTA. NAM UT FELIS EU VELIT LUCTUS RUTRUM');
});

// $$('.qrcode-stephe').forEach((canvas) => {
//   drawQrCode(canvas, 'SB', 'FOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. QUISQUE FEUGIAT DUI AT LEO PORTA DIGNISSIM. ETIAM UT PURUS ULTRICES, PULVINAR TELLUS QUIS, CURSUS MASSA. MAURIS DIGNISSIM ACCUMSAN EX, AT VESTIBULUM LECTUS FERMENTUM ID. QUISQUE NEC MAGNA ARCU. QUISQUE IN METUS SED ERAT SODALES EUISMOD EGET ID PURUS. SED SAGITTIS RHONCUS MAURIS. UT SIT AMET URNA AC NUNC SEMPER PORTA. NAM UT FELIS EU VELIT LUCTUS RUTRUM');
// });
