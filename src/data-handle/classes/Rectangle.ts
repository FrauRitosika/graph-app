import { checkSegmentNotIncludesPoint, findPointsOnSide } from "../oneDRepresentation/oneDFunctions";
import { ConnectionPoint, COORD, getCoord, Point, Rect } from "../types";
import settings from '../graphSettings.json';

interface IRectangle {
    rect: Rect;
    cPoint: ConnectionPoint;
    sideX: [number, number];
    sideY: [number, number];
}

export default class Rectangle implements IRectangle {
    rect: Rect;
    cPoint: ConnectionPoint;
    private _sideX: [number, number];
    private _sideY: [number, number];

    constructor(rect: Rect, cPoint: ConnectionPoint) {
        this.rect = rect;
        this.cPoint = cPoint;
        this._sideX = this.sidePoints(COORD.x);
        this._sideY = this.sidePoints(COORD.y);

        const side = this.getSide();
        this.validateConnectionPoint(side);
        this.validateAngle(side);

    }

    private getSide(): COORD {
        const sideXY = [this.sideX, this.sideY];
        for (let i = 0; i < 2; i++) {
            if (sideXY[i].includes(this.cPoint.point[getCoord(i)])) {
                return i;
            }
        }
        throw new Error('Ошибка: Точка соединения должна находиться на грани прямоугольника.');
    }

    private validateConnectionPoint(side: COORD) {
        if (checkSegmentNotIncludesPoint(1 - side ? this.sideY : this.sideX, [this.cPoint.point[getCoord(1 - side)]])) {
            throw new Error('Ошибка: Точка соединения должна находиться на грани прямоугольника.');
        }
    }


    private sidePoints(side: COORD): [number, number] {
        const points = findPointsOnSide(this.rect, side);
        switch (side) {
            case COORD.x: this._sideX = points;
                break;
            case COORD.y: this._sideY = points;
                break;
            default: throw new Error('Ошибка: Не удалось определить грань прямоугольника');
        }

        return points;
    }

    private validateAngle(side: COORD) {
        switch (side) {
            case COORD.x:
                if ((this.cPoint.point[getCoord(side)] === Math.max(...this._sideX) && this.cPoint.angle === 0)
                    || (this.cPoint.point[getCoord(side)] === Math.min(...this._sideX) && this.cPoint.angle === 180)) {
                    return;
                } else { break; }
            case COORD.y:
                if ((this.cPoint.point[getCoord(side)] === Math.max(...this._sideY) && this.cPoint.angle === 90)
                    || (this.cPoint.point[getCoord(side)] === Math.min(...this._sideY) && this.cPoint.angle === 270)) {
                    return;
                } else { break; }
            default: throw new Error('Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ');
        };

        throw new Error('Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. ');

    }



    public get cornerPoints(): Point[] {
        return [{ x: this.sideX[0], y: this.sideY[0] },
        { x: this.sideX[0], y: this.sideY[1] },
        { x: this.sideX[1], y: this.sideY[1] },
        { x: this.sideX[1], y: this.sideY[0] }];
    }

    public get cornerPointsWithBorder(): Point[] {
        const bordarGap = [{ x: -settings.rectGap, y: -settings.rectGap }, { x: -settings.rectGap, y: settings.rectGap }, { x: settings.rectGap, y: settings.rectGap }, { x: settings.rectGap, y: -settings.rectGap }]

        return this.cornerPoints.map((point, index) => {
            return {
                x: point.x + bordarGap[index].x,
                y: point.y + bordarGap[index].y
            }
        })
    }

    public get sideX(): [number, number] {
        return this._sideX ?? this.sidePoints(COORD.x);
    }

    public get sideY() {
        return this._sideY ?? this.sidePoints(COORD.y);
    }

}