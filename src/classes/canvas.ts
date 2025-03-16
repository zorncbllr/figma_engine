import Shape from "./shape";

interface CanvasProps {
  width: number;
  height: number;
}

class Canvas {
  private canvas;
  private context;
  private elements: Shape[];

  private target?: Shape;

  constructor({ width, height }: CanvasProps) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.elements = [];
    this.context = this.canvas.getContext("2d")!;

    this.canvas.style.border = "1px solid red";
    document.body.appendChild(this.canvas);

    this.animate(this.context);
  }

  public add(shape: Shape) {
    this.elements.push(shape);
  }

  private animate(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.elements.forEach((element) => {
      element.render(this.context);
    });

    this.handleClick();
    this.handleDrag();

    requestAnimationFrame(() => this.animate(context));
  }

  private handleClick() {
    this.canvas.onclick = (event: MouseEvent) => {
      this.elements.forEach((element) => {
        element.handleClick(event);

        if (element.resizing) {
          this.target = element;
          this.elements.forEach((elm) => {
            if (elm !== element) {
              elm.resizing = false;
            }
          });
        }
      });
    };
  }

  private handleDrag() {
    if (this.target && this.target.resizing) {
      this.target.handleResize(this.canvas);
    }
  }
}

export default Canvas;
