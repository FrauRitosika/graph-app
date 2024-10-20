import { ConnectionPoint, Rect } from "../data-handle/types";

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

function getPointOnRectSide(rectPrefix: string, side: string) {
    const rect = getRectangleParams(rectPrefix);

    if (rect.position.x > 0 && rect.position.y > 0 && rect.size.height > 0 && rect.size.width > 0) {
        switch (side) {
            case 'right': return {
                point: {
                    x: rect.position.x + 0.5 * rect.size.width,
                    y: rect.position.y
                },
                angle: 0,
            }
            case 'left': return {
                point: {
                    x: rect.position.x - 0.5 * rect.size.width,
                    y: rect.position.y
                },
                angle: 180,
            }
            case 'up': return {
                point: {
                    x: rect.position.x,
                    y: rect.position.y + 0.5 * rect.size.height
                },
                angle: 90,
            }
            default: return {
                point: {
                    x: rect.position.x,
                    y: rect.position.y - 0.5 * rect.size.height
                },
                angle: 270,
            }
        }
    }

    throw new Error('Ошибка: все параметры прямоугольника должны быть заданы положительными числами');

}

export { getRectangleParams, getcPointParams, getPointOnRectSide }