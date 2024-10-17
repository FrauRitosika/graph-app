import Rectangle from "../classes/Rectangle";
import { checkSegmentNotIncludesPoint, checkSegmentNotIntersectionSegment } from "../oneDRepresentation/oneDFunctions";
import { COORD, getCoord, Point } from "../types";

function checkSegmentNotIntersectionRect(points: Point[], rects: Rectangle[]) {
    const coordDirect = points[0].x === points[1].x ? COORD.x : COORD.y;

    for (let rect of rects) {
        if (checkSegmentNotIncludesPoint(coordDirect ? rect.sideY : rect.sideX, [points[0][getCoord(coordDirect)]])
            && checkSegmentNotIntersectionSegment([points[0][getCoord(1 - coordDirect)], points[1][getCoord(1 - coordDirect)]]
                , 1 - coordDirect ? rect.sideY : rect.sideX)) {
            return true;
        }
    }

    return false;
}

export { checkSegmentNotIntersectionRect }