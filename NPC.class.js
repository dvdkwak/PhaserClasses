var Fish = new Phaser.Class({

  Extends: Sprite,


  initialize:

  function Fish(scene, x, y, texture)
  {
    Sprite.call(this, scene, x, y, texture);
    this.setSize(32, 32);     // setting the standard size of an NPC
    this.setSpeed(100);        // setting the standard speed of an NPC
    this.isMoving = false;    // keeping track wether the NPC is moving or not
    this.i = 0;               // counter to keep track of number of events
    this.setMoveLength(100);   // setting the standard length of moving in one direction
    this.setIdleTime(100);    // time a fish has to wait before moving again
    console.log("\n Hello! \n I am an NPC!");
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
      }
    }
  }, // end of update()


  // function to calculate the nect direction
  newDirection: function()
  {
    let directions = []; // is gonna be a container for possible direction (8-dir system)
    if(this.body.y <= this.body.height){
      directions = [4, 4, 4, 4,
                    4, 4, 4, 4,
                    4, 4, 4, 4,
                    4, 4, 4, 4];
    }else if(this.body.y >= (window.innerHeight-this.body.height)){
      directions = [0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0];
    }else if(this.body.x <= this.body.width){
      directions = [2, 2, 2, 2,
                    2, 2, 2, 2,
                    2, 2, 2, 2,
                    2, 2, 2, 2];
    }else if(this.body.x >= (window.innerWidth-this.body.width)){
      directions = [6, 6, 6, 6,
                    6, 6, 6, 6,
                    6, 6, 6, 6,
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




  // setters

  setSize: function(w, h)
  {
    this.body.setSize(w, h);
  },

  setSpeed: function(s)
  {
    this.speed = s;
  },

  setMoveLength: function(sl)
  {
    this.moveLength = sl;
  },

  setIdleTime: function(t)
  {
    this.idleTime = t; // the time to be idle
    this.idleTimer = t; // setting the idle timer default at the same value to prevent waiting at the start
  },

  stopMove: function()
  {
    this.body.setVelocity(0, 0);
  }

});
