var img = new Image();

img.onload = function() {
  console.log(this.width);
};
img.src = "images/gras1.png";

class Island {
  constructor(ctx, url, x, y) {
    this.x = x;
    this.y = y;
    this.height = 400;
    this.img = new Image();
    this.img.src = url;
    this.img.onload = () => {
      this.width = this.img.width;
    };
    this.ctx = ctx;
    this.current = false;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }

  draw() {
    this.ctx.save();
    if (debug) {
      this.ctx.fillStyle = "red";
      this.ctx.globalAlpha = 0.5;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.globalAlpha = 1;
    }
    this.ctx.drawImage(this.img, this.x, this.y);
    this.ctx.restore();
  }

  moveLeft() {
    this.x += 20;
  }

  moveRight() {
    this.x -= 20;
  }

  update() {
    this.x -= this.x;
  }
}

// var randomIsland = island[Math.floor(Math.random() * island.length)];
// console.log(randomIsland);
