export interface ShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

abstract class Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor({ x, y, width, height, color }: ShapeProps) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color ?? "blue";
  }

  abstract render(context: CanvasRenderingContext2D): void;

  abstract handleClick(event: MouseEvent): void;
}

export default Shape;
