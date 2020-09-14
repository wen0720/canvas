const Vector = function(x, y) {
  this.x = x
  this.y = y
}

Vector.prototype.add = function(v) {
  return new Vector(this.x+v.x, this.y+v.y)
}
Vector.prototype.sub = function(v) {
  return new Vector(this.x-v.x, this.y-v.y)
}
Vector.prototype.mul = function(s) {
  return new Vector(this.x*s, this.y*s)
}
Vector.prototype.length = function () {
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
}
Vector.prototype.set = function(x, y) {
  this.x = x
  this.y = y
}
Vector.prototype.equal = function(v) {
  return this.x === v.x && this.y === v.y
}
Vector.prototype.clone = function() {
  return new Vector(this.x, this.y)
}

const Game = function() {
  this.bw = 12 // 每個格子的寬度
  this.bs = 2 // 每個格子的間距
  this.gameWidth = 40 // 寬跟高總共 40 格
  this.speed = 30
  this.snake - null
  this.food = []
}

// Game.prototype

Game.prototype.init = function() {
  this.canvas = document.getElementById('myCanvas')
  this.ctx = this.canvas.getContext('2d')
  this.canvas.width = this.bw * this.gameWidth + this.bs * (this.gameWidth - 1)
  this.canvas.height = this.canvas.width
  this.render()
}

Game.prototype.render = function() {
  this.ctx.fillStyle = "rgba(0,0,0,0.3)"
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

  for (let i=0; i<this.gameWidth; i++) {
    for (let y=0; y<this.gameWidth; y++) {
      this.ctx.rect(i*this.bw+i*this.bs, y*this.bw+y*this.bs, this.bw, this.bw)
    }
  }
  this.ctx.fillStyle="rgba(255,255,255,0.3)"
  this.ctx.fill()
}

Game.prototype.update = function() {

}

const game = new Game()
game.init()
