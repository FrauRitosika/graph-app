import { checkRectNotIntersectionRect } from "../twoDRepresentation/twoDFunctions";
import Rectangle from "./Rectangle";
import settings from '../../graphSettings.json';
import dataConverter from "../dataConverter";
import { ConnectionPoint, Point, Rect } from "../types";

export default class Graph {
    rectStart: Rectangle;
    rectEnd: Rectangle;
    path: Point[];
    
    constructor(rect1: Rect, rect2: Rect, cPoint1: ConnectionPoint, cPoint2: ConnectionPoint) {
        this.rectStart = new Rectangle(rect1, cPoint1);
        this.rectEnd = new Rectangle(rect2, cPoint2);;
        this.validateIntersectionRect();
        this.path = dataConverter(rect1, rect2, cPoint1, cPoint2);
    }

    private validateIntersectionRect() {
        if(!checkRectNotIntersectionRect(this.rectStart, this.rectEnd)) throw new Error(`Ошибка: Прямоугольники расположены слишком близко друг к другу. Между их гранями должно быть минимальное расстояние в ${settings.rectGap} пикселей. Пожалуйста, отредактируйте положение прямоугольников.`);
    }
 
}
