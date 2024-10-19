import Rectangle from "../../classes/Rectangle";
import { checkMinPath } from "../checkMinPath";
import { testCPoint1, testCPoint2, testCPoint3, testCPoint4, testRect1, testRect2, testRect3, testRect4, testRect7, testCPoint7, testCPoint6, testRect6 } from "../../twoDRepresentation/test/dataSet";

const rectangle1 = new Rectangle(testRect1, testCPoint1);
const rectangle2 = new Rectangle(testRect2, testCPoint2);
const rectangle3 = new Rectangle(testRect3, testCPoint3);
const rectangle4 = new Rectangle(testRect4, testCPoint4);

const pointStart = { x: 30, y: 10 };
const pointEnd = { x: 70, y: 60 };

describe('Функция проверяет можно ли соединить две точка двумя отрезками, не задев прямоугольники', () => {

    it.each([
        { rect1: rectangle1, rect2: rectangle2, result: true },
        { rect1: rectangle3, rect2: rectangle4, result: false },
        { rect1: rectangle1, rect2: rectangle3, result: false },
        { rect1: rectangle2, rect2: rectangle4, result: true },
        { rect1: rectangle4, rect2: rectangle1, result: true },
    ])('', ({ rect1, rect2, result }) => {

        expect(checkMinPath(pointStart, pointEnd, [rect1, rect2]).result).toEqual(result);
    })
});

const rectangle5 = new Rectangle(testRect6, testCPoint6);
const rectangle6 = new Rectangle(testRect7, testCPoint7);

const pointStart1 = { x: 290, y: 140 };
const pointEnd1 = { x: 90, y: 200 };

describe('Функция проверяет можно ли соединить две точка двумя отрезками, не задев прямоугольники', () => {

    it.each([
        { rect1: rectangle5, rect2: rectangle6, result: true },
    ])('', ({ rect1, rect2, result }) => {

        expect(checkMinPath(pointStart1, pointEnd1, [rect1, rect2]).result).toEqual(result);
    })
});