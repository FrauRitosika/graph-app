import { COORD, getCoord, Rect } from "../types";

function findPointsOnSide(rect: Rect, coord: COORD): [number, number] {
    return [rect.position[getCoord(coord)] - 0.5 * rect.size[coord ? 'height' : 'width']
        , rect.position[getCoord(coord)] + 0.5 * rect.size[coord ? 'height' : 'width']];
}

function checkSegmentNotIncludesPoint(oneDSegment: number[], points: number[]) {
    oneDSegment = oneDSegment.sort((num: number) => num);
    for (let point of points) {
        if (point > oneDSegment[0] && point < oneDSegment[1]) {
            return false;
        }
    }

    return true;
}

function checkSegmentNotIntersectionSegment(oneDSegment1: number[], oneDSegment2: number[]) {
    oneDSegment2 = oneDSegment2.sort((num: number) => num);

    if(oneDSegment1.every(num => num <= oneDSegment2[0]) || oneDSegment1.every(num => num >= oneDSegment2[1])) {
        return true;
    }
    return false;
}

export { findPointsOnSide, checkSegmentNotIncludesPoint, checkSegmentNotIntersectionSegment }