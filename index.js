var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var newCanvas = document.getElementById('newImageCanvas');
var ctx = canvas.getContext('2d');
var newCtx = newCanvas.getContext('2d');


// Lee el archivo que haya en el
// elemento "input" del HTML.
function handleImage(e) {

  // Leemos el archivo
  var reader = new FileReader();
  reader.onload = function(event) {
    onReaderLoad(event);
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

//Tarea 1

function filtrosT1(elemento) {
  // Se obtiene "data", arreglo con la información
  // de los pixeles de la imagen en el canvas.
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

// Función 1: Promediando (i.e., rápido y sucio).
// Gray = (Red + Green + Blue) / 3
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

// Función 2: Corrección para el ojo humano.
// Gray = (Red * 0.3 + Green * 0.59 + Blue * 0.11)
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

// Función 3: Luma. Recomendación (BT.709).
// Gray = (Red * 0.2126 + Green * 0.7152 + Blue * 0.0722)
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

// Función 4: Desaturación.
// Gray = ( Max(Red, Green, Blue) + Min(Red, Green, Blue) ) / 2
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

// Función 5: Descomposición máxima.
// Gray = Max(Red, Green, Blue)
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

// Función 6: Descomposición mínima.
// Gray = Min(Red, Green, Blue)
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

// Función 7: Escala de grises generada utilizando solo valores de canal rojo.
// Gray = Red
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

// Función 8: Escala de grises generada utilizando solo valores de canal verde
// Gray = Green
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

// Función 9: Escala de grises generada utilizando solo valores de canal azul
// Gray = Blue
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


// Función brillo: 
// Sumar o restar una constante a cada componente de cada pixel.
function brillo() {
  //Obtenemos el valor del slider.
  var value = document.getElementById("myRange").value;

  // Se obtiene "data", arreglo con la información
  // de los pixeles de la imagen en el canvas.
  var context = newCanvas.getContext("2d");
  var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
  var data = imageData.data;

  // Función mayor:
  // Verifica si el valor es mayor a 255, si la condición se cumple,
  // se le asigna 255 al valor recibido.
  function mayor(valor) {
    if(valor >255){
      return 255;
    }else{
      return valor;
    }
  }

  // Función menor: 
  // Verifica si el valor es menor a 0, si la condición se cumple,
  // se le asigna 0 al valor recibido.
  function menor(valor) {
    if(valor < 0){
      return  0;
    }else{
      return valor;
    }
  }

  // Recorremos los pixeles y le sumamos el valor recibido por
  // el slider.
  for (var i = 0; i < data.length; i+=4){
    //data[i] += value;
    //data[i+1] += value;
    //data[i+2] += value;

    data[i] = parseInt(data[i]) + parseInt(value);
    data[i+1] = parseInt(data[i+1]) + parseInt(value);
    data[i+2] = parseInt(data[i+2]) + parseInt(value);

    // Verificamos si el valor es mayor a 255.
    data[i] = mayor(data[i]);
    data[i+1] = mayor(data[i+1]);
    data[i+2] = mayor(data[i+2]);

    // Verificamos si el valor es menor a 0.
    data[i] = menor(data[i]);
    data[i+1]= menor(data[i+1]);
    data[i+2] = menor(data[i+2]);
  }

  //Pinta los datos ya modificados en el canvas.
  context.putImageData(imageData,0,0)
}

// Función mosaico:
function filtroMosaico() {
  // Se obtiene el valor del tamaño.
  var tam = document.getElementById("botonTam").value;

  // Si no se especifica un tamaño...
  if (tam == "") {
    error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Mosaico) ");
    return;
  }

  // Si el tamaño no es un número...
  if (isNaN(tam)) {
    error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Mosaico)");
    return;
  }

  // Si sí es, se convierte en "int".
  else tam = parseInt(tam);

  // Se obtiene "data", arreglo con la información
  // de los pixeles de la imagen en el canvas.
  var context = newCanvas.getContext("2d");
  var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
  var data = imageData.data;

  // Se nombra el ancho y alto del canvas.
  var height = newCanvas.height;
  var width = newCanvas.width;

  // Función que calcula el color promedio [R, G, B]
  // de una casilla dado el pixel (x, y) utilizando
  // el tamaño especificado previamente.
  function calcularPromedio(x, y) {

    // Color promedio en R, G y B respectivamente.
    var r = 0;
    var g = 0;
    var b = 0;

    // Se lleva un conteo de los pixeles tomados
    // en cuenta para no contar pixeles fuera de
    // la imagen al momento de calcular el promedio.
    var count = 0;

    // Se recorre cada uno de los pixeles de la casilla
    // en donde cada pixel tiene coordenadas (j, k).
    for (var j = y; j < y + tam; j++)
      for (var k = x; k < x + tam; k++) {
        // Si j y/o k se sale de la imagen, ya no
        // se cuenta en el promedio del color.
        if (k >= width || j >= height) continue;
        // Dado el pixel (j, k), se evalúa en qué
        // parte del arreglo "data" se encuentra
        // la información de dicho pixel.
        var i = (k + j * width) * 4;
        // Se suman los colores respectivos de
        // cada pixel al promedio y se incrementa
        // el conteo.
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

    // Se calcula el promedio de cada color y se
    // devuelve en un arreglo de la forma [R, G, B].
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    return [r, g, b];
  }  // ----- Fin de calcularPromedio() -----

  // Se recorre cada casilla de tamaño "tam" que se
  // encuentra en la posición del pixel "x" y "y".
  for (var y = 0; y < height; y += tam) {
    for (var x = 0; x < width; x += tam) {
      // Se guarda el color [R, G, B] promedio de la casilla.
      var arr = calcularPromedio(x, y);
      // Se dice qué color (el anterior) se pintará.
      context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
      // Se pinta toda la casilla con ese color.
      context.fillRect(x, y, tam, tam);
    }
  }

}

//Tarea 2

function filtrosT2(elemento) {
  // Se obtiene "data", arreglo con la información
  // de los pixeles de la imagen en el canvas.
  var context = newCanvas.getContext("2d");
  var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);

  switch (elemento.id) {
    case "Alto Contraste":
      context.putImageData(altoContraste(imageData),0,0);
      break;
    case "Inverso":
        context.putImageData(inverso(imageData),0,0);
        break;
    case "componentesRGB":
        context.putImageData(componentesRGB(imageData),0,0);
        break;
  }
}


function altoContraste(imageData) {
  var data = imageData.data;
  
  function aux(valor) {
    if(valor > 127){
      return 255;
    }else{
      return 0;
    }
  }

  for (var i = 0; i < data.length; i+=4){
    const luma = (data[i]*0.2126 + data[i+1]*0.7152 + data[i+2]*0.0722) ;
    data[i] = luma;
    data[i+1] = luma;
    data[i+2] = luma;

    data[i] = aux(data[i]);
    data[i+1] = aux(data[i+1]);
    data[i+2] = aux(data[i+2]);
  }

  return imageData;

}

function inverso(imageData) {
  var data = imageData.data;
  
  function aux(valor) {
    if(valor > 127){
      return 0;
    }else{
      return 255;
    }
  }

  for (var i = 0; i < data.length; i+=4){
    const luma = (data[i]*0.2126 + data[i+1]*0.7152 + data[i+2]*0.0722) ;
    data[i] = luma;
    data[i+1] = luma;
    data[i+2] = luma;

    data[i] = aux(data[i]);
    data[i+1] = aux(data[i+1]);
    data[i+2] = aux(data[i+2]);
  }

  return imageData;

}

function componentesRGB(imageData) {
  var data = imageData.data;
  
  // Se obtiene el valor que se le quiere agregar a rojo.
  var rojo_rgb = document.getElementById("RGB_Rojo").value;
  
  // Se obtiene el valor que se le quiere agregar a verde.
  var verde_rgb = document.getElementById("RGB_Verde").value;
  // Se obtiene el valor que se le quiere agregar a azul.
  var azul_rgb = document.getElementById("RGB_Azul").value;

  // Si no se especifica un valor...
  if (rojo_rgb == "" || verde_rgb == "" || azul_rgb == "") {
    error("Asegurate de haber ingresado un valor para cada color. (Filtro: Componentes RGB)");
    return;
  }

  // Si algún valor no es un número...
  if (isNaN(rojo_rgb) || isNaN(verde_rgb) || isNaN(azul_rgb)) {
    error("El valor debe ser un número. (Filtro: Componentes RGB)");
    return;
  }

  for (var i = 0; i < data.length; i+=4){
    data[i] = parseInt(data[i]) + parseInt(rojo_rgb);
    data[i+1] = parseInt(data[i+1]) + parseInt(verde_rgb);
    data[i+2] = parseInt(data[i+2]) + parseInt(azul_rgb);
  }

  
  return imageData;

}