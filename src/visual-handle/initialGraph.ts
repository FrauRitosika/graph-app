import Graph from "../data-handle/classes/Graph";

const initialDataGraph = {
    rect1: {
        position: {
            x: 150,
            y: 200
        }, size: {
            width: 100,
            height: 100
        }
    },
    rect2: {
        position: {
            x: 350,
            y: 300
        }, size: {
            width: 100,
            height: 200
        }
    },
    cPoint1: {
        point: {
            x: 100,
            y: 200
        },
        angle: 180
    },
    cPoint2: {
        point: {
            x: 300,
            y: 300
        },
        angle: 180
    }
}

const initialGraph = new Graph(initialDataGraph.rect1, initialDataGraph.rect2, initialDataGraph.cPoint1, initialDataGraph.cPoint2);

export { initialGraph }