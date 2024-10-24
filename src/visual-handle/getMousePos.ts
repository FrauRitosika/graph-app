import { Point } from "../data-handle/types";

function getMousePos(event: MouseEvent): Point {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  export {getMousePos}