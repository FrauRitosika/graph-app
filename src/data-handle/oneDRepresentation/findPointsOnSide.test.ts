import { COORD } from "../types"
import { findPointsOnSide } from "./oneDFunctions";

describe('Функция findPointsOnSide находит координаты точек, который образуются в результате проекции граней прямоугольника (перпендикулярных оси) на заданную ось координат', () => {
    it.each([
        {
            rect: {
                position: {
                    x: 1,
                    y: 1
                },
                size: {
                    width: 1,
                    height: 2
                }
            },
            coord: COORD.x,
            resultPoints: [0.5,1.5]
        },
        {
            rect: {
                position: {
                    x: 1,
                    y: 1
                },
                size: {
                    width: 1,
                    height: 2
                }
            },
            coord: COORD.y,
            resultPoints: [0,2]
        },
    ])('', ({ rect, coord, resultPoints }) => {
        expect(findPointsOnSide(rect, coord)).toEqual(resultPoints);
    })
})