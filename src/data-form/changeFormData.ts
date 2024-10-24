import Graph from "../data-handle/classes/Graph";
import { ConnectionPoint, Point, Size} from "../data-handle/types";

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

function setRectangle(prefix: string, point: Point, size?: Size) {
    (<HTMLInputElement>document.getElementById(`${prefix}X`)).value = point.x.toString();
    (<HTMLInputElement>document.getElementById(`${prefix}Y`)).value = point.y.toString();
    if (size) {
        (<HTMLInputElement>document.getElementById(`${prefix}Width`)).value = size.width.toString();
        (<HTMLInputElement>document.getElementById(`${prefix}Height`)).value = size.height.toString();
    }
}

function setGraphParams(dataGraph: Graph) {
    setRectangle('rect1', dataGraph.rectList[0].rectangle.rect.position, dataGraph.rectList[0].rectangle.rect.size);
    setCPoint('rect1', dataGraph.rectList[0].rectangle.cPoint);
    setRectangle('rect2', dataGraph.rectList[1].rectangle.rect.position, dataGraph.rectList[1].rectangle.rect.size);
    setCPoint('rect2', dataGraph.rectList[1].rectangle.cPoint);
}


export { changePointByDelta, setCPoint, setRectangle , setGraphParams}