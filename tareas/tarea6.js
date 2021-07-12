//Tarea 6: Semitonos.

// Se declara el valor del tamaño de las imágenes.
var tam = 3;

var width = 0;
var height = 0;

var x = 0;
var y = 0;

var m = 0;
var n = 0;

var auxcanvas_st = document.getElementById("auxcanvas_st");
var auxcontext = auxcanvas_st.getContext("2d");

auxcanvas_st.setAttribute("width", tam);
auxcanvas_st.setAttribute("height", tam);

img = document.getElementById("aux");
img.setAttribute("width", tam);
img.setAttribute("height", tam);

var imageData;

// Filtro semitonos.
// Escogerá alguno de los tres diferentes filtros de acuerdo a la cadena
// que se le pase como parámetro.
async function semiTono (semitono) {

    var context = newCanvas.getContext("2d");

    // Se nombra el ancho y alto del canvas.
    width = newCanvas.width;
    height = newCanvas.height;

    img.onload=()=>{
        
    }

    // Imágenes que se tomará de acuerdo al semitono seleccionado por el 
    // usuario.
    switch (semitono) {
        case "st_1":
            fotos=[ "./semitonos/a1.jpg","./semitonos/a2.jpg",
                    "./semitonos/a3.jpg","./semitonos/a4.jpg",
                    "./semitonos/a5.jpg","./semitonos/a6.jpg",
                    "./semitonos/a7.jpg","./semitonos/a8.jpg",
                    "./semitonos/a9.jpg","./semitonos/a10.jpg"];
            break;
        case "st_2":
            fotos=[ "./semitonos/b9.jpg","./semitonos/b8.jpg",
                    "./semitonos/b7.jpg","./semitonos/b6.jpg",
                    "./semitonos/b5.jpg","./semitonos/b4.jpg",
                    "./semitonos/b3.jpg","./semitonos/b2.jpg",
                    "./semitonos/b1.jpg","./semitonos/b0.jpg"];
            break;
        case "st_3":
            fotos=[ "./semitonos/c4.jpg","./semitonos/c3.jpg",
                    "./semitonos/c2.jpg","./semitonos/c1.jpg",
                    "./semitonos/c0.jpg"];
            break;
    }

    let arr_fotos = fotos;
    let grises = fotos.length-1;
    let promedio;
    let cadena;

    // Se obtiene "data", arreglo con la información
    // de los pixeles de la imagen en el canvas.
    var imageData_newCanvas = context.getImageData(0, 0, newCanvas.width, newCanvas.height);
    var data = imageData_newCanvas.data;

    // Color promedio en R, G y B respectivamente.
    let r = 0;
    let g = 0; 
    let b = 0;


    function auxColor(k, j, width) {
        var i = (k + j * width) * 4;
            return { R: i, G: i + 1, B: i + 2};
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

            promedio = Math.round((r+g+b)/3);

            if (promedio > 255) {
                promedio = 255;
            }
            
            cadena = arr_fotos[Math.round((promedio / 255) * grises)];

            auxcontext.clearRect(0, 0, tam, tam);
            
            await 
                    new Promise((resolve,reject)=>{
        
                        img.setAttribute("src", (cadena));
                        
                        img.onload= ()=>{

                        auxcontext.drawImage(img, 0, 0, tam, tam);
                        imageData = auxcontext.getImageData(0, 0, auxcanvas_st.width, auxcanvas_st.height);
                        context.putImageData(imageData, x, y);
                        resolve(1);

                        }
                    });
            
            y += n;

        }
        x += m; y = 0;

    }

    // Se reinician los valores para en caso de limpiar y querer
    // volver a utilizar esta función funcione de manera correcta.
    tam = 3;

    width = 0;
    height = 0;

    x = 0;
    y = 0;

    m = 0;
    n = 0;

}





