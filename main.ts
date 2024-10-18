const form = document.getElementById('rectangleForm');
const rectanglePreview = document.getElementById('rectanglePreview');
const errorMessage = document.getElementById('errorMessage');

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext('2d');

function draw() {
    if(ctx) {

            // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Пример рисования (случайные цвет и круг)
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 20 + Math.random() * 30;
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    }

}


document.getElementById('redrawButton')!.addEventListener('click', function(event) {
    event.preventDefault(); 
    draw();
});



function getRectangleParams(prefix: string) {
    return {
        x: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}X`)).value),
        y: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}Y`)).value),
        width: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}Width`)).value),
        height: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}Height`)).value),
    };
}

function validateRectangleParams({ x, y, width, height }) {
    return width > 0 && height > 0;
}





