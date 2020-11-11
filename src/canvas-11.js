import * as dat from 'dat.gui'

//環境變數
const updateFPS = 30
let time = 0
const bgColor = 'rgba(0,0,0,0.5)'
let ww, wh


// 控制
const controls = {
  freq: 0.02,
  amp: 30,
  noise: 30,
}

const gui = new dat.GUI()
gui.add(controls, 'freq', 0, 1).step(0.01).onChange(function(value){})
gui.add(controls, 'amp', 0, 30).step(1).onChange(function(value){})
gui.add(controls, 'noise', 1, 150).step(1).onChange(function(value){})

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


function draw() {
  // 清空背景
  ctx.fillStyle = bgColor
  ctx.fillRect(0,0,ww,wh)

  ctx.beginPath()
    for(let i=0; i<ww; i++) {
      const deg = controls.freq * i + time/20 // 出現一個完整的 sin 波是 2pi = 6.28
      const y = controls.amp * Math.sin(deg)
      const nose = controls.noise * Math.random()
      ctx.lineTo(i, nose + y + wh/2)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle="rgba(255, 255, 255, 0.1)"
    ctx.stroke()

  ctx.beginPath()
    for(let i=0; i<wh; i++) {
      const angle = i * controls.freq + time/20
      const x = controls.amp * Math.sin(angle) // 角度帶入 sin()，就是在計算 x 的偏移量
      ctx.lineTo(ww/2 + x, i)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.stroke()


  ctx.beginPath()
    for(let i=0; i<wh; i++) {
      const angle = i * controls.freq + time/20
      const x = controls.amp * Math.sin(angle) * -1 // 角度帶入 sin()，就是在計算 x 的偏移量
      ctx.lineTo(ww/2 + x, i)
    }
    ctx.lineWidth = 2
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.stroke()

  ctx.beginPath()
    for(let i=0; i<wh; i+=15) {
      const angle = i * controls.freq + time/20
      const x = controls.amp * Math.sin(angle) * -1 // 角度帶入 sin()，就是在計算 x 的偏移量
      ctx.arc(ww/2 + x, i, 4, 0, 2*Math.PI)
      ctx.closePath()
    }
    ctx.fillStyle = '#fff'
    ctx.fill()


  requestAnimationFrame(draw)
}

initCanvas()
draw()
setInterval(() => {
  update()
}, 1000/30)
