import Canvas from "./classes/canvas";
import Rectangle from "./classes/rectangle";

const canvas = new Canvas({
  width: 500,
  height: 500,
});

const r1 = new Rectangle({
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  draggable: true,
});

const r2 = new Rectangle({
  x: 250,
  y: 100,
  width: 100,
  height: 100,
  draggable: true,
  resizable: true,
});

canvas.add(r1);
canvas.add(r2);
