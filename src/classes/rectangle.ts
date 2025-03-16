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

    if (this.clicked) {
      this.showResize(context);
    }
  }

  handleClick(event: MouseEvent): void {
    const mx = event.offsetX;
    const my = event.offsetY;

    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.clicked = !this.clicked;
    }
  }

  showResize(context: CanvasRenderingContext2D) {
    context.lineWidth = 2;
    context.strokeStyle = "#3E64FF";
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.stroke();

    const resizePoints = [
      { x: this.x - 4, y: this.y - 4, width: 8, height: 8 },
      { x: this.x + this.width - 4, y: this.y - 4, width: 8, height: 8 },
      { x: this.x - 4, y: this.y + this.height - 4, width: 8, height: 8 },
      {
        x: this.x + this.width - 4,
        y: this.y + this.height - 4,
        width: 8,
        height: 8,
      },
    ];

    context.fillStyle = "#FFFFFF";

    resizePoints.forEach((point) => {
      context.fillRect(point.x, point.y, point.width, point.height);
      context.strokeRect(point.x, point.y, point.width, point.height);
    });
  }
}

export default Rectangle;
