import Rectangle from "../classes/Rectangle";
import { checkSegmentNotIncludesPoint, checkSegmentNotIntersectionSegment } from "../oneDRepresentation/oneDFunctions";
import { COORD, getCoord, Point } from "../types";
import settings from '../../graphSettings.json';

function checkSegmentNotIntersectionRect(gap: number, points: Point[], rects: Rectangle[]) {
    const coordDirect = points[0].x === points[1].x ? COORD.x : COORD.y;

    for (let rect of rects) {
        const borderY = [rect.cornerPoints[0].y - gap, rect.cornerPoints[1].y + gap]
        const borderX = [rect.cornerPoints[0].x - gap, rect.cornerPoints[3].x + gap];


        if (!checkSegmentNotIncludesPoint(coordDirect ? borderY : borderX, [points[0][getCoord(coordDirect)]])
            && !checkSegmentNotIntersectionSegment([points[0][getCoord(1 - coordDirect)], points[1][getCoord(1 - coordDirect)]]
                , 1 - coordDirect ? borderY : borderX)) {
            return false;
        }
    }

    return true;
}

function checkRectNotIntersectionRect(rectangle1: Rectangle, rectangle2: Rectangle) {

    if (!getSegments(rectangle1.cornerPoints).every(segment => checkSegmentNotIntersectionRect(settings.rectGap, segment, [rectangle2]))
        || !getSegments(rectangle2.cornerPoints).every(segment => checkSegmentNotIntersectionRect(settings.rectGap, segment, [rectangle1]))) {
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