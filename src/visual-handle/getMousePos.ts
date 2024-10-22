import { Point } from "../data-handle/types";

function getMousePos(canvas: HTMLCanvasElement, event: MouseEvent): Point {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  export {getMousePos}