console.log("hello Forest");

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var debug = false;
var island = [
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
  new Island(ctx, "images/gras1.png", 0, canvas.height - 220),
  new Island(ctx, "images/gras2.png", 900, canvas.height - 175)
  // new Island(ctx, "images/gras3.png", 2000)
];

// var randomNumber = Math.floor(Math.random() * Math.floor(island.length));
// grassBackgrounds.push(new Island(ctx, island[randomNumber]));

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      player.moveLeft();
      grassBackgrounds.forEach(grassBackground => grassBackground.moveLeft());
      break;
    case 39:
      player.moveRight();
      grassBackgrounds.forEach(grassBackground => grassBackground.moveRight());
      break;
    case 38: // up
    case 32: // space
      if (player.isJumping == false) player.jump();
      break;
  }
};

setInterval(function() {
  update();
  drawEverything();
}, 1000 / 60);

function drawEverything() {
  ctx.clearRect(0, 0, width, height);
  bg.draw();
  grassBackgrounds.forEach(grassBackground => grassBackground.draw());
  player.draw();
}

function update() {
  bg.update();
  player.update();
  if (
    grassBackgrounds[grassBackgrounds.length - 1].x +
      grassBackgrounds[grassBackgrounds.length - 1].width <=
    canvas.width - 150
  ) {
    console.log("Creating an island");
    newGrass();
  }

  // bg.update();
  // player.update();

  grassBackgrounds.forEach(function(grass, i) {
    player.checkBottom(grass);

    //else {
    //   // player.falling();
    // }
  });

  // grass.update();
  // console.log(player.gravity);
}

function newGrass() {
  var randomNumber = Math.floor(Math.random() * Math.floor(island.length));
  var randomHeight = Math.floor(Math.random() * (600 - 400 + 1) + 400);
  grassBackgrounds.push(
    new Island(ctx, island[randomNumber], canvas.width, randomHeight)
  );
  // while (grassBackgrounds[0].length <= canvas.width - 50) {
  //   grassBackgrounds.push(grass);
  // }
}

// function checkCollision(){
//   if (player)

// }
