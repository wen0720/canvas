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

const canvas = document.getElementById('canvas')

class Ball {
  constructor(ctx, x, y, r, color, v = new Vector(-1, 1), a = new Vector(0, -0.05)) {
    this.p = new Vector(x, y)
    this.r = 0
    this.limitR = r
    this.a_r = 5
    this.v = v
    this.a = a
    this.color = color
    this.ctx = ctx
  }

  draw() {
    this.ctx.save()
      if (this.goDestoryBall) {
        this.ctx.beginPath()
        this.ctx.arc(this.p.x, this.p.y, this.r, 0, Math.PI*2)
        if (this.r >= this.limitR*2) {
          this.ctx.fillStyle = 'rgba(0,0,0,0)'
        } else {
          const opacity = (0.6 - (this.r/(this.limitR*2)) * 0.6).toFixed(2)
          this.ctx.fillStyle = `rgba(0,0,0,${opacity})`
        }
        this.ctx.fill()
      } else {
        this.ctx.beginPath()
        this.ctx.arc(this.p.x, this.p.y, this.r, 0, Math.PI*2)
        this.ctx.fillStyle = this.color
        this.ctx.fill()
      }
    this.ctx.restore()
  }

  update(v, a) {
    this.p = this.p.add(v)
    this.v = this.v.add(a)
    if (this.goDestoryBall) {
      this.r = this.r + this.a_r
    } else {
      this.r = this.r >= this.limitR ? this.r : this.r + this.a_r
    }

    this.checkBoundary()
  }

  checkBoundary() {
    if (this.p.x - this.r <= 0) {
      this.v.x = Math.abs(this.v.x)
    }

    if (this.p.y - this.r <= 0) {
      this.goDestoryBall = true
      this.a_r = 20
      // this.v.y = Math.abs(this.v.y)
    }

    if (this.p.x + this.r >= canvas.width) {
      this.v.x = Math.abs(this.v.x) * -1
    }

    if (this.p.y + this.r > canvas.height) {
      this.v.y = Math.abs(this.v.y) * -1
    }
  }

  move() {
    this.update(this.v, this.a)
    this.draw()
  }
}

class Intro {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  init() {
    this.ballsSetting = Intro.getBallsSetting()
    this.balls = []
    this.ballsSetting.forEach((ball, idx) => {
      console.log(ball)
      setTimeout(() => {
        this.balls[idx] = Intro.createBall(this.ctx, ball.x, ball.y, ball.r, 'rgba(0,0,0,.6)', ball.v, ball.a)
      }, ball.initTime)
    })

    requestAnimationFrame(() => {
      this.render()
    })
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.balls.forEach((ball, idx) => {
      ball.draw()
      ball.move()
    })
    requestAnimationFrame(this.render.bind(this))
  }

  static getBallsSetting() {
    return [
      { x: 240, y: 220, r: 100, v: new Vector(0, -0.08), a: new Vector(0, 0), initTime: 0 },
      { x: 180, y: 200, r: 60, v: new Vector(-1, 1), a: new Vector(0, -0.05), initTime: 2000 },
      { x: 190, y: 230, r: 40, v: new Vector(-1, 1), a: new Vector(0, -0.05), initTime: 4000 },
      { x: 160, y: 200, r: 30, v: new Vector(1, 1), a: new Vector(0, -0.05), initTime: 6000 },
      { x: 210, y: 260, r: 20, v: new Vector(-1, 1), a: new Vector(0, -0.05), initTime: 6000 },
    ]
  }

  static createBall (ctx, x, y, r, color, v, a) {
    return new Ball(ctx, x, y, r, color, v, a)
  }
}

// update 球的邏輯
// draw canvas 畫布

const intro = new Intro(canvas)
intro.init()
