import { checkRectNotIntersectionRect } from "../twoDRepresentation/twoDFunctions";
import Rectangle from "./Rectangle";

export default class Graph {
    rectStart: Rectangle;
    rectEnd: Rectangle;
    
    constructor(rect1: Rectangle, rect2: Rectangle) {
        this.rectStart = rect1;
        this.rectEnd = rect2;
        this.validateIntersectionRect();

    }

    private validateIntersectionRect() {
        if(!checkRectNotIntersectionRect(this.rectStart, this.rectEnd)) throw new Error('Прямоугольники слишком близко');
    }
 
}
