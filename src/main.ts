import dataConverter from './data-handle/dataConverter'
import { ConnectionPoint, Point, Rect } from './data-handle/types';

const errorElement = <HTMLInputElement>document.getElementById('errorMessage');
const canvas = <HTMLCanvasElement>document.getElementById("canvas");

const ctx = canvas.getContext('2d');

createGraph();

document.getElementById('redrawButton')!.addEventListener('click', function (event) {
    event.preventDefault();
    createGraph();
});

function draw(rect1: Rect, rect2: Rect, path: Point[]) {

    if (ctx) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(168, 210, 255)";
        [rect1, rect2].forEach(rect => {
            ctx.fillRect(rect.position.x - 0.5 * rect.size.width, rect.position.y - 0.5 * rect.size.height, rect.size.width, rect.size.height);
        });

        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        path.forEach((point, index) => {
            if (index) ctx.lineTo(point.x, point.y);
        })
        ctx.stroke(); 

    }

}

function createGraph() {
    printError('');
    try {

        const data = {
            rect1: getRectangleParams('rect1'),
            rect2: getRectangleParams('rect2'),
            cPoint1: getcPointParams('rect1'),
            cPoint2: getcPointParams('rect2')
        }

        const path = dataConverter(data.rect1, data.rect2, data.cPoint1, data.cPoint2);
        draw(data.rect1, data.rect2, path);


    } catch (error) {
        let message = 'Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.';
        if (error instanceof Error) message = error.message;
        printError(message);
        return;
    }
}

function getRectangleParams(prefix: string): Rect {
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

function getcPointParams(prefix: string): ConnectionPoint {
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





