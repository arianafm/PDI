//Tarea 2

function filtrosT2(elemento) {
    // Se obtiene "data", arreglo con la información
    // de los pixeles de la imagen en el canvas.
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);

    switch (elemento.id) {
        case "Alto Contraste":
            context.putImageData(altoContraste(imageData), 0, 0);
            break;
        case "Inverso":
            context.putImageData(inverso(imageData), 0, 0);
            break;
        case "componentesRGB":
            context.putImageData(componentesRGB(imageData), 0, 0);
            break;
        case "softBlur":
            softBlur();
            break;
        case "blur":
            blur();
            break;
        case "motionBlur":
            motionBlur();
            break;
        case "findEdges":
            findEdges();
            break;
        case "sharpen":
            sharpen();
            break;
        case "emboss":
            emboss();
            break;
    }
}


function altoContraste(imageData) {
    var data = imageData.data;

    function aux(valor) {
        if (valor > 127) {
            return 255;
        } else {
            return 0;
        }
    }

    for (var i = 0; i < data.length; i += 4) {
        const luma = (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722);
        data[i] = luma;
        data[i + 1] = luma;
        data[i + 2] = luma;

        data[i] = aux(data[i]);
        data[i + 1] = aux(data[i + 1]);
        data[i + 2] = aux(data[i + 2]);
    }

    return imageData;

}

function inverso(imageData) {
    var data = imageData.data;

    function aux(valor) {
        if (valor > 127) {
            return 0;
        } else {
            return 255;
        }
    }

    for (var i = 0; i < data.length; i += 4) {
        const luma = (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722);
        data[i] = luma;
        data[i + 1] = luma;
        data[i + 2] = luma;

        data[i] = aux(data[i]);
        data[i + 1] = aux(data[i + 1]);
        data[i + 2] = aux(data[i + 2]);
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

    for (var i = 0; i < data.length; i += 4) {
        data[i] = parseInt(data[i]) + parseInt(rojo_rgb);
        data[i + 1] = parseInt(data[i + 1]) + parseInt(verde_rgb);
        data[i + 2] = parseInt(data[i + 2]) + parseInt(azul_rgb);
    }


    return imageData;

}


function convolucion(matriz) {
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    let newImageData = context.createImageData(newCanvas.width, newCanvas.height);
    var data = imageData.data;

    let margen_x = Math.floor(matriz.tamano_n / 2);
    let margen_y = Math.floor(matriz.tamano_m / 2);

    let entrada_x, entrada_y;

    let color_index;
    let new_color;

    function auxColorIndex(x, y, width) {
        let color_pos = x * 4 + y * (width * 4);
        return { R: color_pos, G: color_pos + 1, B: color_pos + 2, A: color_pos + 3 };
    }

    for (let i = margen_x; i < newCanvas.width - margen_x; i++) {
        for (let j = margen_y; j < newCanvas.height - margen_y; j++) {
            new_color = { R: 0, G: 0, B: 0 };

            for (let entrada = 0; entrada < matriz.valores.length; entrada++) {
                entrada_x = (entrada % matriz.tamano_n) - margen_x;
                entrada_y = Math.floor(entrada / matriz.tamano_n) - margen_y;

                color_index = auxColorIndex(i + entrada_x, j + entrada_y, newCanvas.width);

                new_color.R += data[color_index.R] * matriz.valores[entrada];
                new_color.G += data[color_index.G] * matriz.valores[entrada];
                new_color.B += data[color_index.B] * matriz.valores[entrada];
            }

            color_index = auxColorIndex(i, j, newCanvas.width);
            newImageData.data[color_index.R] = new_color.R;
            newImageData.data[color_index.G] = new_color.G;
            newImageData.data[color_index.B] = new_color.B;
            newImageData.data[color_index.A] = data[color_index.A];
        }
    }

    context.putImageData(newImageData, 0, 0)

}

// Soft Blur: Desenfoca suavemente la imagen. Completamos 5 veces el valor 0.2 en el filtro.
function softBlur() {
    let matriz = {
        valores:
            [
                0.0, 0.2, 0.0,
                0.2, 0.2, 0.2,
                0.0, 0.2, 0.0
            ],
        tamano_n: 3, tamano_m: 3
    }

    convolucion(matriz);
}

// Blur: Desenfoca la imagen. El factor (13) se divide por la suma de todos los elementos.
function blur() {
    let matriz = {
        valores:
            [
                0, 0, 1 / 13, 0, 0,
                0, 1 / 13, 1 / 13, 1 / 13, 0,
                1 / 13, 1 / 13, 1 / 13, 1 / 13, 1 / 13,
                0, 1 / 13, 1 / 13, 1 / 13, 0,
                0, 0, 1 / 13, 0, 0
            ],
        tamano_n: 5, tamano_m: 5
    }

    convolucion(matriz);
}

// Motion Blur: Difuminamos en una sola dirección. El siguiente es un
// filtro de desenfoque de movimiento de 9x9.
function motionBlur() {
    let matriz = {
        valores:
            [
                1 / 9, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 1 / 9, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 1 / 9, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1 / 9, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 1 / 9, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 1 / 9, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 1 / 9, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 1 / 9, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 1 / 9
            ],
        tamano_n: 9, tamano_m: 9
    }

    convolucion(matriz);
}

// Find Edges: Filtro para encontrar bordes de 45°.
function findEdges() {
    let matriz = {
        valores:
            [
                -1, 0, 0, 0, 0,
                0, -2, 0, 0, 0,
                0, 0, 6, 0, 0,
                0, 0, 0, -2, 0,
                0, 0, 0, 0, -1,
            ],
        tamano_n: 5, tamano_m: 5
    }

    convolucion(matriz);
}

// Sharpen: Imagen con el mismo brillo que el original pero más nítida. 
function sharpen() {
    let matriz = {
        valores:
            [
                -1, -1, -1,
                -1, 9, -1,
                -1, -1, -1
            ],
        tamano_n: 3, tamano_m: 3
    }

    convolucion(matriz);
}


// Emboss: Efecto de sombra 3D a la imagen, el resultado es muy útil para un mapa 
// de relieve de la imagen. En este caso los valores nos proporcionan un filtro de 
// relieve muy exagerado.
function emboss() {
    let matriz = {
        valores:
            [
                -1, -1, -1, -1, 0,
                -1, -1, -1, 0, 1,
                -1, -1, 0, 1, 1,
                -1, 0, 1, 1, 1,
                0, 1, 1, 1, 1
            ],
        tamano_n: 5, tamano_m: 5
    }

    convolucion(matriz);
}