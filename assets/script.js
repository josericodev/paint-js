// Obtén el elemento canvas y el contexto 2D
var canvas = document.querySelector('#paintCanvas');
var context = canvas.getContext('2d');

// Configuración del paint.
var strokeStyle = "#000000";
var lineWidth = 50;

// Obtenemos los inputs.
var inputColor = document.querySelector("#inputColor");
var inputRange = document.querySelector("#inputRange");

// Obtenemos los span.
var textInputColor = document.querySelector("#textInputColor");
var textInputRange = document.querySelector("#textInputRange");

// Variables para controlar el dibujo
var painting = false;

// Función para comenzar a dibujar
function startPosition(e) {
    painting = true;
    draw(e);
}

// Función para dejar de dibujar
function endPosition() {
    painting = false;
    context.beginPath();
}

// Función para dibujar
function draw(e) {
    if (!painting) return;

    context.lineWidth = lineWidth; // Grosor del trazo
    context.lineCap = 'round'; // Forma del extremo del trazo
    context.strokeStyle = strokeStyle; // Color del trazo

    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Eventos del mouse para dibujar
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Eventos de los inputs.
inputColor.addEventListener('change', e => {
    strokeStyle = e.target.value;
    textInputColor.textContent = e.target.value;
});

inputRange.addEventListener('change', e => {
    lineWidth = e.target.value;
    textInputRange.textContent = e.target.value;
});

// Función para limpiar el canvas
document.querySelector('#clearButton').addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Función para guardar como PNG
document.querySelector('#saveButton').addEventListener('click', function() {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.href = image;
    link.download = 'lienzo.png';
    link.click();
});

