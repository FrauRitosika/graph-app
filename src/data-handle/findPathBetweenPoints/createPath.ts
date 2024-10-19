import Rectangle from "../classes/Rectangle";
import { checkMinPath } from "./checkMinPath";
import { checkSegmentNotIntersectionRect } from "../twoDRepresentation/twoDFunctions";
import { COORD, getCoord, Point } from "../types";


export default function createPath(rectStart: Rectangle, rectEnd: Rectangle) {
    const path = [rectStart.cPoint.point, getExtendedLinePoint(rectStart)];
    const preEndPoint = getExtendedLinePoint(rectEnd);
    let isFullPath = false;

    for (let i = 0; i < 10; i++) {

        const isAvailibleMinPath = checkMinPath(path[path.length - 1], preEndPoint, [rectStart, rectEnd]);
        if (isAvailibleMinPath.result && isAvailibleMinPath.point) {

            path.push(isAvailibleMinPath.point);
            isFullPath = true;
            break;
        }

        const point = findPointOnDirection(path, preEndPoint, [rectStart, rectEnd]);
        if (point) path.push(point);
        throw new Error('Не удалось определить промежуточную точку')

    }

    if (isFullPath) {
        return [...path, preEndPoint, rectEnd.cPoint.point];
    } else {
        throw new Error('Не удалось найти путь между точками')
    }

}

function getExtendedLinePoint(rect: Rectangle) {
    switch (rect.cPoint.angle) {
        case 0: return { ...rect.cPoint.point, x: rect.cornerPointsWithBorder[2].x }
        case 180: return { ...rect.cPoint.point, x: rect.cornerPointsWithBorder[0].x }
        case 90: return { ...rect.cPoint.point, y: rect.cornerPointsWithBorder[2].y }
        case 270: return { ...rect.cPoint.point, y: rect.cornerPointsWithBorder[0].y }
        default: throw new Error('Для одного из прямоугольников задан некорректный угол')
    }
}

function findPointOnDirection(path: Point[], target: Point, rects: Rectangle[]) {
    const direct: COORD = path[path.length - 1].x === path[path.length - 2].x ? COORD.x : COORD.y;
    const lastPoint = path[path.length - 1];

    let newCoord;

    if ((lastPoint[getCoord(1 - direct)] - path[path.length - 2][getCoord(1 - direct)])
        * (target[getCoord(1 - direct)] - lastPoint[getCoord(1 - direct)]) > 0) {

        newCoord = lastPoint[getCoord(1 - direct)] - path[path.length - 2][getCoord(1 - direct)] > 0
            ? getUpPointByCoord(lastPoint, direct, rects)
            : getDownPointByCoord(lastPoint, direct, rects);

        if (newCoord.result && newCoord.point
            && checkSegmentNotIntersectionRect([lastPoint, newCoord.point], rects)
        ) {
            return newCoord.point;
        }
    }

    if (lastPoint[getCoord(direct)] < target[getCoord(direct)]) {
        newCoord = getUpPointByCoord(lastPoint, 1 - direct, rects);

        if (newCoord.result && newCoord.point
            && checkSegmentNotIntersectionRect([lastPoint, newCoord.point], rects)
        ) {
            return newCoord.point;
        }
    }

    newCoord = getDownPointByCoord(lastPoint, 1 - direct, rects);

    if (newCoord.result && newCoord.point
        && checkSegmentNotIntersectionRect([lastPoint, newCoord.point], rects)
    ) {
        return newCoord.point;
    }

    throw new Error('Не удалось получить путь между точками');
}


function getUpPointByCoord(point: Point, direct: COORD, rects: Rectangle[]) {
    const upPoints = rects.map(rect => [rect.cornerPointsWithBorder[0][getCoord(1 - direct)], rect.cornerPointsWithBorder[3][getCoord(1 - direct)]])
        .reduce((arr, side) => arr.concat(side), [])
        .filter(coord => coord > point[getCoord(1 - direct)]);
    if (upPoints.length === 0) {
        return { result: false }
    }
    return {
        result: true,
        point: {
            x: direct ? Math.min(...upPoints) : point.x,
            y: direct ? point.y : Math.min(...upPoints),
        }
    }
}

function getDownPointByCoord(point: Point, direct: COORD, rects: Rectangle[]) {
    const downPoints = rects.map(rect => [rect.cornerPointsWithBorder[0][getCoord(1 - direct)], rect.cornerPointsWithBorder[2][getCoord(1 - direct)]])
        .reduce((arr, side) => side.concat(arr), [])
        .filter(coord => coord < point[getCoord(1 - direct)]);
    if (downPoints.length === 0) {
        return { result: false }
    }

    return {
        result: true,
        point: {
            x: direct ? Math.max(...downPoints) : point.x,
            y: direct ? point.y : Math.max(...downPoints),
        }
    }
}

export { getExtendedLinePoint }