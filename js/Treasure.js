class Treasure {
  constructor(ctx, url, x, y, width, height, type) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = url;
    this.type = type;
    // this.img.onload = () => {
    //   this.width = this.img.width;
    // };
    this.ctx = ctx;
    //this.current = false;
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

  moveLeft() {
    this.x += 20;
  }

  moveRight() {
    this.x -= 20;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.x;
  }
}
