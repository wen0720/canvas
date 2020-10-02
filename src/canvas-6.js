const Vector = function(x, y) {
  this.x = x || 0
  this.y = y || 0
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


const Snake = function() {
  this.body = []
  this.maxLength = 5
  this.head = new Vector()
  this.speed = new Vector(1, 0)
  this.direction = 'right'
}

Snake.prototype.update = function() {
  const newHead = this.head.add(this.speed)
  this.body.push(this.head) // 舊的頭推到身體裡
  this.head = newHead
  // 不確定為什麼是用 while
  while (this.body.length > this.maxLength) {
    this.body.shift() //
  }
}

Snake.prototype.setDirection = function(dir) {
  let target
  if (dir === 'Up') {
    target = new Vector(0, -1)
  }
  if (dir === 'Down') {
    target = new Vector(0, 1)
  }
  if (dir === 'Left') {
    target = new Vector(-1, 0)
  }
  if (dir === 'Right') {
    target = new Vector(1, 0)
  }

  if (!target.equal(this.speed.mul(-1))) {
    this.speed = target
  }
}

Snake.prototype.checkBoundry = function (gameWidth) {
  console.log(this.head.x, this.head.y)
  const isHeadOverX = this.head.x > gameWidth || this.head.x < 0
  const isHeadOverY = this.head.y > gameWidth || this.head.y < 0
  return isHeadOverX || isHeadOverY
}


const Game = function() {
  this.bw = 12 // 每個格子的寬度
  this.bs = 2 // 每個格子的間距
  this.gameWidth = 40 // 寬跟高總共 40 格
  this.speed = 30
  this.snake = null
  this.food = []
  this.start = false
}

// Game.prototype

Game.prototype.init = function() {
  this.canvas = document.getElementById('myCanvas')
  this.ctx = this.canvas.getContext('2d')
  this.canvas.width = this.bw * this.gameWidth + this.bs * (this.gameWidth - 1)
  this.canvas.height = this.canvas.width
  this.snake = new Snake()
  this.generateFood()
  this.render()
  this.update()
}

Game.prototype.startGame = function() {
  this.start = true
  this.snake = new Snake()
  document.querySelector('.panel').classList.add('none')
}

Game.prototype.endGame = function() {
  document.querySelector('h1').textContent = `score: ${(this.snake.maxLength - 5) * 10}`
  document.querySelector('.panel').classList.remove('none')
  this.start = false
}

Game.prototype.getPosition = function(x, y) {
  return new Vector(
    this.bw*x + (x-1)*this.bs,
    this.bw*y + (y-1)*this.bs,
  )
}

Game.prototype.drawBlock = function(v, color) {
  this.ctx.fillStyle = color
  const pos = this.getPosition(v.x, v.y)
  this.ctx.fillRect(pos.x, pos.y, this.bw, this.bw)
}

Game.prototype.drawEffect = function(x, y) {
  let r = 2
  const pos = this.getPosition(x, y)
  const effect = () => {
    r++
    this.ctx.beginPath()
    this.ctx.arc(pos.x+this.bw/2, pos.y+this.bw/2, r, 0, 2*Math.PI)
    this.ctx.strokeStyle = `rgba(255, 0, 0, ${ (100 - r) / 100 })`
    this.ctx.stroke()

    if (r <= 100) {
      requestAnimationFrame(effect)
    }
  }
  requestAnimationFrame(effect)
}

Game.prototype.render = function() {
  this.ctx.fillStyle = "rgba(0,0,0,0.3)"
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

  for (let i=0; i<this.gameWidth; i++) {
    for (let y=0; y<this.gameWidth; y++) {
      this.drawBlock(new Vector(i, y), 'rgba(255,255,255,0.05)')
    }
  }

  this.snake.body.forEach((snakePos, idx) => {
    this.drawBlock(snakePos, '#fff')
  })

  this.food.forEach((p) => {
    this.drawBlock(p, 'red')
  })

  requestAnimationFrame(() => {
    this.render()
  })
}

Game.prototype.generateFood = function() {
  const x = parseInt(Math.random()*this.gameWidth)
  const y = parseInt(Math.random()*this.gameWidth)
  this.food.push(new Vector(x, y))
  this.drawEffect(x, y)
}

Game.prototype.update = function() {
  if (this.start) {
    this.snake.update()
  }

  // 食物是否被吃到
  this.food.forEach((item, i) => {
    if(item.equal(this.snake.head)) {
      this.snake.maxLength++
      this.food.splice(i, 1)
      this.generateFood()
    }
  })

  this.snake.body.forEach(body => {
    if (body.equal(this.snake.head)) {
      this.endGame()
    }
  })

  if(this.snake.checkBoundry(this.gameWidth)) {
    console.log('碰')
    this.endGame()
  }

  setTimeout(() => {
    // 預定下一次的更新
    this.update()
  }, 30)
}

const game = new Game()
game.init()

document.querySelector('body').addEventListener('keydown', (e) => {
  const direction = e.key.replace('Arrow', '')
  if (direction === 'Right' || direction === 'Up' || direction === 'Left' || direction === 'Down') {
    game.snake.setDirection(direction)
  }
})

window.game = game
