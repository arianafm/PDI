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


//Tarea 1

function filtrosT1(elemento) {
  var context = newCanvas.getContext("2d");
  var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
  switch (elemento.id) {
    case "Gris 1":
      context.putImageData(gris1(imageData),0,0);
      break;
    case "Gris 2":
      context.putImageData(gris2(imageData),0,0);
      break;
    case "Gris 3":
      context.putImageData(gris3(imageData),0,0);
      break;
    case "Gris 4":
      context.putImageData(gris4(imageData),0,0);
      break;
    case "Gris 5":
      context.putImageData(gris5(imageData),0,0);
      break;
    case "Gris 6":
      context.putImageData(gris6(imageData),0,0);
      break;
    case "Gris 7":
      context.putImageData(gris7(imageData),0,0);
      break;
    case "Gris 8":
      context.putImageData(gris8(imageData),0,0);
      break;
    case "Gris 9":
      context.putImageData(gris9(imageData),0,0);
      break;
  }
}


function gris1(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const avg = (data[i] + data[i+1] + data[i+2]) / 3;
    data[i] = avg;
    data[i+1] = avg;
    data[i+2] = avg;
  }
  return imageData;
}

function gris2(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const common_formula = (data[i]*0.3 + data[i+1]*0.59 + data[i+2]*0.11) ;
    data[i] = common_formula;
    data[i+1] = common_formula;
    data[i+2] = common_formula;
  }
  return imageData;
}

function gris3(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const luma = (data[i]*0.2126 + data[i+1]*0.7152 + data[i+2]*0.0722) ;
    data[i] = luma;
    data[i+1] = luma;
    data[i+2] = luma;
  }
  return imageData;
}

function gris4(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const midpoint = (Math.max(data[i], data[i+1], data[i+2]) + Math.min(data[i], data[i+1], data[i+2]))/2;
    data[i] = midpoint;
    data[i+1] = midpoint;
    data[i+2] = midpoint;
  }
  return imageData;
}

function gris5(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const max = Math.max(data[i], data[i+1], data[i+2]);
    data[i] = max;
    data[i+1] = max;
    data[i+2] = max;
  }
  return imageData;
}

function gris6(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const min = Math.min(data[i], data[i+1], data[i+2]);
    data[i] = min;
    data[i+1] = min;
    data[i+2] = min;
  }
  return imageData;
}

function gris7(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const red = data[i];
    data[i] = red;
    data[i+1] = red;
    data[i+2] = red;
  }
  return imageData;
}

function gris8(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const green = data[i+1];
    data[i] = green;
    data[i+1] = green;
    data[i+2] = green;
  }
  return imageData;
}

function gris9(imageData) {
  var data = imageData.data;
  for (var i = 0; i < data.length; i+=4){
    const blue = data[i+2];
    data[i] = blue;
    data[i+1] = blue;
    data[i+2] = blue;
  }
  return imageData;
}


function filtroMosaico() {
  var tam = document.getElementById("botonTam").value;

  if (tam == "") {
    error("Ingresa un valor en <i>Tamaño</i>.");
    return;
  }

  if (isNaN(tam)) {
    error("El valor en <i>Tamaño</i> debe ser un número.");
    return;
  }

  else tam = parseInt(tam);

  var context = newCanvas.getContext("2d");
  var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
  var data = imageData.data;

  var height = newCanvas.height;
  var width = newCanvas.width;

  function calcularPromedio(x, y) {
    var r = 0;
    var g = 0;
    var b = 0;

    var count = 0;

    for (var j = y; j < y + tam; j++)
      for (var k = x; k < x + tam; k++) {

        if (k >= width || j >= height) continue;

        var i = (k + j * width) * 4;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    return [r, g, b];
  } 

  for (var y = 0; y < height; y += tam) {
    for (var x = 0; x < width; x += tam) {
      var arr = calcularPromedio(x, y);
      context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
      context.fillRect(x, y, tam, tam);
    }
  }

}
