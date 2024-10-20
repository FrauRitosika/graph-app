import { ConnectionPoint, Rect } from "../../types"

const testRect1: Rect = {
    position: { x: 60, y: 40 },
    size: { width: 40, height: 20 }
}

const testCPoint1: ConnectionPoint = {
    point: { x: 40, y: 40 },
    angle: 180
}

const testRect2: Rect = {
    position: { x: 15, y: 20 },
    size: { width: 10, height: 20 }
}

const testCPoint2: ConnectionPoint = {
    point: { x: 20, y: 20 },
    angle: 0
}

const testRect3: Rect = {
    position: { x: 30, y: 30 },
    size: { width: 40, height: 20 }
}

const testCPoint3 = {
    point: { x: 30, y: 40 },
    angle: 90
}

const testRect4: Rect = {
    position: { x: 60, y: 40 },
    size: { width: 10, height: 10 }
}

const testCPoint4 = {
    point: { x: 60, y: 45 },
    angle: 90
}

const testRect5: Rect = {
    position: { x: 60, y: 40 },
    size: { width: 18, height: 10 }
}

const testCPoint5 = {
    point: { x: 60, y: 45 },
    angle: 90
}

const testRect6: Rect = {
    position: { x: 150, y: 200 },
    size: { width: 100, height: 100 }
}

const testRect7: Rect = {
    position: { x: 350, y: 300 },
    size: { width: 100, height: 200 }
}

const testCPoint7 = {
    point: { x: 400, y: 300 },
    angle: 0
}

const testCPoint6 = {
    point: { x: 100, y: 200 },
    angle: 180
}

export {
    testRect1, testRect2, testRect3, testRect4, testRect5, testCPoint1, testCPoint2, testCPoint3, testCPoint4, testCPoint5
    , testCPoint6, testCPoint7, testRect6, testRect7
}