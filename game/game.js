
function Game(canvas) {
  var self = this;
  

  this.width = canvas.offsetWidth;
  this.height = canvas.offsetHeight;
  
  canvas.tabindex = 1;
  
  this.canvas = canvas;

  this.keyPressed = {};

  document.addEventListener("keydown", function (e) {
    handleEvent(e);
  });
  document.addEventListener("keyup", function (e) {
    handleEvent(e);
  });
  
  function handleEvent(e) {
    // Convert the key code to key name
    var keyName = Game.keys[e.which];

    if (keyName) {
      // e.g: 'self.keyPressed.up = true' on keydown
      // Will be set to false on keyup
      self.keyPressed[keyName] = (e.type === "keydown");
      e.preventDefault();

      console.log("KEY: ", self.keyPressed);
    }

  }
}

Game.keys = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

// Game loop
Game.prototype.start = function () {
  var self = this,
    fps = 60,
    interval = 1000 / fps; //  ms per frame

//   setInterval(function () {
//     self.update();
//     self.draw();
//   }, interval);


  (function loop() {
    window.requestAnimationFrame(loop);
    self.update();
    self.draw();
  }());
};

Game.prototype.update = function () {
  var self =this;
  this.entities.forEach(function (entity) {
    if (entity.update) entity.update();
  });
};

Game.prototype.draw = function () {
  var self = this;
  this.entities.forEach(function (entity) {
    if (entity.draw) entity.draw();
  });
};