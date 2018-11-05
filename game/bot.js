function Bot() {
    Paddle.call(this);
    this.name = "bot";
    this.auto = true;   // set this to false to work with manual control
    this.speed = 5;
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
    var self = this;
    
    // Bot will follow the ball (simple AI)
    if (self.y < game.ball.y) {
      self.yVelocity = this.speed;
    } else if (self.y > game.ball.y) {
      self.yVelocity = -this.speed;
    }
  
    Paddle.prototype.update.apply(this, arguments);
  }