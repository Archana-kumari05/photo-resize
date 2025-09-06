const upload = document.getElementById('upload');
const resizeBtn = document.getElementById('resize');
const downloadBtn = document.getElementById('download');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img = new Image();

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
});

resizeBtn.addEventListener('click', () => {
  const width = parseInt(document.getElementById('width').value) || img.width;
  const height = parseInt(document.getElementById('height').value) || img.height;
  const targetKB = parseInt(document.getElementById('target').value) || 200;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  let quality = 0.9;
  let output = canvas.toDataURL("image/jpeg", quality);
  while ((output.length / 1024) > targetKB && quality > 0.1) {
    quality -= 0.05;
    output = canvas.toDataURL("image/jpeg", quality);
  }

  downloadBtn.href = output;
  downloadBtn.download = "resized.jpg";
  downloadBtn.style.display = "inline-block";
});

downloadBtn.addEventListener('click', () => {
  // Just triggers download
});
