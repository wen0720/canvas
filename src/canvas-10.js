import * as dat from 'dat.gui'

//環境變數
const updateFPS = 30
let time = 0
const bgColor = 'rgba(0,0,0,0.5)'
let ww, wh


// 控制
const controls = {
  startAngle: 77,
  endAngle: 110,
  length: 200
}

const gui = new dat.GUI()
gui.add(controls, 'startAngle', 0, 360).step(1).onChange(function(value){})
gui.add(controls, 'endAngle', 0, 360).step(1).onChange(function(value){})
gui.add(controls, 'length', 1, 200).step(1).onChange(function(value){})

class Vec2{
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  set(x,y){
    this.x =x
    this.y =y
  }
  move(x,y){
    this.x+=x
    this.y+=y
  }
  add(v){
    return new Vec2(this.x+v.x,this.y+v.y)
  }
  sub(v){
    return new Vec2(this.x-v.x,this.y-v.y)
  }
  mul(s){
    return new Vec2(this.x*s,this.y*s)
  }
  get length(){
    return Math.sqrt(this.x*this.x+this.y*this.y)
  }
  set length(nv){
    let temp = this.unit.mul(nv)
    this.set(temp.x,temp.y)
  }
  clone(){
    return new Vec2(this.x,this.y)
  }
  toString(){
    return `(${this.x}, ${this.y})`
  }
  equal(v){
    return this.x==v.x && this.y ==v.y
  }
  get angle(){
    return Math.atan2(this.y,this.x)
  }
  get unit(){
    return this.mul(1/this.length)
  }
}

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

function initCanvas() {
  ww = window.innerWidth
  wh = window.innerHeight
  canvas.width = ww
  canvas.height = wh
}

function update() {
  time++
}

const angleData = [0]
const degToPi = Math.PI/180

function draw() {
  // 清空背景
  ctx.fillStyle = bgColor
  ctx.fillRect(0,0,ww,wh)
  // 畫圓
  ctx.save()
    ctx.translate(ww/2, wh/2)
    const startAngle = Math.cos(controls.startAngle*degToPi)
    const endAngle = Math.sin(controls.endAngle*degToPi)
    const points = Array.from({length: controls.endAngle - controls.startAngle})
      .map((item, idx) => idx + controls.startAngle)
    points.forEach((angle) => {
      const x = controls.length * Math.cos(angle*degToPi)
      const y = controls.length * Math.sin(angle*degToPi)
      ctx.beginPath()
        ctx.rect(x, y, 1, 1)
        ctx.fillStyle = '#fff'
        ctx.fill()
      ctx.closePath()
    })
  ctx.restore()

  ctx.save()
    ctx.translate(ww/2, wh/2)
    ctx.beginPath()
    ctx.arc(ww/10, wh/2 - ww*1.8 - 100, ww*1.8, 77*degToPi, (time+77)*degToPi)
    ctx.lineWidth = 1
    ctx.strokeStyle = 'red'
    ctx.stroke()
  ctx.restore()

  const long = ( time % (110 - 77) )
  ctx.save()
    ctx.translate(ww/2, wh/2)
    ctx.beginPath()
    ctx.arc(ww/10, wh/2 - ww*1.8 - 100, ww*1.8, controls.startAngle*degToPi, controls.endAngle*degToPi)
    ctx.lineWidth = 1
    ctx.strokeStyle = 'blue'
    ctx.stroke()
  ctx.restore()

  requestAnimationFrame(draw)
}

initCanvas()
draw()
setInterval(() => {
  update()
}, 1000/30)
