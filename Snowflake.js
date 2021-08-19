export class Snowflake {
  constructor() {
    this.pos = {
      x: Math.random() * screen.width,
      y: Math.random() * -15,
    };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.r = Math.random() * 2;
    this.mass = this.r * this.r * Math.PI;
  }

  offScreen() {
    return this.pos.y > screen.height + this.r;
  }

  applyForce(force) {
    this.acc.x = force.x * this.mass;
    this.acc.y = force.y * this.mass;
  }

  fhv(vo, a) {
    return vo + a;
  }

  fhp(so, vo, a) {
    return so + vo + a / 2;
  }

  update() {
    this.vel.x = this.fhv(this.vel.x, this.acc.x);
    this.vel.y = this.fhv(this.vel.y, this.acc.y);
    this.pos.x = this.fhp(this.pos.x, this.vel.x, this.acc.x);
    this.pos.y = this.fhp(this.pos.y, this.vel.y, this.acc.y);
  }

  render(e) {
    e.fillStyle = "#FFF";
    const point = (x, y) => {
      e.beginPath();
      e.arc(x, y, this.r * 3, 0, 2 * Math.PI);
      e.fill();
    };
    point(this.pos.x, this.pos.y);
  }
}
