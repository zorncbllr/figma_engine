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
});

const r2 = new Rectangle({
  x: 80,
  y: 80,
  width: 300,
  height: 300,
  color: "red",
});

canvas.add(r2);
canvas.add(r1);
