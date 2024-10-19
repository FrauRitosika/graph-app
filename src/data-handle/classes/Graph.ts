import createPath from "../findPathBetweenPoints/createPath";
import { checkRectNotIntersectionRect } from "../twoDRepresentation/twoDFunctions";
import { Point } from "../types";
import Rectangle from "./Rectangle";

export default class Graph {
    rectStart: Rectangle;
    rectEnd: Rectangle;
    path: Point[];
    
    constructor(rect1: Rectangle, rect2: Rectangle) {
        this.rectStart = rect1;
        this.rectEnd = rect2;
        this.validateIntersectionRect();

        this.path = createPath(this.rectStart, this.rectEnd);
    }

    private validateIntersectionRect() {
        if(!checkRectNotIntersectionRect(this.rectStart, this.rectEnd)) throw new Error('Прямоугольники слишком близко');
    }
 
}
