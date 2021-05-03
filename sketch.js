var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  knifeSound = loadSound("knifeSwoosh.mp3")
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score = score+2
      knifeSound.play();
    }
    
    
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
      }
    
    if(score % 10 === 0  &&  score > 0){
      fruitGroup.setVelocityXEach (-6- (1 *   score / 400) )
    }
    
  }
        
  if (gameState === END){
    
    fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=200;
        knife.y=200;
        knifeSound.play();
    
  }

  
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(200,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,350));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -8;
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(200,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=600;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=-7
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= 7;
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,350));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}