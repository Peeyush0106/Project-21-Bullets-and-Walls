//Game Button Class
class GameButton {
  constructor(operator, visible) {
    this.x = 750;
    this.y = 125;
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.width = 100;
    this.shouldWidthChange = true;
    this.height = 50;
    this.buttonEnabled = visible;
    this.visible = visible;
    this.operator = operator;
  }
  display() {
    if (this.visible === true) {
      fill("darkblue");
      rect(this.x, this.y, this.width, this.height);
      fill("white");
      textSize(30);
      text(this.operator, (this.x + 10), (((this.y + this.height / 2) + 10)));
    }
  }
  clicked() {
    if (mouseX >= (this.x) && mouseX <= (this.x + this.width)
      && mouseY >= (this.y) && mouseY <= (this.y + this.height)) {
      return true;
    }
  }
}

//Wall Class
class Wall {
  constructor() {
    this.x = 1400;
    this.y = 0;
    this.width = random(22, 83);
    this.height = height;
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.fill = (80, 80, 80);
  }
  display() {
    fill(this.fill);
    rect(this.x, this.y, this.width, this.height);
  }
}

//Bullet Class
class Bullet {
  constructor() {
    this.x = 50;
    this.y;
    this.weight;
    this.speed = random(223, 321);
    this.deformation = 0;
    this.width = 40;
    this.height = 20;
    this.centerX;
    this.centerY;
    this.fill = "white";
    this.visibleFill = rgb(255, 215, 0);
    this.shouldMove = false;
    this.brand;
    this.bulletName;
    this.visible = true;
  }
  display() {
    if (this.visible) {
      fill(this.visibleFill);
      rect(this.x, this.y, this.width, this.height);
    }
  }
  setDeformationValue() {
    this.deformation = Math.round((0.5 * this.weight * this.speed * this.speed) / (wall.width * wall.width * wall.width));
  }
  setWeightValue() {
    this.weight = random(30, 52);
  }
  setSpeedValue() {
    this.speed = random(223, 321);
  }
  setCenterCoordinates() {
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
  }

  reset() {
    this.x = 50;
    this.speed = Math.round(random(55, 90));
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.shouldMove = false;
  }
}

//Global Variables
var start;
var speed;
var bullet1, bullet2, bullet3, bullet4, start, reset, wall;

var bulletSound;

var gameState = "Ready";

var volume;

function preload() {
  bulletSound = loadSound("bulletSound.mp3");
}

//Setup function to define our declared varialbes and do the initial setup
function setup() {
  createCanvas(1600, 400);

  volume = createSlider(0, 1, 0.2, 0.0001);

  bulletSound.setVolume(volume.value());
  bulletSound.shouldPlayBullet1 = true;
  bulletSound.shouldPlayBullet2 = true;
  bulletSound.shouldPlayBullet3 = true;
  bulletSound.shouldPlayBullet4 = true;

  wall = new Wall();

  start = new GameButton("Start", true);
  reset = new GameButton("Reset", false);

  bullet1 = new Bullet();
  bullet1.y = 50;
  bullet1.setSpeedValue();
  bullet1.setWeightValue();

  bullet2 = new Bullet();
  bullet2.y = 130;
  bullet2.setSpeedValue();
  bullet2.setWeightValue();

  bullet3 = new Bullet();
  bullet3.y = 210;
  bullet3.setSpeedValue();
  bullet3.setWeightValue();

  bullet4 = new Bullet();
  bullet4.y = 300;
  bullet4.setSpeedValue();
  bullet4.setWeightValue();
}

// Draw function to call functions ans set properties continuously
function draw() {
  background("lightgreen");

  //Set Bullet's properties
  bullet1.setDeformationValue();
  bullet3.setDeformationValue();
  bullet2.setDeformationValue();
  bullet4.setDeformationValue();

  bulletSound.setVolume(volume.value());

  // bullet1.setWeightValue();
  // bullet3.setWeightValue();
  // bullet2.setWeightValue();
  // bullet4.setWeightValue();

  // bullet1.setSpeedValue();
  // bullet3.setSpeedValue();
  // bullet2.setSpeedValue();
  // bullet4.setSpeedValue();

  //Display the objects
  wall.display();
  bullet1.display();
  bullet3.display();
  bullet2.display();
  bullet4.display();

  //When the Bullets are ready to move
  if (gameState === 'Ready') {
    textSize(25);
    fill("black");
    text("Before starting, please make sure to keep your speaker volume low.." + " Bullets are getting fired!!!!", 275, 325);
     text("You can even change the volume of the sounds in the slider below", 275, 390);
    start.visible = true;
    start.buttonEnabled = true;
    start.display();

    if (wall.shouldWidthChange) {
      wall.width = random(22, 43);
    }
    wall.shouldWidthChange = false;

    bullet1.reset();
    bullet3.reset();
    bullet2.reset();
    bullet4.reset();
  }

  //When a bullet is running
  if (gameState === 'Running') {
    //When the moving property of the bullet is true
    if (bullet1.shouldMove) {
      setVelocity(bullet1, bullet1.speed, 0);
      if (bulletSound.shouldPlayBullet1) {
        bulletSound.play();
      }
      bulletSound.shouldPlayBullet1 = false;
    }

    if (bullet3.shouldMove) {
      setVelocity(bullet3, bullet3.speed, 0);
      if (bulletSound.shouldPlayBullet2) {
        bulletSound.play();
      }
      bulletSound.shouldPlayBullet2 = false;
    }

    if (bullet2.shouldMove) {
      setVelocity(bullet2, bullet2.speed, 0);
      if (bulletSound.shouldPlayBullet3) {
        bulletSound.play();
      }
      bulletSound.shouldPlayBullet3 = false;
    }

    if (bullet4.shouldMove) {
      setVelocity(bullet4, bullet4.speed, 0);
      if (bulletSound.shouldPlayBullet4) {
        bulletSound.play();
      }
      bulletSound.shouldPlayBullet4 = false;
    }

    //Run Bullets
    shootBullet(bullet1, bullet3);
    shootBullet(bullet3, bullet2);
    shootBullet(bullet2, bullet4);
    shootBullet(bullet4);
  }

  //When the Bullets are stopped when they have crashed
  if (gameState === "Stopped") {
    showDeformationColor(1160, bullet1.y, bullet1.fill, true);
    showDeformationColor(1160, bullet2.y, bullet2.fill, true);
    showDeformationColor(1160, bullet3.y, bullet3.fill, true);
    showDeformationColor(1160, bullet4.y, bullet4.fill, true);

    showDeformationText(bullet1, 950, bullet1.y + 10, 30);
    showDeformationText(bullet2, 950, bullet2.y + 10, 30);
    showDeformationText(bullet3, 950, bullet3.y + 10, 30);
    showDeformationText(bullet4, 950, bullet4.y + 10, 30);

    bulletSound.shouldPlayBullet1 = true;
    bulletSound.shouldPlayBullet2 = true;
    bulletSound.shouldPlayBullet3 = true;
    bulletSound.shouldPlayBullet4 = true;

    wall.shouldWidthChange = true;

    reset.visible = true;
    reset.buttonEnabled = true;
    reset.display();
  }

  //When the restarting of the game conditions of the last moving bullet, i.e enze become true
  if (restartGameConditions(bullet4)) {
    gameState = "Stopped";
  }

  //Print line borders
  fill("red");
  textSize(25);

  line(220, 0, 220, 400);
  line(0, 20, 1600, 20);
  line(0, 110, 1600, 110);
  line(0, 190, 1600, 190);
  line(0, 270, 1600, 270);
  line(0, 360, 1600, 360);

  text("Mouse X: " + mouseX, 600, 150);
  text("Mouse Y: " + mouseY, 600, 250);

}

//Show the text deformation of the Bullet
function showDeformationText(bullet, x, y, size) {
  fill(rgb(200, 0, 150));
  textSize(size);
  // text("Damage: " + Math.round(bullet.deformation), 950, bullet.y + 10);
  text("Damage: " + bullet.deformation, x, y);
}

//Show the color deformation of the Bullet
function showDeformationColor(x, y, damageZone, create) {
  if (create === true) {
    fill(damageZone);
    rect(x, y);
  }
}

//When the mouse is clicked. This is an internal p5 function that get called internally.
function mouseClicked() {
  if (start.buttonEnabled) {
    if (start.clicked()) {
      console.log("Start Clicked");
      bullet1.shouldMove = true;
      start.visible = false;
      start.buttonEnabled = false;
      gameState = "Running";
    }
  }

  if (reset.buttonEnabled) {
    if (reset.clicked()) {
      console.log("Reset Clicked");
      gameState = "Ready";
      reset.visible = false;
      reset.buttonEnabled = false;
    }
  }
}

//The restarting game conditions are true or false
function restartGameConditions(lastBullet) {
  if (isTouching(lastBullet, wall)) {
    return true;
  }
}

//FUnction for showing Bullet name and Brand
function showBulletNameAndBrand(object) {
  text(object.bulletName + " by " + object.brand, 300, object.y + 20);
}

//Control center for all the bullets, controls each of their movement.
function shootBullet(movingBullet, startingBullet) {
  if (isTouching(movingBullet, wall)) {
    movingBullet.shouldMove = false;
    movingBullet.x = 1370;
    if (startingBullet) {
      startingBullet.shouldMove = true;
    }
    if (movingBullet.deformation < 10) {
      movingBullet.fill = "green";
    }
    else if (movingBullet.deformation >= 10) {
      movingBullet.fill = "red";
    }

    showDeformationColor(1160, movingBullet.y, movingBullet.fill, true);
    showDeformationText(movingBullet, 950, movingBullet.y + 10, 30);
  }
}

//To check if a object is touching another object
function isTouching(target1, target2) {
  if ((target2.centerX - target1.centerX) <= (target2.width + target1.width) / 2
    && (target1.centerX - (target2.centerX) <= (target2.width + target1.width) / 2)
    && ((target2.centerY - target1.centerY) <= (target2.height + target1.height) / 2)
    && ((target1.centerY - target2.centerY) <= (target2.height + target1.height) / 2)) {
    return true;
  }
}

//Function to set velocity. It is an externally defined function.
function setVelocity(bullet, velocityX, velocityY) {
  bullet.x += velocityX;
  bullet.y += velocityY;
  bullet.setCenterCoordinates();
}