// https://github.com/soldair/node-qrcode
const QRCODE_OPTIONS = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  quality: 0.8,
  quality: 1,
  margin: 1,
  color: {
    dark: '#000',
    light: '#FFF',
  },
  // mode: 'alphanumeric',
};

const LEVELS = ['L', 'M', 'Q', 'H'];

function updateQrCodes () {

  const text = ($txt.value === '') ? ' ' : $txt.value;

  $imgList.forEach(($img, i) => {
    QRCode
      .toDataURL(
        text,
        { ...QRCODE_OPTIONS, errorCorrectionLevel: LEVELS[i] },
      )
      .then((url) => $img.src = url);
  });

};

const $imgList = Array.from(document.querySelectorAll('img'));
const $txt = document.querySelector('textarea');

$txt.addEventListener('input', updateQrCodes);

updateQrCodes();
