import Shape, { ShapeProps } from "./shape";

class Rectangle extends Shape {
  constructor(props: ShapeProps) {
    super(props);
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);

    if (this.active) {
      this.showResize(context);
    }
  }
}

export default Rectangle;
