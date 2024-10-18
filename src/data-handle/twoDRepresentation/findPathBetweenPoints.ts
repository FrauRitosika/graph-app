import Rectangle from "../classes/Rectangle";
import { Point } from "../types";
// import { checkSegmentNotIntersectionRect } from "./twoDFunctions";

function checkMinPath(point1: Point, point2: Point, rects: Rectangle[]) {
    for (let midPoint of [{ ...point1, x: point2.x }, { ...point1, y: point2.y }]) {
        // if (checkSegmentNotIntersectionRect([point1, midPoint], rects) && checkSegmentNotIntersectionRect([midPoint, point2], rects)) {
            return {
                result: true,
                point: midPoint
            };
        // }
    }

    return {
        result: false
    };
}

export { checkMinPath }