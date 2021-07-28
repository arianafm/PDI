function filtrosT7(elemento) {
    switch (elemento.id) {
        case "max":
            max();
            break;
        case "min":
            min();
            break;
    }
}

function convolucion(matriz, str) {
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
            
            let opc;

            (str == "max") ? (opc = 0) : (opc = 300);

            for (let entrada = 0; entrada < matriz.valores.length; entrada++) {

                entrada_x = (entrada % matriz.tamano_n) - margen_x;
                entrada_y = Math.floor(entrada / matriz.tamano_n) - margen_y;

                color_index = auxColorIndex(i + entrada_x, j + entrada_y, newCanvas.width);

                let grey = (imageData.data[color_index.R] +
                            imageData.data[color_index.G] +
                            imageData.data[color_index.B] )/3;

                (str == "max") ? opc = Math.max(opc,grey) : opc = Math.min(opc,grey);
            }

            color_index = auxColorIndex(i, j, newCanvas.width);
            newImageData.data[color_index.R] = opc;
            newImageData.data[color_index.G] = opc;
            newImageData.data[color_index.B] = opc;
            newImageData.data[color_index.A] = data[color_index.A];
        }
    }

    context.putImageData(newImageData, 0, 0)

}

function max() {
    let matriz = {
        valores:
            [
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ],
        tamano_n: 3, tamano_m: 3
    }

    convolucion(matriz,"max");
}

function min() {
    let matriz = {
        valores:
            [
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ],
        tamano_n: 3, tamano_m: 3
    }

    convolucion(matriz,"min");
}