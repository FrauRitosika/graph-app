import { checkSegmentNotIncludesPoint } from "../oneDFunctions";

describe('Функция проверяет содердит ли отрезок хотя бы одну из заданных точек', () => {
    it.each([
        {
            segment: [0, 1],
            points: [0, 1],
            result: true
        },
        {
            segment: [0, 1],
            points: [0.1, 1],
            result: false
        },
        {
            segment: [2, 6],
            points: [0, 2],
            result: true
        },
        {
            segment: [2, 6],
            points: [0, 3],
            result: false
        },
        {
            segment: [2, 6],
            points: [4],
            result: false
        },
        {
            segment: [2, 6],
            points: [0],
            result: true
        },

    ])('', ({segment, points, result}) => {
        expect(checkSegmentNotIncludesPoint(segment, points)).toEqual(result);
    })
})