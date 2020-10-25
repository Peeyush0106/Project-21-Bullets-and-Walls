//Game Button Class
class GameButton {
  constructor(operator, visible) {
    this.x = 750;
    this.y = 125;
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.width = 100;
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
    this.width = 60;
    this.height = height;
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
  }
  display() {
    fill(80, 80, 80);
    rect(this.x, this.y, this.width, this.height);
  }
}

//Car Class
class Car {
  constructor() {
    this.x = 50;
    this.y;
    this.weight;
    this.speed = Math.round(random(55, 90));
    this.deformation = 0;
    this.width = 50;
    this.height = 50;
    this.centerX;
    this.centerY;
    this.fill = "white";
    this.shouldMove = false;
    this.brand;
    this.carName;
  }
  display() {
    rect(this.x, this.y, this.width, this.height);
  }
  setDeformationValue() {
    this.deformation = (0.5 * this.weight * this.speed * this.speed) / 22500;
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
var turbo, viper, gallardo, enzo, start, reset, wall;

var gameState = "Ready";

var turboImage, enzoImage, gallardoImage, viperImage;

//Preload function to load images
function preload() {
  turboImage = loadImage("TurboImage.png");
  enzoImage = loadImage("EnzoImage.png");
  gallardoImage = loadImage("GallardoImage.png");
  viperImage = loadImage("ViperImage.png");
}

//Setup function to define our declared varialbes and do the initial setup
function setup() {
  createCanvas(1600, 400);

  wall = new Wall();

  start = new GameButton("Start", true);
  reset = new GameButton("Reset", false);

  turbo = new Car();
  turbo.brand = "Porsche";
  turbo.carName = "911 996 Turbo";
  turbo.y = 70;
  turbo.weight = Math.round(random(400, 1300));

  viper = new Car();
  viper.brand = "Dodge";
  viper.carName = "Viper";
  viper.y = 150;
  viper.weight = Math.round(random(400, 1300));

  gallardo = new Car();
  gallardo.brand = "Lamborghini"
  gallardo.carName = "Gallardo"
  gallardo.y = 230;
  gallardo.weight = Math.round(random(400, 1300));

  enzo = new Car();
  enzo.brand = "Ferrari";
  enzo.carName = "Enzo";
  enzo.y = 310;
  enzo.weight = Math.round(random(400, 1300));

  turboImage.width = (turboImage.width / 10);
  turboImage.height = (turboImage.height / 10);

  enzoImage.width = (enzoImage.width / 11);
  enzoImage.height = (enzoImage.height / 11);

  gallardoImage.width = (gallardoImage.width / 7);
  gallardoImage.height = (gallardoImage.height / 7);

  viperImage.width = (viperImage.width / 8);
  viperImage.height = (viperImage.height / 8);
}

// Draw function to call functions ans set properties continuously
function draw() {
  background("lightgreen");

  //Set Car's deformations
  turbo.setDeformationValue();
  gallardo.setDeformationValue();
  viper.setDeformationValue();
  enzo.setDeformationValue();

  //When the Cars are ready to move
  if (gameState === 'Ready') {
    start.visible = true;
    start.buttonEnabled = true;
    start.display();

    turbo.reset();
    gallardo.reset();
    viper.reset();
    enzo.reset();
  }

  //Display the wall
  wall.display();

  //When a car is running
  if (gameState === 'Running') {
    //When the moving property of the car is true
    if (turbo.shouldMove) {
      setVelocity(turbo, turbo.speed, 0);
    }

    if (gallardo.shouldMove) {
      setVelocity(gallardo, gallardo.speed, 0);
    }

    if (viper.shouldMove) {
      setVelocity(viper, viper.speed, 0);
    }

    if (enzo.shouldMove) {
      setVelocity(enzo, enzo.speed, 0);
    }

    //Run Cars
    runCar(turbo, gallardo);
    runCar(gallardo, viper);
    runCar(viper, enzo);
    runCar(enzo);
  }

  //When the Cars are stopped when they have crashed
  if (gameState === "Stopped") {
    showDeformationColor(1160, turbo.y - 30, turbo.fill, true);
    showDeformationColor(1160, viper.y - 30, viper.fill, true);
    showDeformationColor(1160, gallardo.y - 30, gallardo.fill, true);
    showDeformationColor(1160, enzo.y - 30, enzo.fill, true);

    showDeformationText(turbo);
    showDeformationText(viper);
    showDeformationText(gallardo);
    showDeformationText(enzo);

    reset.visible = true;
    reset.buttonEnabled = true;
    reset.display();
  }

  //When the restarting of the game conditions of the last moving car, i.e enze become true
  if (restartGameConditions(enzo)) {
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

  //Make the images
  image(turboImage, turbo.x - 25, turbo.y - 65);
  image(viperImage, viper.x - 20, viper.y - 65);
  image(gallardoImage, gallardo.x - 25, gallardo.y - 65);
  image(enzoImage, enzo.x - 25, enzo.y - 70);

  //Show the Car name and brand
  showCarNameAndBrand(turbo);
  showCarNameAndBrand(enzo);
  showCarNameAndBrand(gallardo);
  showCarNameAndBrand(viper);
}

//Show the text deformation of the Car
function showDeformationText(car) {
  fill(rgb(200, 0, 150));
  textSize(30);
  text("Damage: " + Math.round(car.deformation), 950, car.y + 10);
  if (car.deformation === NaN) {
    car.deformation = 0;
  }
}

//Show the color deformation of the Car
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
      turbo.shouldMove = true;
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
function restartGameConditions(lastCar) {
  if (isTouching(lastCar, wall)) {
    return true;
  }
}

//FUnction for showing Car name and Brand
function showCarNameAndBrand(object) {
  text(object.carName + " by " + object.brand, 300, object.y + 20);
}

//Control center for all the cars, controls each of their movement.
function runCar(movingCar, startingCar) {
  if (isTouching(movingCar, wall)) {
    movingCar.shouldMove = false;
    if (startingCar) {
      startingCar.shouldMove = true;
    }
    if (movingCar.deformation <= 100) {
      movingCar.fill = "green";
    }
    else if (movingCar.deformation > 100 && movingCar.deformation < 180) {
      movingCar.fill = "orange";
    }
    else if (movingCar.deformation >= 180) {
      movingCar.fill = "red";
    }

    showDeformationColor(1160, movingCar.y - 30, movingCar.fill, true);
    showDeformationText(movingCar);
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
function setVelocity(car, velocityX, velocityY) {
  car.x += velocityX;
  car.y += velocityY;
  car.setCenterCoordinates();
}