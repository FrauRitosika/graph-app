import dataConverter from './data-handle/dataConverter'

const errorElement = <HTMLInputElement>document.getElementById('errorMessage');

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext('2d');
if(ctx) {
    ctx.translate(0, 500);
}


function draw() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgb(69, 159, 255)";
        ctx.fillRect(100,-100,40,40);

        ctx.fillRect(300,-100,40,40);
        
        console.log('нарисовал');
    }

}


document.getElementById('redrawButton')!.addEventListener('click', function (event) {
    event.preventDefault();
    try {
        dataConverter(getRectangleParams('rect1'), getRectangleParams('rect2'), getcPointParams('rect1'), getcPointParams('rect2'));
    } catch (error) {
        let message = 'Неизвестная ошибка';
        if (error instanceof Error) message = error.message;
        printError(message);
        return;
    }

    draw();
});



function getRectangleParams(prefix: string) {
    return {
        position: {
            x: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}X`)).value),
            y: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}Y`)).value)
        },
        size: {
            width: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}Width`)).value),
            height: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}Height`)).value)
        }
    };
}

function getcPointParams(prefix: string) {
    return {
        point: {
            x: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}cPointX`)).value),
            y: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}cPointY`)).value)
        },
        angle: parseFloat((<HTMLInputElement>document.getElementById(`${prefix}cPointAngle`)).value)
    };
}

function printError(message: string) {
    errorElement.textContent = message;
}





