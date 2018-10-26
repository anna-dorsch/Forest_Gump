//class to implement a player
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
    this.hasFallen = false;
  }

  //that is the startposition of the player
  startPos() {
    {
      this.x = 60;
      this.y = 460;
    }
  }

  //the center of the player is:
  center() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }
  //the top of the player is:
  top() {
    return this.y;
  }
  //the bottom of the player is:
  bottom() {
    return this.y + this.height;
  }
  //the left of the player is:
  left() {
    return this.x;
  }
  //the right of the player is:
  right() {
    return this.x + this.width;
  }

  //if you move the player up, his position changes in this way
  moveUp() {
    this.y -= 10;
  }
  //if you move the player to the left, his position changes in this way (is not implemented right now)
  moveLeft() {
    this.speedX -= 0.1;
  }
  //if you move the player to the right, his position changes in this way
  moveRight() {
    this.speedX += 0.1;
  }
  //when the player is jumping
  jump() {
    this.isJumping = true;
    this.speedY = -15;
    this.speedX += 10;
    // this.gravity = 0.1;
  }

  //draw the player
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
  //update the player
  update() {
    if (this.y < 0) {
      this.y = 2;
    }

    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.9; // friction
    //this.speedY *= 0.9; // friction
    this.speedY += this.gravity;

    if (player.x >= canvas.width) {
      player.x = 0;
      console.log("next canvas");
    }
  }

  checkBottom(platform) {
    // // Collision
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
    // Collision on top of the island
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
  }

  //check if the player collcted the treasure
  checkTreasure(money) {
    if (
      this.y + this.height < money.y ||
      this.y > money.y + money.height ||
      this.x + this.width - 40 < money.x ||
      this.x > money.x + money.width
    ) {
    } else {
      //no stone
      if (money.type === "addPoints") {
        counter = counter + 1;
        console.log("this", counter);
        console.log(money.type);
        document.getElementById("overlay").innerHTML =
          "Your Score:" + " " + counter;
        sound1.play();
        return true;
      } else {
        //stone
        counter--;
        document.getElementById("overlay").innerHTML =
          "Your Score:" + " " + counter;
        crash.play();
        return true;
      }
    }
  }

  // make collision so it stops when it touchs the surface of the platform
  newPo() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  }
}
