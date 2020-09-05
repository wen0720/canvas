import * as dat from 'dat.gui';

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

let ww = canvas.width = window.innerWidth
let wh = canvas.height = window.innerHeight

window.addEventListener('resize', () => {
  ww = canvas.width = window.innerWidth
  wh = canvas.height = window.innerHeight
})

let ball = null

const gui = new dat.GUI()
const controls = {
  vx: 0,
  vy: 0,
  ay: 0.6,
  fade: 0.99,
  update: true,
  color: '#fff',
  step: function() {
    ball.update()
  },
  FPS: 30
}
gui.add(controls, 'vx', -50, 50).listen().onChange(function(value) {
  ball.v.x = value
})
gui.add(controls, 'vy', -50, 50).listen().onChange(function(value) {
  ball.v.y = value
})
// .step() 給予控制時最小的精度範圍
gui.add(controls, 'ay', -1, 1).step(0.001).listen().onChange(function(value) {
  ball.a.y = value
})

gui.add(controls, 'fade', 0, 1).step(0.01).listen()
gui.add(controls, 'update').listen()
gui.addColor(controls, 'color').listen()
gui.add(controls, 'step') // 在 gui 項會變成一個可以按的按鈕，按一下執行一次 function
gui.add(controls, 'FPS', 1, 120).listen()

const Ball = function() {
  // 位置
  this.p = {
    x: ww/2,
    y: wh/2
  }
  // 速度
  this.v = {
    x: 5,
    y: 0
  }
  // 加速度
  this.a = {
    x: 0,
    y: 0.6
  }
  // 半徑
  this.r = 50
  // 是否拖曳中
  this.dragging = false
}

Ball.prototype.draw = function () {
  ctx.beginPath()
  ctx.save()
    ctx.translate(this.p.x, this.p.y)
    ctx.moveTo(0, 0)
    ctx.fillStyle = controls.color
    ctx.arc(0, 0, this.r, 0, Math.PI*2)
    ctx.fill()
  ctx.restore()
}

Ball.prototype.update = function() {
  if (this.dragging) {
    return
  }
  this.p.x += this.v.x
  this.p.y += this.v.y

  this.v.x += this.a.x
  this.v.y += this.a.y

  // 讓球越彈越小（原理：讓變量越來越小）
  this.v.x *= controls.fade
  this.v.y *= controls.fade

  this.checkBoundary()

  // 更新 dat.gui
  controls.vx = this.v.x
  controls.vy = this.v.y
  controls.ay = this.a.y
}

Ball.prototype.checkBoundary = function() {
  if (this.p.x + this.r > ww) {
    // 把速度的力變為反方向
    console.log('撞右邊')
    this.v.x = -1 * Math.abs(this.v.x)
  }

  if (this.p.y + this.r > wh) {
    console.log('撞下面')
    this.v.y = -1 * Math.abs(this.v.y)
  }

  if (this.p.x - this.r <= 0) {
    console.log('撞左邊')
    this.v.x = Math.abs(this.v.x)
  }

  if (this.p.y - this.r <= 0) {
    console.log('撞上面')
    this.v.y = Math.abs(this.v.y)
  }
}

Ball.prototype.drawV = function () {
  ctx.beginPath()
  ctx.save()
    ctx.translate(this.p.x, this.p.y)
    ctx.scale(3, 3)
    ctx.moveTo(0, 0)
    ctx.lineTo(this.v.x, this.v.y) // 方向速度線
    ctx.strokeStyle = 'blue'
    ctx.stroke()

    ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(this.v.x, 0)
      ctx.strokeStyle = 'red'
      ctx.stroke()
    ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, this.v.y)
      ctx.strokeStyle = 'green'
      ctx.stroke()
  ctx.restore()
}

const ctxPos = {
  x: 0,
  y: 0
}



// 初始化函式
function init () {
  ball = new Ball()
}
init()

function update() {
  if (controls.update) {
    ball.update()
  }
}

setInterval(() => {
  update()
}, 1000/30)

function draw() {
  ctx.fillStyle = 'rgba(0,0,0,.5)'
  ctx.fillRect(0, 0, ww, wh)
  ball.draw()
  ball.drawV()
  // window.requestAnimationFrame(draw)
  setTimeout(() => {
    draw()
  }, 1000/(controls.FPS))
}

draw()
// window.requestAnimationFrame(draw)


// 取 2 點間的距離
function getDistance(point1, point2) {
  const disX = Math.abs(point1.x - point2.x)
  const disY = Math.abs(point1.y - point2.y)
  const disPow = Math.pow(disX, 2) + Math.pow(disY, 2)
  return Math.sqrt(disPow)
}

// 拖曳相關
let mosPos = { x: 0, y: 0}
canvas.addEventListener('mousedown', function (e) {
  mosPos = { x: e.x, y: e.y }
  let dis = getDistance(mosPos, ball.p)
  if (dis < ball.r) {
    ball.dragging = true
  }
})

canvas.addEventListener('mousemove', function (e) {
  let nowPos = { x: e.x, y: e.y }
  if (ball.dragging) {
    // 滑鼠與上一次的位置的變化量
    const dx = nowPos.x - mosPos.x
    const dy = nowPos.y - mosPos.y

    ball.p.x += dx
    ball.p.y += dy

    // console.log(ball.p.x, dx)
    // console.log(ball.p.y, dy)

    ball.v.x = dx // 做出拋出的速度（速度就是位置的變化量，所以這樣做）
    ball.v.y = dy // 做出拋出的速度（速度就是位置的變化量，所以這樣做）

    // 更新滑鼠的位置到目前時刻
    mosPos = nowPos
  }

  let dis = getDistance(nowPos, ball.p)
  console.log(dis)
  if (dis < ball.r) {
    canvas.style.cursor = 'move'
  } else {
    canvas.style.cursor = 'initial'
  }
})

canvas.addEventListener('mouseup', function () {
  ball.dragging = false
})
