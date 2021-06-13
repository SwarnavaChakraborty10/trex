var trex,trexrun,ground,gimg,ground2,cloud,cloudi;
var cactus,c1,c2,c3,c4,c5,c6,cloudG,cactusG;
var play=0,end=1,gamestate=play,score=0,hs=0;
var trexcol,gover,gover2,restart,restart2;

function preload(){
  trexrun = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  gimg=loadImage("ground2.png");
  cloudi=loadImage("cloud.png");
  c1=loadImage("obstacle1.png");
  c2=loadImage("obstacle2.png");
  c3=loadImage("obstacle3.png");
  c4=loadImage("obstacle4.png");
  c5=loadImage("obstacle5.png");
  c6=loadImage("obstacle6.png");
  
  trexcol=loadAnimation("trex_collided.png");
  
  gover2=loadImage("gameOver.png");
  restart2=loadImage("restart.png");
}

function setup(){
  
  createCanvas(600,200);
  
  trex= createSprite(50,150,10,10);
  trex.addAnimation("abc",trexrun);
  trex.scale=0.5;
  trex.addAnimation("cba",trexcol);
  
  ground=createSprite(300,160,600,5);
  ground.addImage(gimg);
  
  
  ground2=createSprite(50,160,100,5);
  ground2.visible=false;
  
  cloudG=new Group();
  cactusG=new Group();
  
  trex.debug=false;
  trex.setCollider("rectangle",0,0,80,trex.height);
  
  gover=createSprite(300,100,10,10);
  gover.addImage(gover2);
  gover.scale=0.7;
  
  restart=createSprite(300,100,10,10);
  restart.addImage(restart2);
  restart.scale=0.3;
}

                           
function draw(){
  
  background(0);
  
  text("Score:"+score,500,20);
  text("HighScore:"+hs,400,20);
  
  if(score>hs){
    hs=score;
  }
  console.log(getFrameRate());
  
 if (gamestate === play){
   
   trex.changeAnimation("abc",trexrun);
   
   ground.velocityX=-3;
   
   gover.visible=false;
   restart.visible=false;
   
   score=score+Math.round(getFrameRate()/61);
   
   
   if(ground.x<0){
    ground.x=ground.width/2;
  }
   
   if (keyDown("space") && trex.y>143){
    trex.velocityY=-10;
  }
   
   trex.velocityY=trex.velocityY+0.5;
  
  trex.collide(ground2);
  
     
  spawnClouds();
  spawnCactus();
   
   if (trex.isTouching(cactusG)){
     gamestate = end;
   }
   
 }
  
  if (gamestate===end){
    
    ground.velocityX=0;
    trex.velocityY=0;
    gover.visible=true;
    restart.visible=true;
    
    cactusG.setVelocityXEach(0);
    cloudG.setVelocityXEach(0);
    cactusG.setLifetimeEach(-1);
    cloudG.setLifetimeEach(-1);
    
    trex.changeAnimation("cba",trexcol);
    
    if (mousePressedOver(restart)){
      reset();
      
    }   
  }

  drawSprites();
    
}

function reset(){
  gamestate=play;
  score=0;
  cactusG.destroyEach()
  cloudG.destroyEach()
} 

function spawnClouds(){
  if(frameCount%80 === 0){ 
  cloud=createSprite(600,random(8,50),10,10);
  cloud.addImage(cloudi);
  cloud.velocityX= -3;
  cloud.scale=0.5;
    cloudG.add(cloud);
  
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    
    cloud.lifetime=205;
}
}


function spawnCactus(){
  if(frameCount%90 === 0){
    cactus=createSprite(600,147,14,14);
    cactus.velocityX=-5;
    cactus.lifetime=125;
    cactus.scale=0.5;
    cactusG.add(cactus);
    
    var a=Math.round(random(1,6));
    switch(a){
      case 1: cactus.addImage(c1);
        break;
        case 2: cactus.addImage(c2);
        break;
        case 3: cactus.addImage(c3);
        break;
        case 4: cactus.addImage(c4);
        break;
        case 5: cactus.addImage(c5);
        break;
        case 6: cactus.addImage(c6);
        break;
        default: break;
    }
  }
}


