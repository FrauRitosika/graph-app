import Rectangle from "../../classes/Rectangle";
import { Rect } from "../../types";
import { getExtendedLinePoint } from '../../dataConverter';
import settings from '../../../graphSettings.json';

const rectangle: Rect = {
    position: {
        x: 1,
        y: 1
    },
    size: {
        width: 1,
        height: 2
    }
}

describe('Функция getExtendedLinePoint находит точку на конце отрезка минимальной длины между точкой коннекта и внешней областью', () => {

    it.each([
        {
            cPoint: { point: { x: 1.5, y: 1 }, angle: 0 },
            resultPoint: { x: 1.5 + settings.rectLineGap, y: 1 }
        },
        {
            cPoint: { point: { x: 1.4, y: 2 }, angle: 90 },
            resultPoint: { x: 1.4, y: 2 + settings.rectLineGap }
        },
        {
            cPoint: { point: { x: 0.6, y: 2 }, angle: 90 },
            resultPoint: { x: 0.6, y: 2 + settings.rectLineGap }
        },
        {
            cPoint: { point: { x: 0.5, y: 0.4 }, angle: 180 },
            resultPoint: { x: 0.5 - settings.rectLineGap, y: 0.4 }
        },
        {
            cPoint: { point: { x: 0.5, y: 0.1 }, angle: 180 },
            resultPoint: { x: 0.5 - settings.rectLineGap, y: 0.1 }
        },
        {
            cPoint: { point: { x: 0.8, y: 0 }, angle: 270 },
            resultPoint: { x: 0.8, y: 0 - settings.rectLineGap }
        },

    ])('', ({ cPoint, resultPoint }) => {
        const rect = new Rectangle(rectangle, cPoint);

        expect(getExtendedLinePoint(rect)).toEqual(resultPoint);
    })
});