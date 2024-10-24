import { setCPoint, setGraphParams } from './data-form/changeFormData';
import { getcPointParams, getPointOnRectSide, getRectangleParams } from './data-form/getFormData';
import { drawGraph, focusOnRect } from './visual-handle/drawGraph';
import { initialGraph } from './visual-handle/initialGraph';
import { moveRect, moveRectByAction } from './visual-handle/moveElementsOnGraph';
import Graph from './data-handle/classes/Graph';
import { ACTIONS, TCanvas } from './visual-handle/types';
import { getRectByClick } from './visual-handle/getRectByClick';
import { getMousePos } from './visual-handle/getMousePos';
import settings from './graphSettings.json';

const errorElement = <HTMLInputElement>document.getElementById('errorMessage');
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const cPointCoordinators = document.getElementsByClassName("js-cpoint-coordinator");

let chart = initialGraph;
setGraphParams(chart);
let focusedRectId: number | null = null;
let errorMessage = '';
const getFocusedRect = (focusedRectId: number, chart: TCanvas['chart']) => chart.rectList.find(r => r.id === focusedRectId)?.rectangle;


const ctx = canvas.getContext('2d');
const draw = () => {
    if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "rgba(168, 210, 255)";
        drawGraph(ctx, chart);
        if (focusedRectId !== null) {
            const focus = getFocusedRect(focusedRectId, chart);
            if (focus) {
                focusOnRect(ctx, focus.rect)
            }
        }
    }
}

draw();

document.getElementById('redrawButton')!.addEventListener('click', function (event) {
    event.preventDefault();
    createGraphByPamas();
});

const showInteractiveElements = () => {
    const findInteractiveElement = (event: MouseEvent) => {
        canvas.style.cursor = getRectByClick(getMousePos(event), chart) ? "grab" : "default";
    }
    canvas.addEventListener('mousemove', findInteractiveElement);
}

showInteractiveElements();


const toggleFocus = () => {

    const initMoveAfterFocus = (event: MouseEvent) => {
        if (!focusedRectId) { return; }

        const rect = getFocusedRect(focusedRectId, chart);
        if (!rect) { return; }

        const shiftX = event.pageX;
        const shiftY = event.pageY;

        const moveByMouse = (event: MouseEvent) => {
            clearError();
            const newChartParams = moveRect(rect, {
                x: event.pageX - shiftX,
                y: event.pageY - shiftY
            });
            if (focusedRectId) chart.changeRectangle(focusedRectId, newChartParams.newCPoint, newChartParams.newRectPosition);
            draw();
            setGraphParams(chart);
            printError();
        }

        canvas.addEventListener('mousemove', moveByMouse);
        canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', moveByMouse));
    }

    const focus = (event: MouseEvent) => {
        const rectId = getRectByClick(getMousePos(event), chart);
        focusedRectId = rectId ?? null;
        draw();
        if (focusedRectId) {
            canvas.addEventListener('mousedown', initMoveAfterFocus);
        }
    }
    canvas.addEventListener('mousedown', focus);
}

toggleFocus();


window.addEventListener('keydown', function (event) {
    move(event);

    function move(event: KeyboardEvent) {
        if (event.key in ACTIONS) {
            if (!focusedRectId) { return; }

            const rect = getFocusedRect(focusedRectId, chart);
            if (rect) {
                clearError();
                const newChartParams = moveRectByAction(rect, ACTIONS[event.key]);
                chart.changeRectangle(focusedRectId, newChartParams.newCPoint, newChartParams.newRectPosition);
                draw();
                setGraphParams(chart);
                printError();
            };
        }
    }
});

Array.prototype.forEach.call(cPointCoordinators,
    (rectCoordinator) => {
        rectCoordinator.addEventListener('click', function (event: MouseEvent) {
            if (event.target instanceof HTMLButtonElement && event.target.dataset.action && event.target.dataset.rect) {
                setCPoint(event.target.dataset.rect, getPointOnRectSide(event.target.dataset.rect, event.target.dataset.action));
                createGraphByPamas();
            }
        })
    }
);


function createGraphByPamas() {
    clearError()

    try {
        chart = new Graph(getRectangleParams('rect1'), getRectangleParams('rect2'),
            getcPointParams('rect1'), getcPointParams('rect2'));
        draw();

    } catch (error) {
        errorMessage = 'Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.';
        if (error instanceof Error) errorMessage = error.message;
    } finally {
        printError();
    }
}

function printError() {
    if (errorMessage) {
        errorElement.textContent = errorMessage;
    } else {
        if (chart.path.length === 0) {
            errorElement.textContent = 'Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.';
        } else if (!chart.notIntersectionRect) {
            errorElement.textContent =
                `Ошибка: Прямоугольники расположены слишком близко друг к другу. Между их гранями должно быть минимальное расстояние в ${settings.rectGap} пикселей. Пожалуйста, отредактируйте положение прямоугольников.`;
        } else {
            errorElement.textContent = '';
        }
    }
}

function clearError() {
    errorMessage = '';
}

