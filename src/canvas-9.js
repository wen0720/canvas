import * as dat from 'dat.gui';

//環境變數
var updateFPS = 30
var showMouse = true
var time = 0
var bgColor ="black"
let ww, wh

//控制
var controls = {
  angle: 0,
  length: 200,
  count: 3,
  isShowSubPlanet: true
}
var gui = new dat.GUI()
gui.add(controls,"angle",0,360).step(0.01).onChange(function(value){})
gui.add(controls,"length",0,250).step(0.01).onChange(function(value){})
gui.add(controls, "count", 3, 200).step(1).onChange(function(value){})
gui.add(controls, "isShowSubPlanet")

//------------------------
// Vec2

class Vec2{
  constructor(x,y){
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
var a = new Vec2(3,4)

//------



var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
ctx.circle= function(v,r){
  this.arc(v.x,v.y,r,0,Math.PI*2)
}
ctx.line= function(v1,v2){
  this.moveTo(v1.x,v1.y)
  this.lineTo(v2.x,v2.y)
}


function initCanvas(){
  ww = canvas.width = window.innerWidth
  wh = canvas.height = window.innerHeight
}
initCanvas()

function init(){

}
function update(){
  time++
}
function draw(){
   //清空背景
  ctx.fillStyle=bgColor
  ctx.fillRect(0,0,ww,wh)

  //-------------------------
  //   在這裡繪製

  let degToPi = Math.PI/180 // 換算 1 度是幾 PI

  ctx.beginPath()
    ctx.moveTo(0, wh/2)
    ctx.lineTo(ww, wh/2)
    ctx.moveTo(ww/2, 0)
    ctx.lineTo(ww/2, wh)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.stroke()

  ctx.save()
  // 畫一個圓點
  //   ctx.translate(ww/2, wh/2)
  //   let x = controls.length * Math.cos(controls.angle*degToPi) // Math.cos 吃的是 PI 的角度
  //   let y = controls.length * Math.sin(controls.angle*degToPi) // 邏輯同上
  //   ctx.beginPath()
  //     ctx.arc(x, y, 5, 0, Math.PI*2)
  //     ctx.fillStyle = "white"
  //     ctx.fill()

  // 畫多邊形的點點
    ctx.translate(ww/2, wh/2)
    let points = []
    let angleSpan = Math.PI*2 / controls.count
    for (let i = 0; i < controls.count; i++) {
      let angle = controls.angle*degToPi + i * angleSpan
      let r = controls.length + 360 * i * angleSpan/degToPi/360
      // console.log(r)
      points.push({ angle, r })
    }

    points.forEach((p, pid) => {
      ctx.beginPath()
      let x = p.r * Math.cos(p.angle)
      let y = p.r * Math.sin(p.angle)
      ctx.arc(x, y, 5, 0, Math.PI*2)
      ctx.fillStyle = 'white'
      ctx.fill()

      ctx.moveTo(0,0)
      ctx.lineTo(x, y)
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'
      ctx.stroke()

      if (controls.isShowSubPlanet) {
        const setting = {
          r: 50,
          angle: pid * 10 + time/20
        }
        const sx = setting.r * Math.cos(setting.angle)
        const sy = setting.r * Math.sin(setting.angle)

        ctx.beginPath()
          ctx.arc(x+sx, y+sy, 3, 0, Math.PI*2)
          ctx.fill()
          ctx.moveTo(x, y)
          ctx.lineTo(x+sx, y+sy)
          ctx.strokeStyle = 'rgba(255,255,255,0.8)'
          ctx.stroke()
      }
    })

    function toPoint(r, angle) {
      return new Vec2(r*Math.cos(angle), r*Math.sin(angle))
    }

    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 3
    points.forEach(p => {
      const pxy = toPoint(p.r, p.angle)
      ctx.lineTo(pxy.x, pxy.y)
    })
    ctx.closePath()
    ctx.stroke()

  ctx.restore()

  //-----------------------
  //繪製滑鼠座標

  ctx.fillStyle="red"
  ctx.beginPath()
  ctx.circle(mousePos,2)
  ctx.fill()

  ctx.save()
  ctx.beginPath()
  ctx.translate(mousePos.x,mousePos.y)
    ctx.strokeStyle="red"
    let len = 20
    ctx.line(new Vec2(-len,0),new Vec2(len,0))
    ctx.line(new Vec2(0,-len),new Vec2(0,len))
    ctx.fillText(mousePos,10,-10)
    ctx.stroke()
  ctx.restore()

  //schedule next render

  requestAnimationFrame(draw)
}
function loaded(){
  initCanvas()
  init()
  requestAnimationFrame(draw)
  setInterval(update,1000/updateFPS)
}
window.addEventListener("load",loaded)
window.addEventListener("resize",initCanvas)

//滑鼠事件跟紀錄
var mousePos = new Vec2(0,0)
var mousePosDown = new Vec2(0,0)
var mousePosUp = new Vec2(0,0)

window.addEventListener("mousemove",mousemove)
window.addEventListener("mouseup",mouseup)
window.addEventListener("mousedown",mousedown)
function mousemove(evt){
  mousePos.set(evt.offsetX,evt.offsetY)
  // console.log(mousePos)
}
function mouseup(evt){
  mousePos.set(evt.offsetX,evt.offsetY)
  mousePosUp = mousePos.clone()

}
function mousedown(evt){
  mousePos.set(evt.offsetX,evt.offsetY)
  mousePosDown = mousePos.clone()
}
