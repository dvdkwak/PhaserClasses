var NPC = new Phaser.Class({

  Extends: Sprite,


  initialize:

  function NPC(scene, x, y, texture)
  {
    Sprite.call(this, scene, x, y, texture); // calling the initialize of the Sprite class
    this.setSize(32, 32);                    // setting the standard size of an NPC
    this.setSpeed(100);                      // setting the standard speed of an NPC
    this.isMoving = false;                   // keeping track wether the NPC is moving or not
    this.i = 0;                              // counter to keep track of number of events
    this.setMoveLength(100);                 // setting the standard length of moving in one direction
    this.getMoveLength();                    // calling the getter to enable movement at start of the scene
    this.setIdleTime(100);                   // time a fish has to wait before moving again
    this.setWalkArea(320, 320, x, y);        // creating a default walk area for our NPC
                                             // (scene, height and width of object times 10 and x and y of the object)
    this.setWelcomeText("Hi!");              // setting a text and calling it in the console
    this.setName("A random Dude");           // setting the name of this object (only used for speaking stuff)
  },

  create: function()
  {
    this.setSpawnText(                       // setting the text for when this NPC spawns
"\n _______ " + this.name + " SPAWNED ______\n "); // (called later to enable use of this.name)
    this.saySpawnText();
    this.sayWelcomeText();
  },

  update: function()
  {
    if(!this.isMoving){
      if(this.idleTimer < this.idleTime){
        this.stopMove();
        this.idleTimer++;
      }else{
        this.isMoving = this.move();
      }
    }else{
      if(this.i < this.moveLength){
        this.i++;
      }else{
        // reset isMoving
        this.isMoving = false;
        this.i = 0;
        this.idleTimer = 0;
        this.getMoveLength();
      }
    }
  }, // end of update()


  // function to calculate the nect direction
  newDirection: function()
  {
    let directions = []; // is gonna be a container for possible direction (8-dir system)
    if(this.body.y <= this.walkArea.top){ // went North
      if(this.body.x <= this.walkArea.left){
        directions = [3, 3, 3, 3,
                      3, 3, 3, 3,
                      2, 2, 2, 2,
                      4, 4, 4, 4];
      }else if(this.body.x >= this.walkArea.right){
        directions = [5, 5, 5, 5,
                      5, 5, 5, 5,
                      3, 3, 3, 3,
                      4, 4, 4, 4];
      }else{
        directions = [3, 3, 3, 3,
                      4, 4, 4, 4,
                      5, 5, 5, 5,
                      4, 4, 4, 4];
      }
    }else
    if(this.body.y >= this.walkArea.bottom){ // went South
      if(this.body.x <= this.walkArea.left){
        directions = [1, 1, 1, 1,
                      1, 1, 1, 1,
                      2, 2, 2, 2,
                      0, 0, 0, 0];
      }else if(this.body.x >= this.walkArea.right){
        directions = [7, 7, 7, 7,
                      7, 7, 7, 7,
                      0, 0, 0, 0,
                      6, 6, 6, 6];
      }else{
        directions = [0, 0, 0, 0,
                      1, 1, 1, 1,
                      7, 7, 7, 7,
                      0, 0, 0, 0];
      }
    }else
    if(this.body.x <= this.walkArea.left){
      directions = [1, 1, 1, 1,
                    2, 2, 2, 2,
                    3, 3, 3, 3,
                    2, 2, 2, 2];
    }else if(this.body.x >= this.walkArea.right){
      directions = [5, 5, 5, 5,
                    6, 6, 6, 6,
                    7, 7, 7, 7,
                    6, 6, 6, 6];
    }else{
      directions = [0, 0, 1, 1,
                    2, 2, 3, 3,
                    4, 4, 5, 5,
                    6, 6, 7, 7];
    }
    let randomNumber = Math.floor(Math.random() * 16); // random number from 0 and 15
    let dir = directions[randomNumber];
    return dir;
  }, // end of newDirection()


  // function which will execute the movement of the NPC
  move: function()
  {
    let dir = this.newDirection(); // firs get a direction to go

    switch(dir){
      case 0:
        this.body.setVelocity(0, -this.speed); // North
        break;
      case 1:
        this.body.setVelocity(this.speed, -this.speed); // North East
        break;
      case 2:
        this.body.setVelocity(this.speed, 0); // East
        break;
      case 3:
        this.body.setVelocity(this.speed, this.speed); // South East
        break;
      case 4:
        this.body.setVelocity(0, this.speed); // South
        break;
      case 5:
        this.body.setVelocity(-this.speed, this.speed); // South West
        break;
      case 6:
        this.body.setVelocity(-this.speed, 0); // West
        break;
      case 7:
        this.body.setVelocity(-this.speed, -this.speed); // North West
        break;
    }

    this.body.velocity.normalize().scale(this.speed); // making the diagonal speed the same as orthogonal nailed it :3

    return true;
  }, // end of move()

  sayWelcomeText: function()
  {
    console.log(this.name + ": " + this.welcomeText);
  },

  saySpawnText: function()
  {
    console.log(this.spawnText);
  },



  // setters

  setSize: function(w, h)
  {
    this.body.setSize(w, h);
  },

  setSpeed: function(s)
  {
    this.speed = s;
  },

  setMoveLength: function(sl, r = null, steps = null)
  {
    // when r is set, now the swimlength will be random between sl and r
    if(r > sl){ // check if r is bigger than sl
      this.moveLengthMax = r;
      this.moveLengthMin = sl;
      if(steps > 0){
        this.moveSteps = steps;
      }else{
        this.moveSteps = 1;
      }
      this.moveLengthRandom = true;
      return true;
    }
    this.moveLengthMin = sl;
    this.moveLengthRandom = false;
    return false;
  },

  setIdleTime: function(t)
  {
    this.idleTime  = t; // the time to be idle
    this.idleTimer = t; // setting the idle timer default at the same value to prevent waiting at the start
  },

  stopMove: function()
  {
    this.body.setVelocity(0, 0);
  },

  setWalkArea: function(width, height, x = null, y = null)
  {
    // first remove old made sprites of the swimming area
    if(typeof this.walkArea != "undefined"){
      this.walkArea.destroy();
    }

    if(x && y){
      this.walkArea = this.scene.physics.add.sprite(x, y).setSize(width, height);
    }else{
      this.walkArea = this.scene.physics.add.sprite(this.body.x, this.body.y).setSize(width, height);
    }

    this.walkArea.top    = (this.walkArea.body.y - this.walkArea.body.height/2);
    this.walkArea.bottom = (this.walkArea.body.y + this.walkArea.body.height/2);
    this.walkArea.left   = (this.walkArea.body.x - this.walkArea.body.width/2);
    this.walkArea.right  = (this.walkArea.body.x + this.walkArea.body.width/2);
  },

  setWelcomeText: function(text)
  {
    this.welcomeText = text;
  },

  setName: function(name)
  {
    this.name = name;
  },

  setSpawnText: function(text)
  {
    this.spawnText = text;
  },


  // getters (some need a function to get the properties since you can set them to random)
  getMoveLength: function()
  {
    if(this.moveLengthRandom){
      this.moveLength = Math.floor(Math.random() * ( 1 + (this.moveLengthMax-this.moveLengthMin) ) + this.moveLengthMin)*this.moveSteps;
    }else{
      this.moveLength = this.moveLengthMin;
    }
    return this.moveLength;
  }

});
