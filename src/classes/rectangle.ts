import Shape, { ShapeProps } from "./shape";

class Rectangle extends Shape {
  clicked: boolean;

  constructor(props: ShapeProps) {
    super(props);

    this.clicked = false;
  }

  render(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  handleClick(event: MouseEvent, context: CanvasRenderingContext2D): void {
    const mx = event.offsetX;
    const my = event.offsetY;

    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.toggleResize(context);
    }
  }

  toggleResize(context: CanvasRenderingContext2D) {
    this.clicked = !this.clicked;

    if (this.clicked) {
      context.lineWidth = 3;
      context.strokeStyle = "black";
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.stroke();
    } else {
      context.clearRect(
        this.x - 3,
        this.y - 3,
        this.width + 6,
        this.height + 6
      );
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

export default Rectangle;
