import { checkSegmentNotIntersectionSegment } from "../oneDFunctions";

describe('Функция проверяет, что отрезки не пересекаются', () => {
    it.each([
        {
            segment1: [0, 1],
            segment2: [0, 1],
            result: false
        },
        {
            segment1: [6, 9],
            segment2: [0, 1],
            result: true
        },
        {
            segment1: [6, 9],
            segment2: [6.1, 8],
            result: false
        },
        {
            segment1: [6, 9],
            segment2: [9.1, 18],
            result: true
        },
        {
            segment1: [6, 9],
            segment2: [6, 9],
            result: false
        },

    ])('', ({ segment1, segment2, result }) => {
            expect(checkSegmentNotIntersectionSegment(segment1, segment2)).toEqual(result);
    })
})