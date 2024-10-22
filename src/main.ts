import dataConverter from './data-handle/dataConverter';
import { setRectangle, setCPoint, changePointByDelta, setGraphParams } from './data-form/changeFormData';
import { getcPointParams, getPointOnRectSide, getRectangleParams } from './data-form/getFormData';
import { drawGraph, focusOnRect } from './visual-handle/drawGraph';
import { initialGraph } from './visual-handle/initialGraph';
import { getRectPrefixByClick } from './visual-handle/getRectPrefixByClick';
import Rectangle from './data-handle/classes/Rectangle';
import { moveRect } from './visual-handle/moveElementsOnGraph';

const errorElement = <HTMLInputElement>document.getElementById('errorMessage');
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const rectCoordinators = document.getElementsByClassName("js-rect-coordinator");
const cPointCoordinators = document.getElementsByClassName("js-cpoint-coordinator");

let dataGraph = initialGraph;
let focusedRect: {
    prefix: string;
    rectangle: Rectangle
} | null = null;
setGraphParams(dataGraph);

const ctx = canvas.getContext('2d');
if (ctx) draw(ctx);

document.getElementById('redrawButton')!.addEventListener('click', function (event) {
    event.preventDefault();
    if (ctx) draw(ctx);
});

canvas.addEventListener('click', function (event) {
    if (ctx) {
        const element = getRectPrefixByClick(canvas, event, dataGraph);
        if (element) {
            focusedRect = element;
            focusOnRect(ctx, element.rectangle.rect)
        } else {
            focusedRect = null;
        }
        draw(ctx);
    }
});

window.addEventListener('keydown', function (event) {
    const ACTIONS: { [key: string]: string } = {
        ArrowRight: "right",
        ArrowLeft: "left",
        ArrowUp: "down",
        ArrowDown: "up"
    }
    if (focusedRect && event.key in ACTIONS) {
        moveRect(focusedRect.prefix, ACTIONS[event.key]);
        if (ctx) draw(ctx);
    }
});

Array.prototype.forEach.call(rectCoordinators,
    (rectCoordinator) => {
        rectCoordinator.addEventListener('click', function (event: MouseEvent) {
            if (event.target instanceof HTMLButtonElement && event.target.dataset.action && event.target.dataset.rect) {
                moveRect(event.target.dataset.rect, event.target.dataset.action);
                if (ctx) draw(ctx);
            }
        })
    }
);

Array.prototype.forEach.call(cPointCoordinators,
    (rectCoordinator) => {
        rectCoordinator.addEventListener('click', function (event: MouseEvent) {
            if (event.target instanceof HTMLButtonElement && event.target.dataset.action && event.target.dataset.rect) {
                setCPoint(event.target.dataset.rect, getPointOnRectSide(event.target.dataset.rect, event.target.dataset.action));
                if (ctx) draw(ctx);
            }
        })
    }
);


function createGraph(ctx: CanvasRenderingContext2D) {
    printError('');

    try {
        dataGraph = dataConverter(getRectangleParams('rect1'), getRectangleParams('rect2'),
            getcPointParams('rect1'), getcPointParams('rect2'));
        if(focusedRect) {
            focusedRect.rectangle = focusedRect.prefix === 'rect1' ? dataGraph.rectStart : dataGraph.rectEnd;
        }
        drawGraph(ctx, dataGraph);
        if(focusedRect) focusOnRect(ctx, focusedRect.rectangle.rect);

    } catch (error) {
        let message = 'Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.';
        if (error instanceof Error) message = error.message;
        printError(message);
        return;
    }
}

function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(168, 210, 255)";
    createGraph(ctx);
}

function printError(message: string) {
    errorElement.textContent = message;
}