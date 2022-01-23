var character,characterImg,characterImg2
var groundImg,ground,invGround
var score=0,g =0
var sun,sunImg
var obstaclesGroup,alienImg,coinImg,CoinGroup,coinText
var AlienSound
var reduce,remain
var game,end,play

function preload(){
  groundImg = loadImage("Images/ground2.png")
  characterImg = loadImage("Images/character1.png")
  characterImg2 = loadImage("Images/character2.png")
  sunImg = loadImage("Images/Sun.png")
  alienImg = loadImage("Images/Alien.png")
  coinImg = loadImage("Images/Coin.png")
  AlienSound = loadSound("Ufo.mp3")
}

function setup() {
  createCanvas(displayWidth,displayHeight/2)

if(g===100){
  ground = createSprite(400,250,100,5)
  ground.addImage(groundImg)

  invGround=createSprite(400,ground.y+20,1000,5)
  invGround.shapeColor = "white"

  character = createSprite(100,ground.y-35,20,50)
  character.addImage(characterImg)
  character.scale=0.5

  sun = createSprite(1300,70,50,50)
  sun.addImage(sunImg)
  sun.scale = 0.6

  obstaclesGroup = new Group()
  CoinGroup = new Group()
  coinText = 0
}

game = new Game()
end = new End()
play = new Play()
}

function draw() {
  background("white")
  play.display();
  
  if(g===100){
    text("Distance Covered: "+ score, 1100,50)
    text("Coins collected:"+coinText,1000,50)
  
    if(keyDown("space") && character.y >= 198){
      character.velocityY = -12
    }
  
    if(obstaclesGroup.isTouching(character)){
      g = 1
  }else if(CoinGroup.isTouching(character)){
    coinText = coinText+1
    CoinGroup.destroyEach()
  }
  
    if(coinText%20===0&&coinText>0){
      ground.velocityX = 0
      character.velocityX = 0
      character.velocityY = 0
      obstaclesGroup.setVelocityXEach(0)
      obstaclesGroup.setLifetimeEach(-1)
      CoinGroup.setVelocityXEach(0)
      g = 3
      groundspeed = ground.velocityY
      characterspeed = character.velocityY
      game.display()
      }
  
  if(g===0){
    character.velocityY = character.velocityY + 0.8
    character.collide(invGround)
    ground.velocityX = ground.velocityX-0.1
    
    if (ground.x < 200){
      ground.x = ground.width/2
    }
   
    var r = Math.round(random(1,2))
    // if(r===1){
    //   spawnObstacles()
    // }else if(r===2){
      spawnCoin()
    // }
    score = score + Math.round(getFrameRate()/60)
  }
  
    if(g===1){
      ground.velocityX = 0
      character.velocityY = -0.9
      obstaclesGroup.setVelocityXEach(0)
      obstaclesGroup.setLifetimeEach(-1)
      CoinGroup.setVelocityXEach(0)
      sun.addImage(alienImg)
      background("black")
      invGround.x = 100000
      AlienSound.play()
      g = 2
      end.display()
    }
    if(g===2){
      background("black")
    }
  }
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(1400,ground.y-35,50,50)
    obstacle.velocityX = -(6 + 3*score/100)
    var rand = Math.round(random(1,6))
    switch(rand) {
      case 1: obstacle.shapeColor = "green"
              break
      case 2: obstacle.shapeColor = "red"
              break
      case 3: obstacle.shapeColor = "orange"
              break
      case 4: obstacle.shapeColor = "purple"
      default: break
    }
    obstacle.scale = 0.4
    obstacle.lifetime = 1000
    obstaclesGroup.add(obstacle)
  }
}

function spawnCoin() {
  if(frameCount % 100 === 0) {
    var Coin = createSprite(1400,ground.y-35,50,50)
    Coin.velocityX = -(6 + 3*score/100)
    Coin.addImage(coinImg)
    Coin.scale = 0.4
    Coin.lifetime = 1000
    CoinGroup.add(Coin)
  }
}