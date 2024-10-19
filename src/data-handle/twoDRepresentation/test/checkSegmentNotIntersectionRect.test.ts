import Rectangle from "../../classes/Rectangle";
import { checkSegmentNotIntersectionRect } from '../twoDFunctions';
import {testRect1, testRect2, testCPoint1, testCPoint2} from './dataSet';

const rectangle1 = new Rectangle(testRect1, testCPoint1);
const rectangle2 = new Rectangle(testRect2, testCPoint2);

describe('Функция проверяе пеоресекает ли отрезок прямоугольник', () => {

    it.each([
        { segment: { point1: { x: 0, y: 3 }, point2: { x: 2, y: 3 } }, result: false },
        { segment: { point1: { x: 0, y: 3 }, point2: { x: 0, y: 0 } }, result: true },
        { segment: { point1: { x: 4, y: 2 }, point2: { x: 9, y: 2 } }, result: true },
        { segment: { point1: { x: 4, y: 4 }, point2: { x: 9, y: 4 } }, result: false },
        { segment: { point1: { x: 5, y: 4.5 }, point2: { x: 6, y: 4.5 } }, result: false },
        { segment: { point1: { x: 1.5, y: 1.1 }, point2: { x: 1.5, y: 2.5 } }, result: false },
        { segment: { point1: { x: 1, y: 3 }, point2: { x: 2, y: 3 } }, result: false },
        { segment: { point1: { x: 8, y: 5 }, point2: { x: 8, y: 3 } }, result: false }

    ])('отрезок {x: $segment.point1.x, y:$segment.point1.y} - {x: $segment.point2.x, y:$segment.point2.y}', ({ segment, result }) => {
        expect(checkSegmentNotIntersectionRect([segment.point1, segment.point2], [rectangle1, rectangle2])).toEqual(result);
    })
});