function Background() {
    this.score_player1 = document.getElementById("score_player1");
    this.score_player2 = document.getElementById("score_player2");

    this.score_player1.style.left = game.width / 2 - 100 + "px";  //game.width * 3 / 8;
    this.score_player1.style.top = 50 + "px";

    this.score_player2.style.left = game.width / 2 + 100 + "px"; //* 5 / 8;
    this.score_player2.style.top = 50 + "px";

}

Background.prototype.draw = function (context) {

    this.score_player1.innerHTML = "ME: " + game.player.score; //  Player score
    this.score_player2.innerHTML = "BOT: " + game.bot.score; // Bot score
}
