import Rectangle from "../Rectangle";
import settings from '../../graphSettings.json' assert {type: 'json'}

const cPoint = {
    point: { x: 4, y: 4 },
    angle: 0
}

const bordarGap = [[-settings.rectGap,-settings.rectGap], [-settings.rectGap,settings.rectGap],[settings.rectGap,settings.rectGap], [-settings.rectGap,settings.rectGap]]

describe('Свойство cornerPointsWithBorder объектa Reatangle должено содержать набор точек, являющихся углами области прямоугольника и минимального расстояния между границами', () => {

    it.each([
        {
            rect: { position: {x: 3, y: 3}, size: { width: 2, height: 2 } }
            , cornerPoints: [[2,3], [2,5], [4,5], [4,3]]
        },

    ])('точка {$x, $y}; точки области: cornerPoints', ({ rect, cornerPoints }) => {
        const rectangle = new Rectangle(rect, cPoint);
        expect(rectangle.cornerPointsWithBorder).toEqual(cornerPoints.map((point, index) => point.map((num,i) => num + bordarGap[index][i])));
    })
});