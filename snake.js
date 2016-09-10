function Snake(canvas) {
  this.body = [];
  this.initLength = 5;
  this.direction = 'right';
  for (let i = this.initLength - 1; i >= 0; i--) {
    this.body.push({x : i, y : 0});
  }

  this.hx = this.body[0].x;
  this.hy = this.body[0].y;
  let ctx = canvas.getContext("2d");
  this.foodPos = undefined;

  this.drawSnake = function () {
    for (let i  = 0; i < this.body.length; i++) {
      let ele = this.body[i];
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      ctx.fillStyle = 'blue';
      ctx.rect(ele.x * 10, ele.y * 10, 10, 10);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
  };

  this.moveSnake = function() {
    if (this.hx === this.foodPos[0] && this.hy === this.foodPos[1]) {
      this.body.unshift({x: this.foodPos[0], y: this.foodPos[1]});
      this.foodPos = undefined;
    }
    else {
      // tail cell
      let tail = this.body.pop();
      // assign the position of the tail to incremented head
      tail.x = this.hx;
      tail.y = this.hy;
      this.body.unshift(tail);
    }
  };

  this.currentIncrement = function() {
    if (this.direction === 'right') {
      this.hx++;
    }
    else if(this.direction === 'left') {
      this.hx--;
    }
    else if(this.direction === 'up') {
      this.hy--;
    }
    else if(this.direction === 'down') {
      this.hy++;
    }
  };

  this.keyDownHandler = function(e) {
    if (e.keyCode === 37 && this.direction !== 'right') {
      this.direction = 'left';
    }
    else if(e.keyCode === 39 && this.direction !== 'left') {
      this.direction = 'right';
    }
    else if(e.keyCode === 38 && this.direction !== 'down') {
      this.direction = 'up';
    }
    else if(e.keyCode === 40 && this.direction !== 'up') {
      this.direction = 'down';
    }
  };

  this.hitWall = function() {
    if (this.hx > canvas.width / 10 || this.hx < -1) {
      alert('Game Over');
      document.location.reload();
    }
    else if (this.body[0].x === canvas.width / 10 || this.body[0].x < 0) {
      alert('Game Over');
      document.location.reload();
    }
    else if(this.body[0].y === canvas.height / 10 || this.body[0].y < 0) {
      alert('Game Over');
      document.location.reload();
    }
    else if ( this.hy > canvas.height / 10 || this.hy < -1) {
      alert('Game Over');
      document.location.reload();
    }
  };

  this.eatSelf = function() {
    let currentPos = [];
    for (let i =0; i < this.body.length; i++) {
      currentPos.push([this.body[i].x, this.body[i].y]);
    }
    let nextPos = [this.hx, this.hy];
    if (this.arrayIncludes(currentPos, nextPos)) {
      alert('Game Over');
      document.location.reload();
    }
  };

  this.randPos = function() {
    let currentPos = [];
    for (let i =0; i < this.body.length; i++) {
      currentPos.push([this.body[i].x, this.body[i].y]);
    }
    while (true) {
      let newX = Math.floor((Math.random() * (canvas.width/10 - 0 )) + 0);
      let newY = Math.floor((Math.random() * (canvas.height/10 - 0 )) + 0);
      let newPos = [newX, newY];
      if (!this.arrayIncludes(currentPos, newPos)) {
        return newPos;
      }
    }
  };

  this.setFoodPos = function() {
    if (!this.foodPos) {
      this.foodPos = this.randPos();
    }
  };

  this.drawFood = function() {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'red';
    ctx.rect(this.foodPos[0] * 10, this.foodPos[1] * 10, 10, 10);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  };

  this.arrayIncludes = function(array, el) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === el[0] && array[i][1] === el[1]) {
        return true;
      }
    }
    return false;
  };
}

module.exports = Snake;


// this.body = [{x:4, y:0}, {x:3, y:0}, {x:2, y:0}, {x:1, y:0}]
