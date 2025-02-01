import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'

export const Card = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  suit: string,
  rang: string,
  value: number,
  isGot: boolean,
  x: number,
  y: number,
  xImg: number,
  yImg: number
) => {
  const img = new Image()
  img.src = suit
  img.onload = () => {
    ctx.drawImage(img, xImg, yImg, CARD_WIDTH, CARD_HEIGHT)
  }
  if (isGot) {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'black'
    ctx.strokeRect(0, 0, CARD_WIDTH, CARD_HEIGHT)
    ctx.fillStyle = '#A9A9A9'
    ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)
    ctx.font = '20px Inter'
    ctx.strokeStyle = 'white'
    ctx.strokeText(rang, 5, 20)
    const img = new Image()
    img.src = suit
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 20, 20)
    }
  }
}
