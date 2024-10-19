import Graph from "./classes/Graph";
import Rectangle from "./classes/Rectangle";
import { ConnectionPoint, Point, Rect } from "./types";

export default function dataConverter(
    rect1: Rect, 
    rect2: Rect, 
    cPoint1: ConnectionPoint, 
    cPoint2: ConnectionPoint
  ): Point[]  {

    const rectangle1 = new Rectangle(rect1, cPoint1);
    const rectangle2 = new Rectangle(rect2, cPoint2);

    const graphArea = new Graph(rectangle1, rectangle2);




    return []
    // реализация алгоритма


    // создать Rectangle
    //создать area 
    //найти маршрут
  };