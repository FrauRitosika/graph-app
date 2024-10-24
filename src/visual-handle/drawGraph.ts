import Graph from "../data-handle/classes/Graph";
import { Rect } from "../data-handle/types";

function drawGraph(ctx: CanvasRenderingContext2D, data: Graph) {

    if (ctx) {
        [data.rectList[0].rectangle, data.rectList[1].rectangle].forEach(data => {
            ctx.fillRect(data.rect.position.x - 0.5 * data.rect.size.width, data.rect.position.y - 0.5 * data.rect.size.height
                , data.rect.size.width, data.rect.size.height);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.strokeRect(data.rect.position.x - 0.5 * data.rect.size.width
                , data.rect.position.y - 0.5 * data.rect.size.height, data.rect.size.width, data.rect.size.height);
        });

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(data.path[0].x, data.path[0].y);
        data.path.forEach((point, index) => {
            if (index) ctx.lineTo(point.x, point.y);
        })
        ctx.stroke();

    }

}

function focusOnRect(ctx: CanvasRenderingContext2D, rect: Rect) {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.strokeRect(rect.position.x - 0.5 * rect.size.width, rect.position.y - 0.5 * rect.size.height, rect.size.width, rect.size.height);
}

export { drawGraph, focusOnRect }