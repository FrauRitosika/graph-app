import Rectangle from "./classes/Rectangle";
import { checkMinPath } from "./findPathBetweenPoints/checkMinPath";
import { checkSegmentNotIntersectionRect } from "./twoDRepresentation/twoDFunctions";
import { ConnectionPoint, COORD, getCoord, Point, Rect } from "./types";
import settings from '../graphSettings.json';


const dataConverter = (rect1: Rect, rect2: Rect, cPoint1: ConnectionPoint, cPoint2: ConnectionPoint): Point[] =>  {

    const rectStart = new Rectangle(rect1, cPoint1);
    const rectEnd = new Rectangle(rect2, cPoint2);

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

    }

    if (isFullPath) {
        return [...path, preEndPoint, rectEnd.cPoint.point];
    } else {
        throw new Error('Произошла ошибка. К сожалению, мы не смогли создать изображение по указанным параметрам. Пожалуйста, проверьте введенные данные и попробуйте снова.')
    }

}

function getExtendedLinePoint(rect: Rectangle) {
    switch (rect.cPoint.angle) {
        case 0: return { ...rect.cPoint.point, x: rect.cornerPoints[2].x + settings.rectLineGap }
        case 180: return { ...rect.cPoint.point, x: rect.cornerPoints[0].x - settings.rectLineGap }
        case 90: return { ...rect.cPoint.point, y: rect.cornerPoints[2].y + settings.rectLineGap }
        case 270: return { ...rect.cPoint.point, y: rect.cornerPoints[0].y - settings.rectLineGap }
        default: throw new Error('Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ')
    }
}

function findPointOnDirection(path: Point[], target: Point, rects: Rectangle[]) {
    const direct: COORD = path[path.length - 1].x === path[path.length - 2].x ? COORD.x : COORD.y;
    const lastPoint = path[path.length - 1];

    let newCoord;

    if ((lastPoint[getCoord(1 - direct)] - path[path.length - 2][getCoord(1 - direct)])
        * (target[getCoord(1 - direct)] - lastPoint[getCoord(1 - direct)]) > 0) {

        newCoord = forwardPath();
        if (newCoord.result && newCoord.point
            && checkSegmentNotIntersectionRect(settings.rectLineGap,[lastPoint, newCoord.point], rects)) {
            return newCoord.point;
        }
    }

    if (lastPoint[getCoord(direct)] < target[getCoord(direct)]) {
        newCoord = getUpPointByCoord(lastPoint, 1 - direct, rects);

        if (newCoord.result && newCoord.point && checkSegmentNotIntersectionRect(settings.rectLineGap,[lastPoint, newCoord.point], rects)) {
            return newCoord.point;
        }
    }

    newCoord = getDownPointByCoord(lastPoint, 1 - direct, rects);

    if (newCoord.result && newCoord.point
        && checkSegmentNotIntersectionRect(settings.rectLineGap,[lastPoint, newCoord.point], rects)) {
        return newCoord.point;
    } else {
        newCoord = forwardPath();
        if (newCoord.result && newCoord.point
            && checkSegmentNotIntersectionRect(settings.rectLineGap,[lastPoint, newCoord.point], rects)) {
            return newCoord.point;
        }
    }

    throw new Error('Не удалось получить путь между точками');

    function forwardPath() {
        return lastPoint[getCoord(1 - direct)] - path[path.length - 2][getCoord(1 - direct)] > 0
            ? getUpPointByCoord(lastPoint, direct, rects)
            : getDownPointByCoord(lastPoint, direct, rects);
    }
}


function getUpPointByCoord(point: Point, direct: COORD, rects: Rectangle[]) {
    const upPoints = rects.map(rect => [rect.cornerPoints[0][getCoord(1 - direct)]- settings.rectLineGap, rect.cornerPoints[2][getCoord(1 - direct)] + settings.rectLineGap])
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
    const downPoints = rects.map(rect => [rect.cornerPoints[0][getCoord(1 - direct)]- settings.rectLineGap, rect.cornerPoints[2][getCoord(1 - direct)] + settings.rectLineGap])
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

export default dataConverter;
export { getExtendedLinePoint }