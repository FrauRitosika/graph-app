import { Rect } from "../../types";
import createPath from "../../dataConverter";

const testRect1: Rect = {
    position: { x: 350, y: 300 },
    size: { width: 100, height: 200 }
}

const testRect2: Rect = {
    position: { x: 150, y: 200 },
    size: { width: 100, height: 100 }
}

describe('Функция должна возвращать список точек, по которым можно построить ломанную линию от точки 1 до точки 2', () => {

    it.each([
        {
            cPoint1: {
                point: { x: 300, y: 300 },
                angle: 180
            },
            cPoint2: {
                point: { x: 100, y: 200 },
                angle: 180
            }
        },
        {
            cPoint1: {
                point: { x: 400, y: 300 },
                angle: 0
            },
            cPoint2: {
                point: { x: 100, y: 200 },
                angle: 180
            }
        },
        {
            cPoint1: {
                point: { x: 350, y: 200 },
                angle: 270
            },
            cPoint2: {
                point: { x: 100, y: 200 },
                angle: 180
            }
        },
        {
            cPoint1: {
                point: { x: 400, y: 205 },
                angle: 0
            },
            cPoint2: {
                point: { x: 100, y: 205 },
                angle: 180
            }
        },
        {
            cPoint1: {
                point: { x: 350, y: 200 },
                angle: 270
            },
            cPoint2: {
                point: { x: 150, y: 250 },
                angle: 90
            }
        },
        {
            cPoint1: {
                point: { x: 400, y: 300 },
                angle: 0
            },
            cPoint2: {
                point: { x: 150, y: 250 },
                angle: 90
            }
        },

    ])('должны быть соединены точки {x: $cPoint1.point.x , y: $cPoint1.point.y} и {x: $cPoint2.point.x , y: $cPoint2.point.y}'
        , ({ cPoint1, cPoint2 }) => {

            const path = createPath(testRect1, testRect2, cPoint1, cPoint2);

            expect(path[path.length - 1]).toEqual(cPoint2.point);

        })
});