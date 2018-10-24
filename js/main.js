console.log("hello Forest");

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var sound1 = new Audio("audio/sound1.mp3");
var sound2 = new Audio("audio/sound2.wav");
var falling = new Audio("audio/falling.mp3");
var birds = new Audio("audio/birds.flac");
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

var points = [
  { url: "images/treasure.png", width: 66, height: 70 },
  { url: "images/flower.png", width: 77, height: 100 },
  { url: "images/food1.png", width: 75, height: 49 },
  { url: "images/food2.png", width: 87, height: 76 },
  { url: "images/stone.png", width: 128, height: 74 }
];

var counter = 0;

var bg = new Background(ctx, "images/Background.png", 0.5);
var player = new Player(ctx, "images/deer.png");
var grassBackgrounds = [
  new Island(ctx, "images/gras1.png", 0, canvas.height - 220),
  new Island(ctx, "images/gras2.png", 900, canvas.height - 175)
];

var treasure = [
  new Treasure(
    ctx,
    points[0].url,
    400,
    canvas.height - 284,
    points[0].width,
    points[0].height
  )
];

// console.log(treasure.x);
// var randomNumber = Math.floor(Math.random() * Math.floor(island.length));
// grassBackgrounds.push(new Island(ctx, island[randomNumber]));

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      player.moveLeft();
      grassBackgrounds.forEach(grassBackground => grassBackground.moveLeft());
      treasure.forEach(treasureChest => treasureChest.moveLeft());
    case 39:
      player.moveRight();
      grassBackgrounds.forEach(grassBackground => grassBackground.moveRight());
      treasure.forEach(treasureChest => treasureChest.moveRight());
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
  treasure.forEach(treasureChest => treasureChest.draw());
  grassBackgrounds.forEach(grassBackground => grassBackground.draw());
  player.draw();
}

function update() {
  bg.update();
  //reasure.update();
  player.update();
  if (
    grassBackgrounds[grassBackgrounds.length - 1].x +
      grassBackgrounds[grassBackgrounds.length - 1].width <=
    canvas.width - 150
  ) {
    newGrass();
  }

  if (
    treasure.length === 0 ||
    treasure[treasure.length - 1].x + treasure[treasure.length - 1].width <=
      canvas.width - 300
  ) {
    console.log("Creating a new treasure");
    newTreasure();
  }

  // bg.update();
  // player.update();

  treasure = treasure.filter(function(money, i) {
    return player.checkTreasure(money) ? false : true;
  });

  grassBackgrounds.forEach(function(grass, i) {
    player.checkBottom(grass);
  });
}

function newGrass() {
  var randomNumber = Math.floor(Math.random() * Math.floor(island.length));
  var randomHeight = Math.floor(Math.random() * (600 - 400 + 1) + 400);
  grassBackgrounds.push(
    new Island(ctx, island[randomNumber], canvas.width, randomHeight)
  );
}

function newTreasure() {
  var randomNumber = Math.floor(Math.random() * Math.floor(points.length));
  var randomHeight = Math.floor(
    Math.random() *
      (grassBackgrounds[grassBackgrounds.length - 1].y - 400 + 1) +
      400
  );
  treasure.push(
    new Treasure(
      ctx,
      points[randomNumber].url,
      canvas.width,
      randomHeight,
      points[randomNumber].width,
      points[randomNumber].height
    )
  );
}
console.log(counter);

// function checkCollision(){
//   if (player)

// }
