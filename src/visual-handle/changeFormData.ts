import { ConnectionPoint, Point } from "../data-handle/types";

function changePointByDelta(point: Point, delta: Point) {
    return {
        x: point.x + delta.x,
        y: point.y + delta.y
    }
}

function setCPoint(prefix: string, point: ConnectionPoint) {
    (<HTMLInputElement>document.getElementById(`${prefix}cPointX`)).value = point.point.x.toString();
    (<HTMLInputElement>document.getElementById(`${prefix}cPointY`)).value = point.point.y.toString();
    (<HTMLInputElement>document.getElementById(`${prefix}cPointAngle`)).value = point.angle.toString();
}

function setRectangle(prefix: string, point: Point) {
    (<HTMLInputElement>document.getElementById(`${prefix}X`)).value = point.x.toString();
    (<HTMLInputElement>document.getElementById(`${prefix}Y`)).value = point.y.toString();
}


export { changePointByDelta, setCPoint, setRectangle }