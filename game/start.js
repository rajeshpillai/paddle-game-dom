if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    });
}


var canvas = document.getElementById("game"),
  game = new Game(canvas);

game.entities = [
  game.ball = new Ball(),
  game.player = new Player(),
  game.bot = new Bot(),
  new Background(),
  //new Ball(),
  //new Ball()
];

game.start();
canvas.focus();