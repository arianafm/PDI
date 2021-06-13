//Tarea 4

//Marca de agua.
function MarcaAgua() {
    error("");

    // Se obtiene el valor del cuadro de texto llamado: T4MarcaAgua.
    var texto = document.getElementById("T4MarcaAgua").value;

    var tam = document.getElementById("T4MarcaAguaTam").value;

    // Si no se especifica un texto...
    if (texto == "") {
        error("Ingresa un valor en <i>Texto</i>. (Filtro: Marca de agua, Sección: Tarea 4)");
        return;
    }

    // Si no se especifica un tamaño...
    if (tam == "") {
        error("Ingresa un valor en <i>Tamaño</i>. (Filtro: Marca de agua, Sección: Tarea 4)");
        return;
    }

    // Si el tamaño no es un número...
    if (isNaN(tam)) {
        error("El valor en <i>Tamaño</i> debe ser un número. (Filtro: Marca de agua, Sección: Tarea 4)");
        return;
    }

    var context = newCanvas.getContext("2d");

    // Se nombra el ancho y alto del canvas.
    var height = newCanvas.height/2;
    var width = newCanvas.width/2;

    // Centramos el texto en el centro del canvas.
    context.textAlign = "center";
    context.textBaseline = "middle";

    // La marca de agua la fijamos con color blanco y con 50% de transparencia.
    context.fillStyle = "rgba(255,255,255,.5)"

    // Establecemos las propiedades de fuente.
    context.font = tam + "px Arial";

    // La alineación es relativa a una línea vertical imaginaria en la posición x
    // del texto definido por fillText.
    context.fillText(texto, width, height);

  
}