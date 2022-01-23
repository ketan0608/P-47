class Play{
    constructor(){}
display(){
 var play = createButton('Play')
 play.position(displayWidth/2,250)

 var coin = createButton('See your coins')
 coin.position(displayWidth/2,300)

 play.mousePressed(function(){
     play.position(10000,700)
     coin.visible = false
     g=100
 })

 coin.mousePressed(function(){
     coin.position(displayWidth/2,700)
     play.position(displayWidth/2,700)
 })
}
}