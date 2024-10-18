import Rectangle from "../classes/Rectangle";
import { checkSegmentNotIncludesPoint, checkSegmentNotIntersectionSegment } from "../oneDRepresentation/oneDFunctions";
import { COORD, getCoord, Point } from "../types";

function checkSegmentNotIntersectionRect(points: Point[], rects: Rectangle[]) {
    const coordDirect = points[0].x === points[1].x ? COORD.x : COORD.y;

    for (let rect of rects) {
        const borderY = [rect.cornerPointsWithBorder[0].y, rect.cornerPointsWithBorder[1].y];
        const borderX = [rect.cornerPointsWithBorder[0].x, rect.cornerPointsWithBorder[3].x];

        if (!checkSegmentNotIncludesPoint(coordDirect ? borderY : borderX, [points[0][getCoord(coordDirect)]])
            && !checkSegmentNotIntersectionSegment([points[0][getCoord(1 - coordDirect)], points[1][getCoord(1 - coordDirect)]]
                , 1 - coordDirect ? borderY : borderX)) {
            return false;
        }
    }

    return true;
}

function checkRectNotIntersectionRect(rectangle1: Rectangle, rectangle2: Rectangle) {

    const sideSegments1 = rectangle1.cornerPointsWithBorder.map((point, index) =>
        [point, index + 1 < rectangle1.cornerPointsWithBorder.length ? rectangle1.cornerPointsWithBorder[index + 1]
            : rectangle1.cornerPointsWithBorder[0]]);

    if (!sideSegments1.every(segment => checkSegmentNotIntersectionRect(segment, [rectangle2]))) {
        return false;
    }

    const sideSegments2 = rectangle2.cornerPointsWithBorder.map((point, index) =>
        [point, index + 1 < rectangle2.cornerPointsWithBorder.length ? rectangle2.cornerPointsWithBorder[index + 1]
            : rectangle2.cornerPointsWithBorder[0]]);

    if (!sideSegments2.every(segment => checkSegmentNotIntersectionRect(segment, [rectangle1]))) {
        return false;
    }

    return true;
}

export { checkSegmentNotIntersectionRect, checkRectNotIntersectionRect }