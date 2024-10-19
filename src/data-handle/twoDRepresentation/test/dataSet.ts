import { ConnectionPoint, Rect } from "../../types"

const testRect1: Rect = {
    position: { x: 6, y: 4 },
    size: { width: 4, height: 2 }
}

const testCPoint1: ConnectionPoint = {
    point: { x: 4, y: 4 },
    angle: 180
}

const testRect2: Rect = {
    position: { x: 1.5, y: 2 },
    size: { width: 1, height: 2 }
}

const testCPoint2: ConnectionPoint = {
    point: { x: 2, y: 2 },
    angle: 0
}

const testRect3: Rect = {
    position: { x: 3, y: 3 },
    size: { width: 4, height: 2 }
}

const testCPoint3 = {
    point: { x: 3, y: 4 },
    angle: 90
}

const testRect4: Rect = {
    position: { x: 6, y: 4 },
    size: { width: 1, height: 1 }
}

const testCPoint4 = {
    point: { x: 6, y: 4.5 },
    angle: 90
}

const testRect5: Rect = {
    position: { x: 6, y: 4 },
    size: { width: 1.8, height: 1 }
}

const testCPoint5 = {
    point: { x: 6, y: 4.5 },
    angle: 90
}

export { testRect1, testRect2, testRect3, testRect4, testRect5, testCPoint1, testCPoint2, testCPoint3, testCPoint4, testCPoint5 }