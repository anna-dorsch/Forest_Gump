console.log('hello Forest')

var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height

//var gravity = 0.3

var bg = new Background(ctx, 'images/Background.png',0.5)
var player = new Player(ctx, 'images/deer.png', 0)

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: player.moveUp();    console.log('up',    player); break;
    case 40: player.moveDown();  console.log('down',  player); break;
    case 37: player.moveLeft();  console.log('left',  player); break;
    case 39: player.moveRight(); console.log('right', player); break;
    case 32: player.jump(); console.log('jump', player);break;
  }
  
}


setInterval(function() {
  update()
  drawEverything()
}, 1000/60)

function update() {
bg.update()
player.update()

}

function drawEverything() {
  ctx.clearRect(0,0,width,height)
  bg.draw()
  player.draw() 
}

