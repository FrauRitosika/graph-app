import Graph from "./classes/Graph";
import Rectangle from "./classes/Rectangle";
import { ConnectionPoint, Rect } from "./types";

export default function dataConverter(
    rect1: Rect,
    rect2: Rect,
    cPoint1: ConnectionPoint,
    cPoint2: ConnectionPoint
): Graph {

    return new Graph(new Rectangle(rect1, cPoint1), new Rectangle(rect2, cPoint2));

};