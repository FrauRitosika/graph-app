import Rectangle from "../../classes/Rectangle";
import { checkMinPath } from "../findPathBetweenPoints";
import { testCPoint1, testCPoint2, testCPoint3, testCPoint4, testRect1, testRect2, testRect3, testRect4 } from "./dataSet";

const rectangle1 = new Rectangle(testRect1, testCPoint1);
const rectangle2 = new Rectangle(testRect2, testCPoint2);
const rectangle3 = new Rectangle(testRect3, testCPoint3);
const rectangle4 = new Rectangle(testRect4, testCPoint4);

const pointStart = { x: 3, y: 1 };
const pointEnd = { x: 7, y: 6 };

describe('Функция проверяет можно ли соединить две точка двумя отрезками, не задев прямоугольники', () => {

    it.each([
        { rect1: rectangle1, rect2: rectangle2, result: true },
        { rect1: rectangle3, rect2: rectangle4, result: true },
        { rect1: rectangle1, rect2: rectangle3, result: false },
        { rect1: rectangle2, rect2: rectangle4, result: true },
        { rect1: rectangle4, rect2: rectangle1, result: true },
    ])('', ({ rect1, rect2, result }) => {

        expect(checkMinPath(pointStart, pointEnd, [rect1, rect2]).result).toEqual(result);
    })
});