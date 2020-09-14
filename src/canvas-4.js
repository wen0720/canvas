console.clear()

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// 會由右指定過來
const ww = canvas.width = window.innerWidth
const wh = canvas.height = window.innerHeight




const Vector = function (x, y) {
  this.x = x
  this.y = y
}

Vector.prototype.add = function (v) {
  return new Vector(this.x + v.x, this.y+v.y)
}

Vector.prototype.move = function (v) {
  this.x = v.x
  this.y = v.y
  return this
}

Vector.prototype.sub = function (v) {
  return new Vector(this.x - v.x, this.y - v.y)
}

Vector.prototype.toString = function (v) {
  return `(${this.x}, ${this.y})`
}

// s 為純量的意思
Vector.prototype.mul = function (s) {
  return new Vector(this.x*s, this.y*s)
}

// 長度
Vector.prototype.length = function () {
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
}

Vector.prototype.set = function (x, y) {
  this.x = x
  this.y = y
  return this
}

Vector.prototype.equal = function (v) {
  return (this.x === v.x) && (this.y === v.y)
}

Vector.prototype.clone = function () {
  return new Vector(this.x, this.y)
}

Vector.prototype.angle = function () {
  return Math.atan2(this.y, this.x)
}

const a = new Vector(4, 0)
const b = new Vector(0, 3)
const c = a.add(b)

console.log(a, b)
console.log(a.add(b))
console.log(`${a}+${b}`)

console.log(`${a}x2=${a.mul(2)}`)
console.log('c的長度' + c.length())



function drawVector(v, trans) {
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.save()
    ctx.rotate(v.angle())
    ctx.fillText(v, v.length()/2, 10)
    ctx.lineTo(v.length(), 0)
    ctx.lineTo(v.length()-5, -4)
    ctx.lineTo(v.length()-5, 4)
    ctx.lineTo(v.length(), 0)
    console.log(v.length())
    ctx.strokeStyle="black"
    ctx.lineWidth = 3
    ctx.stroke()
  ctx.restore()
  if (trans) {
    ctx.translate(v.x, v.y)
  }
}

let mosPos = { x:0, y:0 }


canvas.addEventListener('mousemove', (e) => {
  // console.log(mosPos)
  mosPos = { x: e.x, y: e.y}

})

function draw() {
  // const v = new Vector(250, 0)
  // const v2 = new Vector(0, 200)
  // const v3 = v.add(v2).mul(-1)
  // ctx.translate(ww/2, wh/2)
  // drawVector(v, true)
  // drawVector(v2, true)
  // drawVector(v3, true)

  ctx.clearRect(0, 0, ww, wh)
  ctx.save()
    ctx.translate(ww/2, wh/2)
    let mouse = new Vector(mosPos.x, mosPos.y)
    let md = mouse.sub(new Vector(ww/2, wh/2))
    let unitVector = md.mul(1/md.length()) // 一單位的長度（單位向量）
    drawVector(unitVector.mul(100), false)
  ctx.restore()
}

setInterval(() => {
  draw()
}, 16)



