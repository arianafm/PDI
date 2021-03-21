var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var newCanvas = document.getElementById('newImageCanvas');
var ctx = canvas.getContext('2d');
var newCtx = newCanvas.getContext('2d');

var archivo;


// Lee el archivo que haya en el
// elemento "input" del HTML.
function handleImage(e) {
  
  // Leemos el archivo
  var reader = new FileReader();
  reader.onload = function(event) {
    onReaderLoad(event);
    archivo = event;
  }
  
  reader.readAsDataURL(e.target.files[0]);
}

// Actualiza la imagen que se visualiza en el canvas.
var onReaderLoad = function(event) {
  // Se crea una imagen.
  var image = new Image();
  var newImage = new Image();

  // Se dice cuál es la imagen que se cargará.
  image.src = event.target.result;
  newImage.src = event.target.result;
  
  // Cuando se termine de "crear" la imagen...
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
  // ...ésta se dibuja en el canvas.
  ctx.drawImage(img, 0, 0,canvas.width,canvas.height);
}

var onNewImageLoad = function(img) {
  newCanvas.width = img.width/2;
  newCanvas.height = img.height/2;
  // ...ésta se dibuja en el canvas.
  newCtx.drawImage(img, 0, 0,canvas.width,canvas.height);
}

function download() {
  var download = document.getElementById("download");
  var image = document.getElementById("newImageCanvas").toDataURL("image/png")
              .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
  //download.setAttribute("download","archive.png");
}

function limpiarImagen() {
  onReaderLoad(archivo);
}

// Despliega un pequeño mensaje de error
// arriba del canvas.
function error(string) {
  // Se ubica el elemento que contendrá el mensaje.
  var texto = document.getElementsByClassName("textoError")[0];
  // Se escribe el error.
  texto.innerHTML = "ERROR: " + string;
  // Si "string" es vacío, es porque se quiere borrar
  // cualquier error escrito previamente.
  if (string == "") texto.innerHTML = string;
}
