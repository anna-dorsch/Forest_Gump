console.log("hello Forest");

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var island = [
  "images/gras1.png",
  "images/gras2.png",
  "images/gras3.png",
  "images/gras4.png",
  "images/gras5.png",
  "images/gras6.png",
  "images/gras7.png"
];
var frameCounter = 0;
//var gravity = 0.3

var bg = new Background(ctx, "images/Background.png", 0.5);
var player = new Player(ctx, "images/deer.png");
var grassBackgrounds = [
  new Island(ctx, "images/gras1.png", 0),
  new Island(ctx, "images/gras2.png", 900),
  new Island(ctx, "images/gras3.png", 2000)
];

// var randomNumber = Math.floor(Math.random() * Math.floor(island.length));
// grassBackgrounds.push(new Island(ctx, island[randomNumber]));

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 40:
      player.moveDown();
      console.log("down", player);
      break;
    case 37:
      player.moveLeft();
      grassBackgrounds.forEach(grassBackground => grassBackground.moveLeft());
      console.log("left", player);
      break;
    case 39:
      player.moveRight();
      console.log("right", player);
      grassBackgrounds.forEach(grassBackground => grassBackground.moveRight());
      break;
    case 32:
      if (player.isJumping == false) player.jump();
      console.log("jump", player);
      break;
  }
};

setInterval(function() {
  update();
  drawEverything();
}, 1000 / 60);

function update() {
  if (
    grassBackgrounds[grassBackgrounds.length - 1].x +
      grassBackgrounds[grassBackgrounds.length - 1].width ===
    1350
  ) {
    console.log("Creating an island");
    // newGrass();
  }

  bg.update();
  player.update();

  grassBackgrounds.map(function(grass, i) {
    if (
      grass.x <= player.x &&
      grass.x + grass.width >= player.x + player.width
    ) {
      grass.current = true;
    } else {
      grass.current = false;
    }
    if (grass.current) {
      player.checkBottom(grass);
    } else {
      // player.falling();
    }
  });

  // grass.update();
}

function drawEverything() {
  ctx.clearRect(0, 0, width, height);
  bg.draw();
  grassBackgrounds.forEach(grassBackground => grassBackground.draw());
  player.draw();
}

function newGrass() {
  var randomNumber = Math.floor(Math.random() * Math.floor(island.length));
  grassBackgrounds.push(new Island(ctx, island[randomNumber], canvas.width));
  // while (grassBackgrounds[0].length <= canvas.width - 50) {
  //   grassBackgrounds.push(grass);
  // }
}
