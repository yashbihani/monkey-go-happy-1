var monkey , monkey_running
var banana ,bananaImage, stone, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime;
var PLAY = 1;
var END = 0;
var gameState = 1;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(500,500)
  
//creating monkey
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
  
//creating ground
ground = createSprite(400,350,900,10);
ground.velocityX = -4;
ground.x = ground.width/2;
console.log(ground.x);
  
  survivalTime = 0;
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
//giving background
background(255);
  
  if (gameState === PLAY){
//making the ground infinitely run
if(ground.x<0){
  ground.x = ground.width/2
}
  
//making the monkey jump and 
if(keyDown("space")){
  monkey.velocityY = -10;  
}
  
//making the monkey come down
monkey.velocityY = monkey.velocityY + 0.8;
  
//keeping the monkey collided with the ground
monkey.collide(ground);
 
if(obstacleGroup.isTouching(monkey)){
    gameState = "END";
    ground.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
}
//displaying scores
stroke("white");
textSize(20);
fill("white");
text("Score: "+score,500,50);
  
stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate());
text("Survival Time: "+survivalTime,175,50);

//calling the obstacles and food functions in draw function
spawnFood();
spawnobstacles();  
  }
  
else if (gameState === END){}

drawSprites();
}

function spawnFood(){
if(frameCount % 80 === 0){
//creating food for monkey
banana = createSprite(400,200,10,10);
banana.velocityX = -5; 
banana.y =Math.round(random(120,200));
banana.scale = 0.1;
banana.lifetime = 75;
banana.addImage(bananaImage);  
FoodGroup.add(banana); 
}    
}

function spawnobstacles(){
if(frameCount % 300 === 0){
//creating obstacle for monkey 
stone = createSprite(400,310,10,40);
stone.velocityX = -5;   
stone.scale = 0.2;
stone.lifetime = 75;
stone.addImage(obstacleImage);
obstacleGroup.add(stone);
}   
}
