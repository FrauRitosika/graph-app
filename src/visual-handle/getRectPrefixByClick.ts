import Graph from "../data-handle/classes/Graph";
import { checkSegmentNotIntersectionRect } from "../data-handle/twoDRepresentation/twoDFunctions";
import { getMousePos } from "./getMousePos";

function getRectPrefixByClick(canvas: HTMLCanvasElement, event: MouseEvent, dataGraph: Graph) {
    const currentPoint= getMousePos(canvas,event);
    let number = 1;
    for (let rectangle of [dataGraph.rectStart,dataGraph.rectEnd]) {
        if(!checkSegmentNotIntersectionRect(0,[currentPoint, currentPoint],[rectangle])) {
            return {
                prefix: `rect${number}`,
                rectangle: rectangle
            }
        }
        number ++;
    }

    return null
}

export {getRectPrefixByClick}