class Player {
  constructor(ctx, url) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = url;
    this.x = 60;
    this.y = canvas.width - 230;
    this.vx = 2;
    this.vy = 2;
    this.height = 65;
    this.width = 65;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 1;
    this.gravitySpeed = 0;
    this.isJumping = false;
  }

  moveUp() {
    this.y -= 10;
  }

  moveLeft() {
    this.speedX -= 0.5;
  }

  moveRight() {
    this.speedX += 0.5;
  }

  jump() {
    this.isJumping = true;
    this.speedY -= 50;
    // this.speedY -= 10;
    // this.speedX += 10;
    // this.gravity = 0.1;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, 130, 130);
  }

  update() {
    // check limits:
    if (this.x < 0) {
      this.x = 2;
    }
    if (this.y < 0) {
      this.y = 2;
    }
    if (this.y > 453) {
      this.y = 453;
    }

    // this.speedY += 1.5; // gravity
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.9; // friction
    this.speedY *= 0.9; // friction

    // this.gravity += 5;
    if (player.y > 800) {
      console.log("game over");
    }
    this.newPo();
  }

  checkBottom(platform) {
    if (this.y + this.height <= platform.y && this.x <= platform.width) {
      this.isJumping = false;
      this.speedY = 0;
      this.gravitySpeed = 0;
      this.gravity = 0;
    }
  }
  // make collision so it stops when it touchs the surface of the platform
  newPo() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  }
}
