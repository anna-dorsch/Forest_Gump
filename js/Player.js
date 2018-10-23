class Player {
  constructor(ctx,url,speed) {
    this.ctx = ctx
    this.img = new Image()
    this.img.src = url
    this.x = 50
    this.y= 453
    this.vx =2
    this.vy=2
    this.height = 65
    this.width = 65
    this.speedX = speed
    this.speedY = speed
    this.gravity = 1;
    this.gravitySpeed = 0;
    
    
   
  
  }

  moveUp() {this.y -= 10}

  moveLeft(){ this.x -= 10 }

  moveRight(){this.x += 10}

jump(){this.y -= 50; this.x +=30}

  draw(){
       this.ctx.drawImage(this.img, this.x, this.y, 130, 130); 
  }



  update(){
    this.newPo()

    if(this.x  < 0) {
      this.x =2;
    }

    if(this.y + this.height > 453 && this.x < 630){
      this.gravitySpeed = 0 
    }

    if (this.y < 0) {
      this.y= 2;
    }

    if (this.y > 453){
      this.y = 453 
    }
    console.log('updating 4')
    this.newPo() 
    

    if (player.y > 800){
    alert('Game Over')

}
}

  newPo() { 
  this.gravitySpeed += this.gravity;
  this.x += this.speedX;
  this.y += this.speedY + this.gravitySpeed; 
}

}


