var tam = 10;

var width = 0;
var height = 0;

var x = 0;
var y = 0;

var m = 0;
var n = 0;

var auxcanvas = document.getElementById("auxcanvas");
var auxcontext = auxcanvas.getContext("2d");

auxcanvas.setAttribute("width", tam);
auxcanvas.setAttribute("height", tam);

var imageData;

function recursivo(aux) {

    var context = newCanvas.getContext("2d");
    var imageData_newCanvas = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData_newCanvas.data;

    var width = newCanvas.width;
    var height = newCanvas.height;
     
    let r = 0;
    let g = 0; 
    let b = 0;

    function auxColor(k, j, width) {
        var i = (k + j * width) * 4;
        return { R: i, G: i + 1, B: i + 2};
    }

    function auxPixel(funct) {
        let color_index;
        let new_color;
        for (let i = 0; i < tam; i++) {

            for (let j = 0; j < tam; j++) {

                color_index = auxColor(i, j, tam);

                new_color = funct(  imageData.data[color_index.R],
                                    imageData.data[color_index.G], 
                                    imageData.data[color_index.B]);
    
                imageData.data[color_index.R] = new_color.R;
                imageData.data[color_index.G] = new_color.G;
                imageData.data[color_index.B] = new_color.B;

            }

        }
    }

    function rec_gris(factor) {
        let gray;
        auxPixel(function (R, G, B) {
            gray = (R + G + B) / 3;
            return { R: gray+factor,
                     G: gray+factor, 
                     B: gray+factor };
        });
    }

    function rec_color(r,g,b){
        auxPixel(function (R, G, B) {
            return { R: R & r,
                     G: G & g,
                     B: B & b };
        });  
    }

    while (x < width) {

        if ((x + tam) < width){
            m = tam;
        }else{
            m = width - x;
        }

        while (y < height) {

            if ((y + tam) < height){
                n = tam;
            }else{
                n = height - y;
            }

            for (let i = 0; i < m; i++) {

                for (let j = 0; j < n; j++) {

                    let pixel = auxColor(i + x, j + y, newCanvas.width);

                    r += data[pixel.R];
                    g += data[pixel.G];
                    b += data[pixel.B];

                }

            }  
            
            r = r/(m * n);
            g = g/(m * n);
            b = b/(m * n);


            auxcontext.clearRect(0, 0, tam, tam);
            auxcontext.drawImage(newCanvas, 0, 0, tam, tam);

            imageData = auxcontext.getImageData(0, 0, auxcanvas.width, auxcanvas.height);
        
            if (aux) {
                rec_color(r,g,b)
            } else {
                rec_gris(r);
            }

            context.putImageData(imageData, x, y);

            y += n;

        }

        x += m; y = 0;

    }

    tam = 10;

    width = 0;
    height = 0;

    x = 0;
    y = 0;

    m = 0;
    n = 0;

}

