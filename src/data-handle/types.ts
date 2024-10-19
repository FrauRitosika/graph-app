enum COORD {
    x,
    y
}

type Point = {
    x: number;
    y: number;
};

type Size = {
    width: number;
    height: number;
};
type Rect = {
    position: Point; // координата центра прямоугольника
    size: Size;
};
type ConnectionPoint = {
    point: Point;
    angle: number; // угол в градусах
};

function getCoord(coord: COORD) {
    const str: keyof Point = coord === COORD.x ? 'x' : 'y';
    return str;
}

export type { Point, Size, Rect, ConnectionPoint }
export { COORD, getCoord }