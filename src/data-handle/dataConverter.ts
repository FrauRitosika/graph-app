import Graph from "./classes/Graph";
import Rectangle from "./classes/Rectangle";
import createPath from "./findPathBetweenPoints/createPath";
import { ConnectionPoint, Point, Rect } from "./types";

export default function dataConverter(
    rect1: Rect,
    rect2: Rect,
    cPoint1: ConnectionPoint,
    cPoint2: ConnectionPoint
): Point[] {

    const graphArea = new Graph(new Rectangle(rect1, cPoint1), new Rectangle(rect2, cPoint2));
    return createPath(graphArea.rectStart, graphArea.rectEnd);

};