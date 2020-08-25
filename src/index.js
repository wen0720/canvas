import url from './assets/sass/main.scss'

console.log('我在這啊jjj')
console.log('[css 路徑]', url)



console.log(process.env.NODE_ENV)

const canvas = document.getElementById('mycanvas')
const ctx = canvas.getContext('2d')

canvas.width = 400
canvas.height = 400

let time = 0
let mousePos = { x:0, y:0 }

// 一個不斷執行的函式
function draw() {
  time+=2
  // console.log(time)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const gutter = 50
  // 畫格線
  for(let i = 0; i < canvas.width / gutter; i++) {
    const pos = gutter * i
    ctx.moveTo(pos, 0)
    ctx.lineTo(pos, canvas.height)
    ctx.fillText(pos, pos, 10)

    ctx.moveTo(0, pos)
    ctx.lineTo(canvas.width, pos)
    ctx.fillText(pos, 0, pos)
  }
  ctx.strokeStyle = 'rgba(0,0,0,.2)'
  ctx.stroke()

  // 畫基準線
  ctx.beginPath()
  ctx.moveTo(25, 350)
  ctx.lineTo(375, 350)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#000'
  ctx.stroke()

  // 畫最右邊橘色方塊
  ctx.fillStyle = '#ed5a2a'
  ctx.fillRect(300, 300, 50, 50) // 畫一個填滿橘色的矩形
  ctx.strokeRect(300, 300, 50, 50) // 畫一個框線的矩形（strokeStyle 沿用上面設定的）

  // 畫2個黃色的方形
  ctx.beginPath()
    ctx.rect(250, 250, 50, 100)
    ctx.rect(50, 300, 50, 50)
    ctx.fillStyle = '#ffc12c'
    ctx.fill()
    ctx.stroke()

  // 畫2個橘色的方形
  ctx.beginPath()
    ctx.rect(200, 250, 50 , 100)
    ctx.rect(100, 250, 50 , 100)
    ctx.fillStyle = '#ff9f51'
    ctx.fill()
    ctx.stroke()

  // 畫拱門
  ctx.beginPath()
    ctx.moveTo(100, 200)
    ctx.lineTo(250, 200)
    ctx.lineTo(250, 250)
    ctx.lineTo(200, 250)
    ctx.arc(175, 250, 25, 0, Math.PI, true)
    ctx.lineTo(150, 250)
    ctx.lineTo(100, 250)
    ctx.closePath()
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.stroke()

  // 畫屋頂
  ctx.beginPath()
    ctx.moveTo(100, 200)
    ctx.lineTo(175, 150)
    ctx.lineTo(250, 200)
    ctx.closePath()
    ctx.fillStyle = '#ed5a2a'
    ctx.fill()
    ctx.stroke()

  // 畫旗子
  ctx.beginPath()
    ctx.moveTo(175, 150)
    ctx.lineTo(175, 100 - mousePos.y / 5)
    ctx.lineTo(200, 110 - mousePos.y / 5 + time % 5)
    ctx.lineTo(175, 120 - mousePos.y / 5)
    ctx.fillStyle = `hsl(${mousePos.x % 360}, 50%, 50%)`
    ctx.fill()
    ctx.stroke()

  // 畫車子
  const carX = (time % 450) - 50
  // 取餘數是為了要讓 x 以 450 為 1 round 跑一次
  // -50 是剪掉車子的長度，讓車子不會一開始就突然全部蹦出來，而會先從車頭開始出來
  ctx.fillStyle = '#fff'
  ctx.fillRect(carX, 325, 50, 25)
  ctx.strokeRect(carX, 325, 50, 25)
  ctx.beginPath()
    ctx.arc(carX + 10, 350, 5, 0, Math.PI*2)
    ctx.arc(carX + 40, 350, 5, 0, Math.PI*2)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.stroke()
}

canvas.addEventListener('mousemove', (e) => {
  console.log(e.offsetX, e.offsetY)
  mousePos = { x: e.offsetX, y: e.offsetY }
})

setInterval(() => {
  draw()
}, 30)


// 如果要做一個區間的規律移動，可以用 %(餘數) 的方式，來達到
