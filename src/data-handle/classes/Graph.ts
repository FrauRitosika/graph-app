import { checkRectNotIntersectionRect } from "../twoDRepresentation/twoDFunctions";
import Rectangle from "./Rectangle";
import settings from '../../graphSettings.json';
import createPath from "../findPathBetweenPoints/createPath";
import { Point } from "../types";

export default class Graph {
    rectStart: Rectangle;
    rectEnd: Rectangle;
    path: Point[];
    
    constructor(rect1: Rectangle, rect2: Rectangle) {
        this.rectStart = rect1;
        this.rectEnd = rect2;
        this.validateIntersectionRect();
        this.path = createPath(rect1, rect2);
    }

    private validateIntersectionRect() {
        if(!checkRectNotIntersectionRect(this.rectStart, this.rectEnd)) throw new Error(`Ошибка: Прямоугольники расположены слишком близко друг к другу. Между их гранями должно быть минимальное расстояние в ${settings.rectGap} пикселей. Пожалуйста, отредактируйте положение прямоугольников.`);
    }
 
}
