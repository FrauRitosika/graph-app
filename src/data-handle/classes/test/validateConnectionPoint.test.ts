import { Rect } from "../../types";
import Rectangle from "../Rectangle";

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

describe('Объект Reatangle должен иметь точку коннекта, которая лежит на его грани', () => {

    it.each([
        { x: 1.5, y: 1, angle: 0 },
        { x: 1.4, y: 2, angle: 90 },
        { x: 0.6, y: 2, angle: 90 },
        { x: 0.5, y: 0.4, angle: 180 },
        { x: 0.5, y: 0.1, angle: 180 },
        { x: 1, y: 2, angle: 90 },
        { x: 0.8, y: 0, angle: 270 },

    ])('точка {$x, $y}, угол $angle', ({ x, y, angle }) => {
        const rect = new Rectangle(rectangle, {
            point: { x: x, y: y },
            angle: angle
        });
        expect(rect.cPoint.point).toEqual(rect.cPoint.point);
    })
});

describe('Объект Reatangle должен иметь точку коннекта, которая лежит на его грани', () => {

    it.each([
        
        { x: 1.5, y: 2, angle: 0 },
        { x: 1.4, y: 1, angle: 0  },
        { x: 1.6, y: 1, angle: 0  },
        { x: 1.5, y: 3 , angle: 0 },
        { x: 0.4, y: 0.8 , angle: 0 },
        { x: 0.5, y: 10, angle: 0  },
        { x: 1, y: 0.4 , angle: 0 },
        { x: 1, y: 2.02 , angle: 0 },
        { x: 0.4, y: 0, angle: 0  },
        { x: 1, y: 0.2 , angle: 0 },
        { x: 0, y: 0 , angle: 0 },

    ])('точка {$x, $y}', ({ x, y, angle }) => {
        expect(() =>  { const r = new Rectangle(rectangle, {
            point: { x: x, y: y },
            angle: angle
        });
    console.log(r)}).toThrow(new Error('Ошибка: Точка соединения должна находиться на грани прямоугольника.'));
    })
});

describe('Объект Reatangle должен иметь точку коннекта с углом, перпендикулярным грани', () => {

    it.each([
        { x: 1.5, y: 1, angle: 90 },
        { x: 1.4, y: 2, angle: 180 },
        { x: 0.6, y: 2, angle: 0 },
        { x: 0.5, y: 0.4, angle: 90 },
        { x: 0.5, y: 0.1, angle: 0 },
        { x: 1, y: 2, angle: 270 },
        { x: 0.8, y: 0, angle: 180 },
    ])('точка {$x, $y}, угол $angle', ({ x, y, angle }) => {
        expect(() =>  { const r = new Rectangle(rectangle, {
            point: { x: x, y: y },
            angle: angle
        });
    console.log(r)}).toThrow(new Error('Ошибка: Для одного из прямоугольников задан неверный угол. Убедитесь, что угол точки соединения направлен наружу от прямоугольника под углом 0, 90, 180 или 270 градусов. '));
    })
});