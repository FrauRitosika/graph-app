import Rectangle from "../classes/Rectangle";
import { Point } from "../types";
import { checkSegmentNotIntersectionRect } from "../twoDRepresentation/twoDFunctions";
import settings from '../../graphSettings.json';

function checkMinPath(point1: Point, point2: Point, rects: Rectangle[]) {

    for (let midPoint of [{ ...point1, x: point2.x }, { ...point1, y: point2.y }]) {
        if (checkSegmentNotIntersectionRect(settings.rectLineGap, [point1, midPoint], rects)
            && checkSegmentNotIntersectionRect(settings.rectLineGap, [midPoint, point2], rects)) {
            return {
                result: true,
                point: midPoint
            };
        }
    }

    return {
        result: false
    };
}

export { checkMinPath }