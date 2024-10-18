import Rectangle from "../Rectangle";
import settings from "../../graphSettings.json";

const cPoint = {
    point: { x: 4, y: 4 },
    angle: 0
}

const bordarGap = [{ x: -settings.rectGap, y: -settings.rectGap }, { x: -settings.rectGap, y: settings.rectGap }, { x: settings.rectGap, y: settings.rectGap }, { x: settings.rectGap, y: -settings.rectGap }]

describe('Свойство cornerPointsWithBorder объектa Reatangle должено содержать набор точек, являющихся углами области прямоугольника и минимального расстояния между границами', () => {

    it.each([
        {
            rect: { position: { x: 3, y: 4 }, size: { width: 2, height: 2 } }
            , cornerPoints: [{ x: 2, y: 3 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 4, y: 3 }]
        },
        {
            rect: { position: { x: 3, y: 4 }, size: { width: 2, height: 4 } }
            , cornerPoints: [{ x: 2, y: 2 }, { x: 2, y: 6 }, { x: 4, y: 6 }, { x: 4, y: 2 }]
        },
        {
            rect: { position: { x: 3.5, y: 4 }, size: { width: 1, height: 4 } }
            , cornerPoints: [{ x: 3, y: 2 }, { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 4, y: 2 }]
        },

    ])('прямоугольник с центром {$rect.position.x, $rect.position.y};', ({ rect, cornerPoints }) => {
        const rectangle = new Rectangle(rect, cPoint);
        expect(rectangle.cornerPointsWithBorder).toEqual(cornerPoints.map((point, index) => {
            return {
                x: point.x + bordarGap[index].x,
                y: point.y + bordarGap[index].y
            }
        }));
    })
});