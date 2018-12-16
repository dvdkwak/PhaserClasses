var Sprite = new Phaser.Class({

  Extends: Phaser.GameObjects.Sprite,


  initialize:

  function Sprite(scene, x, y, texture)
  {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture);
    scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
  }

});
