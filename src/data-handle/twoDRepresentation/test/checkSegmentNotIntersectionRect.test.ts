import Rectangle from "../../classes/Rectangle";
import { checkSegmentNotIntersectionRect } from '../twoDFunctions';
import {testRect1, testRect2, testCPoint1, testCPoint2, testRect6, testCPoint6, testCPoint7, testRect7  } from './dataSet';

const rectangle1 = new Rectangle(testRect1, testCPoint1);
const rectangle2 = new Rectangle(testRect2, testCPoint2);

describe('Функция проверяет пеоресекает ли отрезок прямоугольник', () => {

    it.each([
        { segment: { point1: { x: 0, y: 3 }, point2: { x: 2, y: 3 } }, result: false },
        { segment: { point1: { x: 0, y: 3 }, point2: { x: 0, y: 0 } }, result: true },
        { segment: { point1: { x: 4, y: 4 }, point2: { x: 9, y: 4 } }, result: false },
        { segment: { point1: { x: 5, y: 4.5 }, point2: { x: 6, y: 4.5 } }, result: false },
        { segment: { point1: { x: 1.5, y: 1.1 }, point2: { x: 1.5, y: 2.5 } }, result: false },
        { segment: { point1: { x: 1, y: 3 }, point2: { x: 2, y: 3 } }, result: false },
        { segment: { point1: { x: 8, y: 5 }, point2: { x: 8, y: 3 } }, result: false }

    ])('отрезок {x: $segment.point1.x, y:$segment.point1.y} - {x: $segment.point2.x, y:$segment.point2.y}', ({ segment, result }) => {
        expect(checkSegmentNotIntersectionRect([segment.point1, segment.point2], [rectangle1, rectangle2])).toEqual(result);
    })
});

const rectangle3 = new Rectangle(testRect6, testCPoint6); 
const rectangle4 = new Rectangle(testRect7, testCPoint7); 

describe('Функция проверяет пеоресекает ли отрезок прямоугольник', () => {

    it.each([
        { segment: { point1: { x: 290, y: 140 }, point2: { x: 290, y: 200 } }, result: true },
        { segment: { point1: { x: 90, y: 200 }, point2: { x: 290, y: 200 } }, result: false },
        { segment: { point1: { x: 90, y: 200 }, point2: { x: 90, y: 140 } }, result: true },
        { segment: { point1: { x: 90, y: 140 }, point2: { x: 290, y: 140 } }, result: true },

    ])('отрезок {x: $segment.point1.x, y:$segment.point1.y} - {x: $segment.point2.x, y:$segment.point2.y}', ({ segment, result }) => {
        expect(checkSegmentNotIntersectionRect([segment.point1, segment.point2], [rectangle3, rectangle4])).toEqual(result);
    })
});
