import dataConverter from './data-handle/dataConverter'
import { Point, Rect } from './data-handle/types';
import { changeRectangleParamsByDelta, setCPoint } from './visual-handle/changeFormData';
import { getcPointParams, getPointOnRectSide, getRectangleParams } from './visual-handle/getFormData';
import settings from './graphSettings.json';

const errorElement = <HTMLInputElement>document.getElementById('errorMessage');
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const rectCoordinators = document.getElementsByClassName("js-rect-coordinator");
const cPointCoordinators = document.getElementsByClassName("js-cpoint-coordinator");

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
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2; 
            ctx.strokeRect(rect.position.x - 0.5 * rect.size.width, rect.position.y - 0.5 * rect.size.height, rect.size.width, rect.size.height);
        });

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2; 
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



function printError(message: string) {
    errorElement.textContent = message;
}

Array.prototype.forEach.call(rectCoordinators,
    (rectCoordinator) => {
        rectCoordinator.addEventListener('click', function (event: MouseEvent) {
            if (event.target instanceof HTMLButtonElement && event.target.dataset.action && event.target.dataset.rect) {
                const action = event.target.dataset.action;
                changeRectangleParamsByDelta(event.target.dataset.rect, {
                    x: ['left', 'right'].includes(action) ? (action === 'left' ? 0 - settings.rectGap : settings.rectGap) : 0,
                    y: ['up', 'down'].includes(action) ? (action === 'down' ? 0 - settings.rectGap : settings.rectGap) : 0,
                });
                createGraph();
            }
        })
    }
);

Array.prototype.forEach.call(cPointCoordinators,
    (rectCoordinator) => {
        rectCoordinator.addEventListener('click', function (event: MouseEvent) {
            if (event.target instanceof HTMLButtonElement && event.target.dataset.action && event.target.dataset.rect) {
                setCPoint(event.target.dataset.rect, getPointOnRectSide(event.target.dataset.rect, event.target.dataset.action));
                createGraph();
            }
        })
    }
);