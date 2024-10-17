import { checkSegmentIncludesPoint, findPointsOnSide } from "../oneDRepresentation/oneDFunctions";
import { ConnectionPoint, COORD, getCoord, Rect } from "../types";


export default class Rectangle {
    rect: Rect;
    cPoint: ConnectionPoint;
    private _sideX: number[];
    private _sideY: number[];

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
        throw new Error('Точка должна лежать на грани прямоугольника');
    }

    private validateConnectionPoint(side: COORD) {
        if (!checkSegmentIncludesPoint(1 - side ? this.sideY : this.sideX, [this.cPoint.point[getCoord(1 - side)]])) {
            throw new Error('Точка должна лежать на грани прямоугольника');
        }
    }


    private sidePoints(side: COORD) {
        const points = findPointsOnSide(this.rect, side);
        switch (side) {
            case COORD.x: this._sideX = points;
                break;
            case COORD.y: this._sideY = points;
                break;
            default: throw new Error('Не удалось определить грань прямоугольника');
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
            default: throw new Error('Неверный угол');
        };

        throw new Error('Неверный угол');
           
    }

    private get sideX() {
    return this._sideX ?? this.sidePoints(COORD.x);
}

    private get sideY() {
    return this._sideY ?? this.sidePoints(COORD.y);
}

}