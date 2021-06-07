//Tarea 3

function _loadFont(fontname) {
    var canvas = document.createElement("canvas");
    //Establecer la altura y el ancho no es realmente necesario
    //canvas.width = 16;
    //canvas.height = 16;
    var ctx = canvas.getContext("2d");

    //No es necesario colocar el lienzo en ninguna parte,
    //llamar a fillText es suficiente para que el navegador cargue la fuente activa

    //Si tienes más de una fuente personalizada, puede dibujarlas todas aquí:
    ctx.font = "4px " + fontname;
    ctx.fillText("text", 0, 8);
}

_loadFont("Dominoblanco")
_loadFont("Dominonegro")
_loadFont("Naipesfont")

// auxLetras: Usamos 16 letras para simular los 256 tonos.
function auxLetras(promedio) {
    let simbolo;

    if (promedio > 0 && promedio <= 15)
        simbolo = 'M';
    else if (promedio >= 16 && promedio <= 31)
        simbolo = 'N';
    else if (promedio >= 32 && promedio <= 47)
        simbolo = 'H';
    else if (promedio >= 48 && promedio <= 63)
        simbolo = '#';
    else if (promedio >= 64 && promedio <= 79)
        simbolo = 'Q';
    else if (promedio >= 80 && promedio <= 95)
        simbolo = 'U';
    else if (promedio >= 96 && promedio <= 111)
        simbolo = 'A';
    else if (promedio >= 112 && promedio <= 127)
        simbolo = 'D';
    else if (promedio >= 128 && promedio <= 143)
        simbolo = '0';
    else if (promedio >= 144 && promedio <= 159)
        simbolo = 'Y';
    else if (promedio >= 160 && promedio <= 175)
        simbolo = '2';
    else if (promedio >= 176 && promedio <= 191)
        simbolo = '$';
    else if (promedio >= 192 && promedio <= 209)
        simbolo = '%';
    else if (promedio >= 210 && promedio <= 225)
        simbolo = '+';
    else if (promedio >= 226 && promedio <= 239)
        simbolo = '.';
    else if (promedio >= 240 && rgbPromedio <= 255)
        simbolo = ' ';
    return simbolo;

}

// auxDomino: Simulamos los 256 tonos.
function auxDomino(promedio) {
    let simbolo;

    if (promedio > 0 && promedio <= 25)
        simbolo = '1';
    else if (promedio >= 26 && promedio <= 50)
        simbolo = '2';
    else if (promedio >= 51 && promedio <= 75)
        simbolo = '3';
    else if (promedio >= 76 && promedio <= 100)
        simbolo = '4';
    else if (promedio >= 101 && promedio <= 125)
        simbolo = '5';
    else if (promedio >= 126 && promedio <= 150)
        simbolo = '6';
    else if (promedio >= 151 && promedio <= 175)
        simbolo = '7';
    else if (promedio >= 176 && promedio <= 200)
        simbolo = '8';
    else if (promedio >= 201 && promedio <= 225)
        simbolo = '9';
    else if (promedio >= 226 && promedio <= 256)
        simbolo = '0';
    return simbolo;

}

// auxNaipes: Simulamos los 256 tonos.
function auxNaipes(promedio) {
    let simbolo;

    if(promedio > 0 && promedio <= 19) 
        simbolo = 'A';
    else if(promedio >= 20 && promedio <= 38) 
        simbolo = 'B';
    else if(promedio >= 39 && promedio <= 57) 
        simbolo = 'C';
    else if(promedio >= 58 && promedio <= 76) 
        simbolo = 'D';
    else if(promedio >= 77 && promedio <= 95) 
        simbolo = 'E';
    else if(promedio >= 96 && promedio <= 114) 
        simbolo = 'F';
    else if(promedio >= 115 && promedio <= 133) 
        simbolo = 'G';
    else if(promedio >= 134 && promedio <= 152) 
        simbolo = 'H';
    else if(promedio >= 153 && promedio <= 171) 
        simbolo = 'I';
    else if(promedio >= 172 && promedio <= 190) 
        simbolo = 'J';
    else if(promedio >= 191 && promedio <= 209) 
        simbolo = 'K';
    else if(promedio >= 210 && promedio <= 228) 
        simbolo = 'L';
    else if(promedio >= 229 && promedio <= 256) 
        simbolo = 'M';
    return simbolo;

}

// colorLetra: Una sola letra para formar la imagen (color).
function ColorLetra() {
    error("");

    // Se obtiene el valor del tamaño.
    var tam = document.getElementById("T3Tamano").value;

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Color, Sección: Tarea 3)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Color, Sección: Tarea 3)");
        return;
    }

    // Si sí es, se convierte en "int".
    else tam = parseInt(tam);

    //Se obtiene la letra deseada.
    var letra = document.getElementById("T3Letra").value;

    // Si no se especifica una letra...
    if (letra == "") {
        error("Ingresa un valor en <i>Letra</i>. (Filtro: Color, Sección: Tarea 3)");
        return;
    }

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
    }
    // ----- Fin de calcularPromedio() -----

    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            // Se dice qué color (el anterior) se pintará.
            context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            context.fillText(letra, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }


}

// ByNLetra: Una sola letra para formar la imagen (blanco y negro).
function ByNLetra() {
    error("");

    // Se obtiene el valor del tamaño.
    var tam = document.getElementById("T3Tamano2").value;

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Blanco y negro, Sección: Tarea 3)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Blanco y negro, Sección: Tarea 3)");
        return;
    }

    // Si sí es, se convierte en "int".
    else tam = parseInt(tam);

    //Se obtiene la letra deseada.
    var letra = document.getElementById("T3Letra2").value;

    // Si no se especifica una letra...
    if (letra == "") {
        error("Ingresa un valor en <i>Letra</i>. (Filtro: Color, Sección: Tarea 3)");
        return;
    }

    // Se obtiene "data", arreglo con la información
    // de los pixeles de la imagen en el canvas.
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);

    gris2(imageData);

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
    }
    // ----- Fin de calcularPromedio() -----

    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            // Se dice qué color (el anterior) se pintará.
            context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            context.fillText(letra, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }

}

// Letras16: Letras que simulan tonos de gris
function Letras16() {
    error("");

    // Se obtiene el valor del tamaño.
    var tam = document.getElementById("T3Tamano3").value;

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Tonos gris, Sección: Tarea 3)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Tonos gris, Sección: Tarea 3)");
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
    }
    // ----- Fin de calcularPromedio() -----


    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            var promedio = (arr[0] + arr[1] + arr[2]) / 3;
            // Se dice qué color (el anterior) se pintará.
            context.fillText(auxLetras(Math.round(promedio)), x, y, tam);
            context.clearRect(x, y, tam, tam);


        }
    }

}

// Letras16Color: Letras que simulan tonos de gris (a color). Combinación del inciso 1 con el 3.
function Letras16Color() {
    error("");

    // Se obtiene el valor del tamaño.
    var tam = document.getElementById("T3Tamano4").value;

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Color, Sección: Tarea 3)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Color, Sección: Tarea 3)");
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
    }
    // ----- Fin de calcularPromedio() -----


    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            var promedio = (arr[0] + arr[1] + arr[2]) / 3;
            // Se dice qué color (el anterior) se pintará.
            context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            context.fillText(auxLetras(Math.round(promedio)), x, y, tam);
            context.clearRect(x, y, tam, tam);


        }
    }

}

// Letras16Comb: Letras que simulan tonos de gris. Combinación del inciso 2 con el 3.
function Letras16Comb() {
    error("");

    // Se obtiene el valor del tamaño.
    var tam = document.getElementById("T3Tamano5").value;

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Blanco y negro, Sección: Tarea 3)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Blanco y negro, Sección: Tarea 3)");
        return;
    }

    // Si sí es, se convierte en "int".
    else tam = parseInt(tam);


    // Se obtiene "data", arreglo con la información
    // de los pixeles de la imagen en el canvas.
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);

    gris2(imageData);

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
    }
    // ----- Fin de calcularPromedio() -----


    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            var promedio = (arr[0] + arr[1] + arr[2]) / 3;
            // Se dice qué color (el anterior) se pintará.
            context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            context.fillText(auxLetras(Math.round(promedio)), x, y, tam);
            context.clearRect(x, y, tam, tam);


        }
    }

}

// Letrero: Imagen hecha con un letrero que nos da el usuario
function Letrero() {
    error("");

    // Se obtiene el valor del letrero.
    var letrero = document.getElementById("T3Letrero").value;


    console.log(letrero);


    // Si no se especifica un letrero...
    if (letrero == "") {
        error("Ingresa un valor en <i>Letrero</i>. (Filtro: Letrero, Sección: Tarea 3)");
        return;
    }

    if (letrero.length < 2) {
        error("El <i>Letrero</i> debe tener 2 o más caracteres. (Filtro: Letrero, Sección: Tarea 3)")
    }

    var tam = 10;

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
    }
    // ----- Fin de calcularPromedio() -----

    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            // Se dice qué color (el anterior) se pintará.
            context.fillStyle = "rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")";
            context.fillText(letrero, x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }


}

// DominoBlancas: Imagen con fichas de dominó blancas (con puntos negros)
function DominoBlancas() {
    error("");

    // Se obtiene el valor del tamaño.
    var tam = document.getElementById("T3Tamano6").value;

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Domino Blancas, Sección: Tarea 3)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Domino Blancas, Sección: Tarea 3)");
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
    }
    // ----- Fin de calcularPromedio() -----


    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            var promedio = (arr[0] + arr[1] + arr[2]) / 3;
            // Se dice qué color (el anterior) se pintará.
            context.font = "9px Dominoblanco";
            context.fillText(auxDomino(Math.round(promedio)), x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }

}

// DominoNegras: Imagen con fichas de domino negras (con puntos blancos)
function DominoNegras() {
    error("");

    // Se obtiene el valor del tamaño.
    var tam = document.getElementById("T3Tamano7").value;

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Domino Negras, Sección: Tarea 3)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Domino Negras, Sección: Tarea 3)");
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
    }
    // ----- Fin de calcularPromedio() -----


    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            var promedio = (arr[0] + arr[1] + arr[2]) / 3;
            // Se dice qué color (el anterior) se pintará.
            context.font = "9px Dominonegro";
            context.fillText(auxDomino(Math.round(promedio)), x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }

}

// Naipes: Imagen con fichas de naipes.
function Naipes() {
    error("");

    // Se obtiene el valor del tamaño.
    var tam = document.getElementById("T3Tamano8").value;

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Naipes, Sección: Tarea 3)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Naipes, Sección: Tarea 3)");
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
    }
    // ----- Fin de calcularPromedio() -----


    // Se recorre cada casilla de tamaño "tam" que se
    // encuentra en la posición del pixel "x" y "y".
    for (var y = 0; y < height; y += tam) {
        for (var x = 0; x < width; x += tam) {
            // Se guarda el color [R, G, B] promedio de la casilla.
            var arr = calcularPromedio(x, y);
            var promedio = (arr[0] + arr[1] + arr[2]) / 3;
            // Se dice qué color (el anterior) se pintará.
            context.font = "9px Naipesfont";
            context.fillText(auxNaipes(Math.round(promedio)), x, y, tam);
            context.clearRect(x, y, tam, tam);
        }
    }

}