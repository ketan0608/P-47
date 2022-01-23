class Game{
display(){
var reduce = createButton("Wanna store the coins")
reduce.position(displayWidth/2,300)
        
var remain = createButton("Play on")
remain.position(displayWidth/2,350)

reduce.mousePressed(function(){
reduce.position(displayWidth/2,1000)
remain.position(displayWidth/2,1500)
})
            
remain.mousePressed(function(){
reduce.position(displayWidth/2,700)
remain.position(displayWidth/2,800)
})
}}