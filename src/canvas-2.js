console.log('canvas2')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const PI2 = Math.PI * 2

// 一些設定
const blockWidth = 200
const color = {
  red: '#f74456',
  white: '#fff',
  yellow: '#f1da56',
  blue: '#036faf'
}

canvas.width = blockWidth * 3
canvas.height = blockWidth * 3

// 一個專門畫方塊的 func
const drawBlock = ({
  pos = { x: 0, y:0 },
  color,
  draw,
  time
}) => {
  ctx.save()
    ctx.translate(pos.x * blockWidth, pos.y * blockWidth)
    ctx.fillStyle = color
    ctx.fillRect(0, 0, blockWidth, blockWidth)
    ctx.translate(blockWidth/2, blockWidth/2)
    draw()
  ctx.restore()
}

// drawBlock({
//   pos: {x:2, y:2},
//   color: color['yellow'],
//   draw() { console.log('yaaaaa') }
// })

let time = 0

function draw() {
  time++
  let stime = parseInt(time / 20) // 設一個變動速度不要太快的變量

  drawBlock({
    pos: {x: 0, y: 0},
    color: color['blue'],
    draw() {
      ctx.beginPath()
        ctx.arc(0, 0, 30 / (stime % 3 + 1), 0, PI2)
        ctx.strokeStyle = color['white']
        ctx.lineWidth = 15
        ctx.stroke()
      for (let i=0; i<8; i++) {
        ctx.fillStyle = stime % 8 === i ? color['red'] : color['white']
        if ((i + stime)%4 !== 0) {
          ctx.fillRect(60, -4, 20, 8)
        }
        ctx.rotate(PI2 / 8)
      }
    },
    time: 0
  })

  drawBlock({
    pos: {x: 1, y: 0},
    color: color['red'],
    draw() {
      const circleW = 40 // 圓的直徑
      const circleGutter = 5
      const blockWidth = circleW + 2*circleGutter
      ctx.translate(-1 * blockWidth*3/2, -1 * blockWidth*3/2)
      for(let i=0; i<3; i++) {
        for(let z=0; z<3; z++) {
          ctx.save()
            ctx.beginPath()
              ctx.translate(i*blockWidth + blockWidth/2, z*blockWidth + blockWidth/2)
              ctx.fillStyle = color['white']
              if ( (i+z*2+stime)%5 ===0 ) {
                ctx.fillStyle = color['yellow']
              }
              ctx.arc(0, 0, circleW/2, 0, PI2)
              ctx.fill()
          ctx.restore()
        }
      }
    },
    time: 0
  })

  drawBlock({
    pos: {x: 2, y: 0},
    color: color['yellow'],
    draw() {
      for (let i=0; i<4; i++) {
        ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(80, 20)
          ctx.lineTo(80, 80)
          ctx.closePath()
          ctx.fillStyle = color['white']
          ctx.fill()
          if (stime%4 === i) {
            ctx.beginPath()
              ctx.fillStyle = color['red']
              ctx.arc(60, 40, 6, 0, PI2)
              ctx.fill()
          }
          ctx.rotate(PI2/4)
      }
    },
    time: 0
  })

  drawBlock({
    pos: {x: 0, y: 1},
    color: color['yellow'],
    draw() {
      ctx.translate(-60, -60)
      ctx.fillStyle = color['white']
      ctx.fillRect(0,0,60,60)
      ctx.translate(30, 30)
      ctx.rotate(-Math.PI/4)
      ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(40, 0)
        ctx.arc(40, 40, 40, -Math.PI/2, Math.PI/2)
        ctx.lineTo(0, 80)
        ctx.fillStyle = color['red']
        ctx.fill()
      ctx.closePath()

      ctx.translate(-100+10*Math.sin(time/10), 60)
      ctx.fillStyle = color['blue']
      ctx.fillRect(0, 0, 100, 40)

      ctx.translate(100+10*Math.cos(time/10), 40)
      ctx.fillStyle = color['white']
      ctx.fillRect(0, 0, 50, 20)
    },
    time: 0
  })

  drawBlock({
    pos: {x: 1, y: 1},
    color: color['white'],
    draw() { },
    time: 0
  })

  drawBlock({
    pos: {x: 2, y: 1},
    color: color['blue'],
    draw() { },
    time: 0
  })

  drawBlock({
    pos: {x: 0, y: 2},
    color: color['red'],
    draw() { },
    time: 0
  })

  drawBlock({
    pos: {x: 1, y: 2},
    color: color['blue'],
    draw() { },
    time: 0
  })

  drawBlock({
    pos: {x: 2, y: 2},
    color: color['yellow'],
    draw() { },
    time: 0
  })
  requestAnimationFrame(draw)
}


requestAnimationFrame(draw)
