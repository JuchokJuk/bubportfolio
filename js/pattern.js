const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth && document.documentElement.clientWidth ?
        Math.min(window.innerWidth, document.documentElement.clientWidth) :
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth;

    canvas.height = canvas.parentNode.clientHeight;
}
resize();
window.addEventListener(`resize`, event => {
    resize()
}, false);



function drawLine(x0, y0, length, rotation) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + Math.sin(time + rotation) * length, y0 + Math.cos(time + rotation) * length);
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 1;
    ctx.stroke();
}

let time = 0;
const targetLength = 6;
let length = 0;
const cellSize = 24;
const animate = () => {
    if (length < targetLength) {
        length += 0.07;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width + cellSize; x = x + cellSize) {
        for (let y = 0; y < canvas.height + cellSize; y = y + cellSize) {
            drawLine(x, y, length + length/2 * Math.sin(time), Math.sqrt((canvas.width / 2 - x) ** 2 + (canvas.height - y) ** 2) * 0.01);
        }
    }
    time += 0.01;
    requestAnimationFrame(animate);
}
animate();