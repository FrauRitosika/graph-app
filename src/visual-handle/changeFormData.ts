import { ConnectionPoint, Point } from "../data-handle/types";

function changeRectangleParamsByDelta(prefix: string, delta: Point) {

    (<HTMLInputElement>document.getElementById(`${prefix}X`)).value
        = (parseFloat((<HTMLInputElement>document.getElementById(`${prefix}X`)).value) + delta.x).toString();
    (<HTMLInputElement>document.getElementById(`${prefix}Y`)).value
        = (parseFloat((<HTMLInputElement>document.getElementById(`${prefix}Y`)).value) + delta.y).toString();

}

function setCPoint(prefix: string, point: ConnectionPoint) {
    (<HTMLInputElement>document.getElementById(`${prefix}cPointX`)).value = point.point.x.toString();
    (<HTMLInputElement>document.getElementById(`${prefix}cPointY`)).value = point.point.y.toString();
    (<HTMLInputElement>document.getElementById(`${prefix}cPointAngle`)).value = point.angle.toString();
}


export { changeRectangleParamsByDelta, setCPoint }