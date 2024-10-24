import { checkRectNotIntersectionRect } from "../twoDRepresentation/twoDFunctions";
import Rectangle from "./Rectangle";
import dataConverter from "../dataConverter";
import { ConnectionPoint, Point, Rect } from "../types";

export default class Graph {
    rectList: Array<{
        id: number,
        rectangle: Rectangle
    }>
    path: Point[];

    constructor(rect1: Rect, rect2: Rect, cPoint1: ConnectionPoint, cPoint2: ConnectionPoint) {
        this.rectList = [new Rectangle(rect1, cPoint1), new Rectangle(rect2, cPoint2)].map((rect, index) => {
            return {
                id: index + 1,
                rectangle: rect,
                focused: false
            }
        });
        this.path = [];
        this.resetPath();
    }

    private resetPath() {
        this.path = dataConverter(this.rectList[0].rectangle.rect, this.rectList[1].rectangle.rect, this.rectList[0].rectangle.cPoint, this.rectList[1].rectangle.cPoint);
    }

    public changeRectangle(id: number, cpoint?: ConnectionPoint, rect?: Rect) {
        this.rectList[id - 1].rectangle = new Rectangle(rect ?? this.rectList[id - 1].rectangle.rect, cpoint ?? this.rectList[id - 1].rectangle.cPoint);
        this.resetPath();
        return this;
    }

    public get notIntersectionRect() {
        return checkRectNotIntersectionRect(this.rectList[0].rectangle, this.rectList[1].rectangle);
    }

}
