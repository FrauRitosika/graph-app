import { COORD, getCoord, Rect } from "../types";

function findPointsOnSide(rect: Rect, coord: COORD): [number, number] {
    return [rect.position[getCoord(coord)] - 0.5 * rect.size[coord ? 'height' : 'width']
        , rect.position[getCoord(coord)] + 0.5 * rect.size[coord ? 'height' : 'width']];
}

// грань в 2d
//отрезок перевекает одну из точек 

function checkSegmentIncludesPoint(oneDSegment: number[], points: number[]) {
    oneDSegment = oneDSegment.sort((num: number) => num);
    for (let point of points) {
        if (point > oneDSegment[0] && point < oneDSegment[1]) {
            return true;
        }
    }

    return false;
}

export { findPointsOnSide, checkSegmentIncludesPoint }