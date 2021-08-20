const drawLeg = (e, x, y, ang, length, width) => {
  e.beginPath();
  e.lineWidth = width;
  e.lineCap = "round";
  e.translate(x, y);
  e.rotate(ang);
  e.moveTo(0, -length);
  e.lineTo(0, length);
  e.stroke();
  e.rotate(-ang);
  e.translate(-x, -y);
};

const drawFlake = (e, x, y, r, angle, color) => {
  const a = angle || 0;
  const angLeg = Math.PI * (2 / 3);
  e.strokeStyle = color;
  for (let i = 0; i < 3; i++) {
    const leg = i * angLeg + a;
    drawLeg(e, x, y, leg, r * 0.8, r * 0.07);
  }
};

export class Snowflake {
  constructor() {
    this.r = 0.25 + Math.random() * 2;
    this.mass = this.r * this.r * Math.PI;
    this.pos = { x: Math.random() * window.innerWidth, y: Math.random() - 11 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0.001 * this.mass };
    this.angle = Math.random() * 2 * Math.PI;
    this.vel_ang = (Math.PI / 180) * (1 - Math.random() * 2);
  }

  offScreen() {
    return (
      this.pos.x - this.r > window.innerWidth ||
      this.pos.x + this.r < 0 ||
      this.pos.y - this.r > window.innerHeight
    );
  }

  mcu() {
    this.angle += this.vel_ang;
  }

  fhv() {
    this.vel = { x: this.vel.x + this.acc.x, y: this.vel.y + this.acc.y };
  }

  fhp() {
    this.pos = { x: this.pos.x + this.vel.x, y: this.pos.y + this.vel.y };
  }

  update() {
    this.acc.x = Math.cos(Math.random() * Math.PI) / 100;
    this.mcu();
    this.fhv();
    this.fhp();
  }

  render(e) {
    drawFlake(e, this.pos.x, this.pos.y, this.r * 5, this.angle, "#FFF");
  }
}
