import { changePointByDelta } from "../data-form/changeFormData";
import Rectangle from "../data-handle/classes/Rectangle";
import { Point } from "../data-handle/types";
import settings from '../graphSettings.json';

function moveRectByAction(rect: Rectangle, action: string) {
    const delta = {
        x: ['left', 'right'].includes(action) ? (action === 'left' ? 0 - settings.rectGap : settings.rectGap) : 0,
        y: ['up', 'down'].includes(action) ? (action === 'down' ? 0 - settings.rectGap : settings.rectGap) : 0,
    }
    return moveRect(rect, delta);

}

function moveRect(rect: Rectangle, delta: Point) {
    return {
        newCPoint: { ...rect.cPoint, point: changePointByDelta(rect.cPoint.point, delta) },
        newRectPosition: { ...rect.rect, position: changePointByDelta(rect.rect.position, delta) }
    }
}

export { moveRectByAction, moveRect }