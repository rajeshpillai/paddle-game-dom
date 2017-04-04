function Paddle() {
  Entity.call(this);

  this.width = 20;
  this.height = 100;
  this.score = 0;

  this.y = game.height / 2 - this.height; // center vertically
}

Paddle.prototype =    Object.create(Entity.prototype);
Paddle.prototype.constructor = Paddle;

Paddle.prototype.update = function () {
  Entity.prototype.update.apply(this, arguments);
  
  // y will always stay below or equal to 0
  this.y = Math.min(Math.max(this.y, 0), game.height - this.height);
}

Paddle.prototype.moveTo = function (player) {
  this.x = player.x;
  this.y = player.y;
  this.xVelocity = player.xVelocity;
  this.yVelocity = player.yVelocity;
};


function Player() {
  Paddle.call(this);
  this.x = 20;
  this.name = "player";
  
  var player = document.createElement("div");
  player.style.position = "absolute";
  player.style.width = this.width + 'px';
  player.style.height = this.height + 'px';
  player.style.left = this.x + 'px';
  player.style.top = this.y + 'px';
  player.setAttribute("id", "player");
  this.player = player;
  
  game.canvas.append(player);
}

Player.prototype = Object.create(Paddle.prototype);
Player.prototype.constructor = Player;

Player.prototype.draw = function () {
  var player = this.player;
  player.style.left = this.x +'px';
  player.style.top = this.y +'px';
}


Player.prototype.update = function () {
  var self = this;
  var speed = 10;

  if (game.keyPressed.up) {
    this.yVelocity = -speed;
  } else if (game.keyPressed.down) {
    this.yVelocity = speed;
  } else {
    this.yVelocity = 0; // stop moving if no keys pressed
  }

  Paddle.prototype.update.apply(this, arguments);
}

function Bot() {
  Paddle.call(this);
  this.name = "bot";
  this.auto = true;   // set this to false to work with manual control
  this.x = game.width - this.width - 20; // 20 margin
  
  var player = document.createElement("div");
  player.style.position = "absolute";
  player.style.width = this.width + 'px';
  player.style.height = this.height + 'px';
  player.style.left = this.x + 'px';
  player.style.top = this.y + 'px';
  player.setAttribute("id", "bot");
  
  this.player = player;
  game.canvas.append(player);
}

Bot.prototype = Object.create(Paddle.prototype);
Bot.prototype.constructor = Bot;

Bot.prototype.draw = function () {
  var player = this.player;
  player.style.left = this.x +'px';
  player.style.top = this.y +'px';
}


Bot.prototype.update = function () {
  var speed = 5; // speed is set to lower than human controlled paddle
  var self = this;
  
  // Bot will follow the ball (simple AI)
  if (self.y < game.ball.y) {
    self.yVelocity = speed;
  } else if (self.y > game.ball.y) {
    self.yVelocity = -speed;
  }

  Paddle.prototype.update.apply(this, arguments);
}