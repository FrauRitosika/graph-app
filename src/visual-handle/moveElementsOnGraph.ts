import { changePointByDelta, setCPoint, setRectangle } from "../data-form/changeFormData";
import { getcPointParams, getRectangleParams } from "../data-form/getFormData";
import settings from '../graphSettings.json';

function moveRect(prefix: string, action: string) {
    const delta = {
        x: ['left', 'right'].includes(action) ? (action === 'left' ? 0 - settings.rectGap : settings.rectGap) : 0,
        y: ['up', 'down'].includes(action) ? (action === 'down' ? 0 - settings.rectGap : settings.rectGap) : 0,
    }
    setRectangle(prefix, changePointByDelta(getRectangleParams(prefix).position, delta));
    setCPoint(prefix, {
        point: changePointByDelta(getcPointParams(prefix).point, delta),
        angle: getcPointParams(prefix).angle
    });
}

export { moveRect }