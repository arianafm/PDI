function filtrosT8(elemento) {
    switch (elemento.id) {
        case "DR":
            DitheringRandom();
            break;
        case "DO":
            DitheringOrdenado();
            break;
        case "DD":
            DitheringDisperso();
            break;
    }
}

function DitheringRandom(){
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;

    for (let i = 0; i < newCanvas.width * newCanvas.height; i++) {
            let valor = i * 4;
            let avg = (data[valor] + data[valor+1] + data[valor+2])/3;

        if (avg > Math.random() * 255) {
            data[valor] = 255;
            data[valor+1] = 255;
            data[valor+2] = 255;                
        } else {
            data[valor] = 0;
            data[valor+1] = 0;
            data[valor+2] = 0;  
        }

    }

    context.putImageData(imageData, 0, 0)
}

function DitheringOrdenado(){    
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;

    let matriz = [[8/9, 3/9, 4/9],
                  [6/9, 1/9, 2/9],
                  [7/9, 5/9, 9/9]];
    
    for (let y = 0; y < newCanvas.height; y++) {
        for (let x = 0; x < newCanvas.width; x++) {
            let check = matriz[x % 3][y % 3] * 255;
            let valor = (y * newCanvas.width + x) * 4;
            let avg = (data[valor] + data[valor+1] + data[valor+2])/3;

            if (avg > check) {
                data[valor] = 255;
                data[valor+1] = 255;
                data[valor+2] = 255;
                
            } else {
                data[valor] = 0;
                data[valor+1] = 0;
                data[valor+2] = 0;
            }
            
        }
        
    }

    context.putImageData(imageData, 0, 0)  
    
}

function DitheringDisperso(){
    var context = newCanvas.getContext("2d");
    var imageData = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData.data;

    let matriz = [[1/9, 7/9, 4/9],
                  [5/9, 8/9, 3/9],
                  [6/9, 2/9, 9/9]];
    
    for (let y = 0; y < newCanvas.height; y++) {
        for (let x = 0; x < newCanvas.width; x++) {
            let check = matriz[x % 3][y % 3] * 255;
            let valor = (y * newCanvas.width + x) * 4;
            let grayScale = (data[valor] + data[valor+1] + data[valor+2])/3;

            if (grayScale > check) {
                data[valor] = 255;
                data[valor+1] = 255;
                data[valor+2] = 255;
                
            } else {
                data[valor] = 0;
                data[valor+1] = 0;
                data[valor+2] = 0;
            }
            
        }
    
    }

    context.putImageData(imageData, 0, 0) 

}
