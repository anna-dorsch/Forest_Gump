//just some variables to use
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var sound1 = new Audio("audio/sound1.mp3");
var sound2 = new Audio("audio/sound2.wav");
var falling = new Audio("audio/falling.mp3");
var birds = new Audio("audio/birds.flac");
var crash = new Audio("audio/crash.ogg");
var width = canvas.width;
var height = canvas.height;
var debug = false;

//array with islandpictures
var island = [
  "images/gras2.png",
  "images/gras3.png",
  "images/gras4.png",
  "images/gras5.png",
  "images/gras6.png",
  "images/gras7.png"
];

//array with treasurepictures
var points = [
  { url: "images/treasure.png", width: 66, height: 70, type: "addPoints" },
  { url: "images/flower.png", width: 77, height: 100, type: "addPoints" },
  { url: "images/food1.png", width: 75, height: 49, type: "addPoints" },
  { url: "images/food2.png", width: 87, height: 76, type: "addPoints" },
  { url: "images/stone.png", width: 128, height: 74, type: "reducePoints" }
];

//counter and lives
var counter = 0;
var lives = 3;

//variables for the background, deer, islands and treasures that are getting filled later
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
    points[0].height,
    points[0].type
  )
];

var gameInterval;

//function to start the game that is getting called, when you lose a life
function startGame() {
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
        player.moveLeft();
        grassBackgrounds.forEach(grassBackground => grassBackground.moveLeft());
        treasure.forEach(treasureChest => treasureChest.moveLeft());
      case 39:
        player.moveRight();
        grassBackgrounds.forEach(grassBackground =>
          grassBackground.moveRight()
        );
        treasure.forEach(treasureChest => treasureChest.moveRight());
        break;
      case 38: // up
      case 32: // space
        if (player.isJumping == false) player.jump();
        break;
    }
  };
  gameInterval = setInterval(function() {
    update();
    drawEverything();
  }, 1000 / 60);
}

//function to stop the game if you need to
function stopGame() {
  clearInterval(gameInterval);
}

//function to draw everything
function drawEverything() {
  ctx.clearRect(0, 0, width, height);
  bg.draw();

  treasure.forEach(treasureChest => treasureChest.draw());
  grassBackgrounds.forEach(grassBackground => grassBackground.draw());
  player.draw();
}

//function that updates everything that is changing/going on in the code
function update() {
  bg.update();
  player.update();
  if (
    grassBackgrounds[grassBackgrounds.length - 1].x +
      grassBackgrounds[grassBackgrounds.length - 1].width <=
    canvas.width - 150
  ) {
    newGrass();
  }

  //when the player loses a life this is happening
  if (player.y >= canvas.height) {
    falling.play();
    console.log("game over");

    lives--;
    stopGame();

    //if he still has some lives left
    if (lives > 0) {
      bg = new Background(ctx, "images/Background.png", 0.5);
      player = new Player(ctx, "images/deer.png");
      grassBackgrounds = [
        new Island(ctx, "images/gras1.png", 0, canvas.height - 220),
        new Island(ctx, "images/gras2.png", 900, canvas.height - 175)
      ];

      treasure = [
        new Treasure(
          ctx,
          points[0].url,
          400,
          canvas.height - 284,
          points[0].width,
          points[0].height,
          points[0].type
        )
      ];
      startGame();
    } else {
      //if ran out of lives
      setTimeout(function() {
        var elementsToShow = document.querySelectorAll(".toShow");

        for (var i = 0, max = elementsToShow.length; i < max; i++) {
          elementsToShow[i].style.display = "block";
        }
      }, 400);
    }
    document.getElementById("overlay2").innerHTML = "Lives:" + " " + lives;
  }

  //create a new treasure when the last treasure is 300px away from the border of the canvas
  if (
    treasure.length === 0 ||
    treasure[treasure.length - 1].x + treasure[treasure.length - 1].width <=
      canvas.width - 300
  ) {
    newTreasure();
  }

  //check wheter the player is collecting the treasure or not + add or remove points
  treasure = treasure.filter(function(money, i) {
    return player.checkTreasure(money) ? false : true;
  });

  //check whether the player is landing on the island or not
  grassBackgrounds.forEach(function(grass, i) {
    player.checkBottom(grass);
  });
}

//create new islandelement and push it into the grassbackgrounds array
function newGrass() {
  var randomNumber = Math.floor(Math.random() * Math.floor(island.length));
  var randomHeight = Math.floor(Math.random() * (600 - 400 + 1) + 400);
  grassBackgrounds.push(
    new Island(ctx, island[randomNumber], canvas.width, randomHeight)
  );
}

//create new treasureelement and push it into the treasure array
function newTreasure() {
  var randomNumber = Math.floor(Math.random() * Math.floor(points.length));
  var randomHeight = Math.floor(
    Math.random() *
      (grassBackgrounds[grassBackgrounds.length - 1].y - 100 - 400 + 1) +
      400
  );
  treasure.push(
    new Treasure(
      ctx,
      points[randomNumber].url,
      canvas.width,
      randomHeight,
      points[randomNumber].width,
      points[randomNumber].height,
      points[randomNumber].type
    )
  );
}

//what happens when the window is loaded
window.onload = function() {
  gameInterval = setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    bg.draw();

    grassBackgrounds.forEach(grassBackground => grassBackground.draw());
  }, 1000 / 60);
};

//if you click on the startbutton then..
document.getElementById("start-button").addEventListener("click", function() {
  clearInterval(gameInterval);
  var element = document.getElementById("start-button");
  element.classList.toggle("box-shadow");
  setTimeout(function() {
    var elementsToHide = document.querySelectorAll(".toHide");
    startGame();

    for (var i = 0, max = elementsToHide.length; i < max; i++) {
      elementsToHide[i].style.display = "none";
    }
  }, 400);
});

//if you click on the restartbutton then..
document.getElementById("restart-button").addEventListener("click", function() {
  var element = document.getElementById("restart-button");
  element.classList.toggle("box-shadow");

  setTimeout(function() {
    location.reload();
    startGame();
  }, 600);
});
