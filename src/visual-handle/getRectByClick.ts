import Graph from "../data-handle/classes/Graph";
import { checkSegmentNotIntersectionRect } from "../data-handle/twoDRepresentation/twoDFunctions";
import { Point } from "../data-handle/types";

function getRectByClick(currentPoint: Point, dataGraph: Graph) {
    for (const r of dataGraph.rectList) {
        if (!checkSegmentNotIntersectionRect(0, [currentPoint, currentPoint], [r.rectangle])) {
            return r.id;
        }
    }
    return null;
}

export { getRectByClick }