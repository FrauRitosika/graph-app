import Graph from "../data-handle/classes/Graph";
import { ConnectionPoint, Rect } from "../data-handle/types";

type TCanvas = {
    chart: Graph;
    changeChart: (id: number, cpoint?: ConnectionPoint, rect?: Rect) => void
}

const ACTIONS: { [key: string]: string } = {
    ArrowRight: "right",
    ArrowLeft: "left",
    ArrowUp: "down",
    ArrowDown: "up"
}

export type {TCanvas};
export {ACTIONS};