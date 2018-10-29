
function Ball() {
  Entity.call(this);

  this.width = 20;
  this.height = 20;
  this.ax = 0;

  this.name = "ball";

  var player = document.createElement("div");
  player.style.position = "absolute";
  player.style.width = this.width + 'px';
  player.style.height = this.height + 'px';
  player.style.left = this.x + 'px';
  player.style.top = this.y + 'px';
  player.setAttribute("id", "ball");
  this.player = player;

  game.canvas.append(player);

  this.reset();
}

Ball.prototype = Object.create(Entity.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.moveTo = function (ball) {
  this.x = ball.x;
  this.y = ball.y;
  this.xVelocity = ball.xVelocity;
  this.yVelocity = ball.yVelocity;
};

Ball.prototype.draw = function () {
  var player = this.player;
  player.style.left = this.x + 'px';
  player.style.top = this.y + 'px';
}

Ball.prototype.reset = function () {
  this.x = game.width / 2 - this.width; // center ball horizontally
  this.y = game.height / 2 - this.height; // center ball vertically

  // Set random values if ball goes offscreen
  let min = -5, max = 5;

  this.yVelocity = Math.floor(Math.random() * (max - min + 1) + min);
  this.xVelocity = Math.random() > 0.5 ? 5 : -5; // 50% chance of starting from left or right
}

Ball.prototype.update = function () {
  Entity.prototype.update.apply(this, arguments); // call parent update()

  // If the ball hits the top postion move it down and vice versa
  if (this.y > game.height - this.height || this.y < 0) {
    this.yVelocity *= -1; // switch the direction of the ball
  }

  // If Ball goes offscreen
  if (this.x > game.width) {
    game.player.score += 1; // if Ball goes offscreen means the 'player' has gained points.
    this.reset();
  }

  if (this.x < 0) {
    game.bot.score += 1; // the 'bot' gained  points.
    this.reset();
  }

  var hitter;

  if (this.intersect(game.bot)) {
    hitter = game.bot;
  } else if (this.intersect(game.player)) {
    hitter = game.player;
  }

  // There are chances that hitter variable is not set and hence this condition
  if (hitter) {
    this.xVelocity *= -1.1; // switch the movement / rebound and also increase the speed.
    this.yVelocity *= -1.1;

    // make the game interesting by gaining velocity. 
    // If this is not done, the ball movement after hit will be predictable
    this.yVelocity += hitter.yVelocity / 2;
  }
}