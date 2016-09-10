const Snake = require('./snake');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var snake = new Snake(canvas);

document.addEventListener("keydown", snake.keyDownHandler.bind(snake), false);

function drawBorder() {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.rect(0, 0, width, height);
  ctx.stroke();
  ctx.closePath();
}

function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBorder();
  snake.drawSnake();
  snake.setFoodPos();
  snake.drawFood();
  snake.currentIncrement();
  snake.hitWall();
  snake.eatSelf();
  snake.moveSnake();


}

setInterval(init, 100);
