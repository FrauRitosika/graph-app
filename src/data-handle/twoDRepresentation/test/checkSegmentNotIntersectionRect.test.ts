import Rectangle from "../../classes/Rectangle";
import { Rect } from "../../types";
import { checkSegmentNotIntersectionRect } from '../twoDFunctions'

const rect1: Rect = {
    position: { x: 6, y: 4 },
    size: { width: 4, height: 2 }
}

const cPoint1 = {
    point: { x: 4, y: 4 },
    angle: 180
}

const rect2: Rect = {
    position: { x: 1.5, y: 2 },
    size: { width: 1, height: 2 }
}

const cPoint2 = {
    point: { x: 2, y: 2 },
    angle: 0
}

const rectangle1 = new Rectangle(rect1, cPoint1);
const rectangle2 = new Rectangle(rect2, cPoint2);

describe('Функция проверяе пеоресекает ли отрезок прямоугольник', () => {

    it.each([
        { segment: [ { x: 0, y: 3 }, { x: 2, y: 3 }] , result: true },
        { segment: [ { x: 0, y: 3 }, { x: 0, y: 0 }] , result: true },
        { segment: [ { x: 4, y: 2 }, { x: 9, y: 2 }] , result: true },
        { segment: [ { x: 4, y: 4 }, { x: 9, y: 4 }] , result: false },
        // { segment: [ { x: 5, y: 4.5 }, { x: 6, y: 4.5 }] , result: false },
        // { segment: [ { x: 1.5, y: 1.1 }, { x: 1.5, y: 2.5 }] , result: false },

    ])('отрезок $segment', ({ segment, result }) => {
        expect(checkSegmentNotIntersectionRect(segment, [rectangle1, rectangle2])).toEqual(result);
    })
});