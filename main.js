import { CanvasActuator } from "./CanvasActuator.js";
import { Snowflake } from "./Snowflake.js";

class Sketch {
  constructor() {
    this.myCanvas = new CanvasActuator(600, 600, "#000");
    this.myCanvas.on("draw", this.draw.bind(this));
    this.snow = [];
    this.gravity = { x: 0, y: 0.001 };

    // this.myCanvas = new CanvasActuator(600, 600, "#000");
    // this.myCanvas.on("draw", this.draw.bind(this));
    // this.snow = new Snowflake();
  }

  draw() {
    this.snow.push(new Snowflake());
    for (const flake of this.snow) {
      flake.applyForce(this.gravity);
      flake.update();
      flake.render(this.myCanvas.ctx);
    }
    const snowLength = this.snow.length;
    for (let i = snowLength - 1; i >= 0; i--) {
      const flake = this.snow[i];
      if (flake.offScreen()) {
        this.snow.splice(i, 1);
      }
    }

    // this.snow.render(this.myCanvas.ctx);
  }
}

new Sketch();
