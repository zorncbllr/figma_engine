export interface ShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

interface Point {
  x: number;
  y: number;
  width: number;
  height: number;
  corner: string;
}

abstract class Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  public resizing: boolean;

  resizePoints: Point[];

  constructor({ x, y, width, height, color }: ShapeProps) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color ?? "blue";

    this.resizing = false;

    this.resizePoints = this.getResizePoints();
  }

  abstract render(context: CanvasRenderingContext2D): void;

  handleClick(event: MouseEvent): void {
    const mx = event.offsetX;
    const my = event.offsetY;

    if (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    ) {
      this.resizing = !this.resizing;
    }
  }

  showResize(context: CanvasRenderingContext2D) {
    context.lineWidth = 2;
    context.strokeStyle = "#3E64FF";
    context.strokeRect(this.x, this.y, this.width, this.height);
    context.stroke();

    context.fillStyle = "#FFFFFF";

    this.resizePoints.forEach((point) => {
      context.fillRect(point.x, point.y, point.width, point.height);
      context.strokeRect(point.x, point.y, point.width, point.height);
    });
  }

  handleResize(canvas: HTMLCanvasElement) {
    canvas.onpointerdown = (ev: PointerEvent) => {
      if (this.resizing) {
        let mx = ev.offsetX;
        let my = ev.offsetY;

        this.resizePoints.forEach((point) => {
          if (
            mx >= point.x &&
            mx <= point.x + point.width &&
            my >= point.y &&
            my <= point.y + point.height
          ) {
            canvas.onpointermove = (mev: PointerEvent) => {
              const newMX = mev.offsetX;
              const newMY = mev.offsetY;

              if (point.corner == "top-left") {
                this.x -= mx - newMX;
                this.y -= my - newMY;
                this.width -= newMX - mx;
                this.height -= newMY - my;
              }

              if (point.corner == "top-right") {
                this.y -= my - newMY;
                this.width += newMX - mx;
                this.height -= newMY - my;
              }

              if (point.corner == "bottom-left") {
                this.x -= mx - newMX;
                this.width -= newMX - mx;
                this.height += newMY - my;
              }

              if (point.corner == "bottom-right") {
                this.width += newMX - mx;
                this.height += newMY - my;
              }

              mx = newMX;
              my = newMY;

              this.resizePoints = this.getResizePoints();
            };
          }
        });
      } else {
        canvas.onpointermove = null;
      }
    };

    canvas.onpointerup = () => {
      canvas.onpointermove = null;
    };
  }

  getResizePoints(): Point[] {
    return [
      { x: this.x - 4, y: this.y - 4, width: 8, height: 8, corner: "top-left" },
      {
        x: this.x + this.width - 4,
        y: this.y - 4,
        width: 8,
        height: 8,
        corner: "top-right",
      },
      {
        x: this.x - 4,
        y: this.y + this.height - 4,
        width: 8,
        height: 8,
        corner: "bottom-left",
      },
      {
        x: this.x + this.width - 4,
        y: this.y + this.height - 4,
        width: 8,
        height: 8,
        corner: "bottom-right",
      },
    ];
  }
}

export default Shape;
