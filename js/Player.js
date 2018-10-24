class Player {
  constructor(ctx, url) {
    this.ctx = ctx;
    this.img = new Image();
    this.img.src = url;
    this.x = 60;
    this.y = 460;
    this.vx = 2;
    this.vy = 2;
    this.height = 130;
    this.width = 130;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.isJumping = false;
  }

  center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
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

  moveUp() {
    this.y -= 10;
  }

  moveLeft() {
    this.speedX -= 0.1;
  }

  moveRight() {
    this.speedX += 0.1;
  }

  jump() {
    this.isJumping = true;
    this.speedY = -20;
    // this.speedX += 10;
    // this.gravity = 0.1;
  }

  draw() {
    this.ctx.save();
    if (debug) {
      this.ctx.fillStyle = "red";
      this.ctx.globalAlpha = 0.5;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.globalAlpha = 1;
    }
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.ctx.restore();
  }

  update() {
    //check limits:
    // if (this.x < 0) {
    //   this.x = 2;
    // }
    if (this.y < 0) {
      this.y = 2;
    }
    // if (this.y > 453) {
    //   this.y = 453;
    // }

    //this.speedY += 1.5; // gravity
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.9; // friction
    // this.speedY *= 0.9; // friction
    this.speedY += this.gravity;

    //this.gravity += 0.8;
    if (this.y >= canvas.height) {
      console.log("game over");
      //location.reload();
    }

    if (player.x >= canvas.width) {
      player.x = 0;
      console.log("next canvas");
    }

    // this.newPo();
  }

  checkBottom(platform) {
    // // Collision
    // if (
    //   this.bottom() > platform.top() &&
    //   platform.bottom() > this.top() &&
    //   this.center().x > platform.left() &&
    //   platform.right() > this.center().x &&
    //   this.bottom() - platform.top() < 30
    // ) {
    //   // console.log("collision");
    //   this.y = platform.top() - this.height;
    //   this.speedY = 0;
    //   this.isJumping = false;
    // }

    // Collision with the right
    if (
      platform.left() < this.right() &&
      this.right() < platform.right() &&
      platform.top() < this.center().y &&
      this.center().y < platform.bottom()
    ) {
      this.x = platform.left() - this.width;
    }
    // Collision with the left
    if (
      platform.left() < this.left() &&
      this.left() < platform.right() &&
      platform.top() < this.center().y &&
      this.center().y < platform.bottom()
    ) {
      this.x = platform.right();
    }
    // Collision
    if (
      this.bottom() > platform.top() &&
      platform.bottom() > this.top() &&
      this.center().x > platform.left() &&
      platform.right() > this.center().x &&
      platform.top() - this.bottom() < 10
    ) {
      this.y = platform.top() - this.height;
      this.speedY = 0;
      this.isJumping = false;
    }

    // if (this.bottom() <= platform.y && this.x <= platform.width) {
    //   this.isJumping = false;
    //   this.speedY = 0;
    //   this.gravitySpeed = 0.5;
    //   this.gravity = 0.5;
    // } else if (
    //   this.y + this.height <= platform.y &&
    //   this.x <= platform.width &&
    //   this.isJumping === true
    // ) {
    //   //this.isJumping = true;
    //   this.speedY = 0;
    //   this.gravitySpeed = 0.1;
    //   this.gravity = 0.1;
    // }
  }
  // make collision so it stops when it touchs the surface of the platform
  newPo() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  }
}
