import Rectangle from "../../classes/Rectangle";
import { checkRectNotIntersectionRect } from '../twoDFunctions'
import { testCPoint1, testCPoint2, testCPoint3, testCPoint4, testCPoint5, testRect1, testRect2, testRect3, testRect4, testRect5 } from "./dataSet";

const rectangle1 = new Rectangle(testRect1, testCPoint1);
const rectangle2 = new Rectangle(testRect2, testCPoint2);
const rectangle3 = new Rectangle(testRect3, testCPoint3);
const rectangle4 = new Rectangle(testRect4, testCPoint4);
const rectangle5 = new Rectangle(testRect5, testCPoint5);

describe('Функция проверяет, что два прямоугольника не пересекаются', () => {

    it.each([
        { rect1: rectangle1, rect2: rectangle2, result: true },
        { rect1: rectangle3, rect2: rectangle5, result: false },
        { rect1: rectangle1, rect2: rectangle3, result: false },
        { rect1: rectangle2, rect2: rectangle4, result: true },
        { rect1: rectangle1, rect2: rectangle4, result: false },
        { rect1: rectangle4, rect2: rectangle1, result: false },
        { rect1: rectangle4, rect2: rectangle4, result: false },
    ])('', ({ rect1, rect2, result }) => {
        expect(checkRectNotIntersectionRect(rect1, rect2)).toEqual(result);
    })
});