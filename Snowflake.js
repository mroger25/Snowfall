const drawLeg = (e, x, y, ang, length, width) => {
  e.beginPath();
  e.lineWidth = width;
  e.lineCap = "round";
  e.translate(x, y);
  e.moveTo(0, 0);
  e.rotate(ang);
  e.lineTo(0, length);
  e.stroke();
  e.rotate(-ang);
  e.translate(-x, -y);
};

const drawFlake = (e, x, y, r, n, color) => {
  const angLeg = Math.PI * (2 / n);
  e.strokeStyle = color;
  for (let i = 0; i < n; i++) {
    const leg = i * angLeg;
    drawLeg(e, x, y, leg, r * 0.8, r * 0.07);
  }
};

export class Snowflake {
  constructor() {
    this.pos = { x: Math.random() * 600, y: Math.random() - 11 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.r = Math.random() * 2;
    this.totalLegs = 3 + Math.floor(Math.random() * 6);
    this.mass = this.r * this.r * Math.PI;
  }

  offScreen() {
    return this.pos.y > 600 + this.r;
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
    drawFlake(e, this.pos.x, this.pos.y, this.r * 5, this.totalLegs, "#FFF");
  }
}
