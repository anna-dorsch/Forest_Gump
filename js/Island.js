var img = new Image();

img.onload = function() {
  console.log(this.height);
};
img.src = "images/gras1.png";

class Island {
  constructor(ctx, url, x) {
    this.x = x;
    this.y = canvas.height - 230;
    //this.height = 400;
    this.width = 686;
    this.img = new Image();
    this.img.src = url;
    this.ctx = ctx;
    this.current = false;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y);
  }

  moveLeft() {
    this.x += 10;
  }

  moveRight() {
    this.x -= 10;
  }

  update() {
    this.x -= this.x;
  }
}

// var randomIsland = island[Math.floor(Math.random() * island.length)];
// console.log(randomIsland);
