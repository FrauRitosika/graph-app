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

    if (!getSegments(rectangle1.cornerPoints).every(segment => checkSegmentNotIntersectionRect(segment, [rectangle2]))
    || !getSegments(rectangle2.cornerPoints).every(segment => checkSegmentNotIntersectionRect(segment, [rectangle1]))) {
        return false;
    }

    return true;
}

function getSegments(arr: Point[]): Point[][] {
    return arr.map((point, index) =>
        [point, index + 1 < arr.length - 1 ? arr[index + 1]
            : arr[0]]);
}

export { checkSegmentNotIntersectionRect, checkRectNotIntersectionRect }