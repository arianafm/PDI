var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var newCanvas = document.getElementById('newImageCanvas');
var ctx = canvas.getContext('2d');
var newCtx = newCanvas.getContext('2d');


function handleImage(e) {

  var reader = new FileReader();
  reader.onload = function(event) {
    onReaderLoad(event);
  }

  reader.readAsDataURL(e.target.files[0]);
}

var onReaderLoad = function(event) {
  var image = new Image();
  var newImage = new Image();

  image.src = event.target.result;
  newImage.src = event.target.result;
  
  image.onload = function() {
    onImageLoad(image);
  }
  newImage.onload = function() {
    onNewImageLoad(newImage);
  }

}

var onImageLoad = function(img) {
  canvas.width = img.width/2;
  canvas.height = img.height/2;
  ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
}

var onNewImageLoad = function(img) {
  newCanvas.width = img.width/2;
  newCanvas.height = img.height/2;
  newCtx.drawImage(img, 0, 0,canvas.width,canvas.height);
}

function download() {
  var download = document.getElementById("download");
  var image = document.getElementById("newImageCanvas").toDataURL("image/png")
              .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
  //download.setAttribute("download","archive.png");
}
