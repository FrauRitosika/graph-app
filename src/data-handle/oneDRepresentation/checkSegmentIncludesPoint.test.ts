import { checkSegmentIncludesPoint } from "./oneDFunctions";

describe('Функция проверяет содердит ли отрезок хотя бы одну из заданных точек', () => {
    it.each([
        {
            segment: [0, 1],
            points: [0, 1],
            result: false
        },
        {
            segment: [0, 1],
            points: [0.1, 1],
            result: true
        },
        {
            segment: [2, 6],
            points: [0, 2],
            result: false
        },
        {
            segment: [2, 6],
            points: [0, 3],
            result: true
        },
        {
            segment: [2, 6],
            points: [4],
            result: true
        },
        {
            segment: [2, 6],
            points: [0],
            result: false
        },

    ])('', ({segment, points, result}) => {
        expect(checkSegmentIncludesPoint(segment, points)).toEqual(result);
    })
})