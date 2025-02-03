import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'

export const Card = (
  ctx: CanvasRenderingContext2D,
  isOpened: boolean,
  isTrumpCard: boolean,
  image: string,
  x: number,
  y: number
) => {
  if (!isOpened && !isTrumpCard) {
    const img = new Image()
    img.src = image
    img.onload = () => {
      ctx.drawImage(img, x, y, CARD_WIDTH, CARD_HEIGHT)
    }
  }
  // if (isGot) {
  //   ctx.lineWidth = 1
  //   ctx.strokeStyle = 'black'
  //   ctx.strokeRect(x, y, CARD_WIDTH, CARD_HEIGHT)
  //   ctx.fillStyle = '#A9A9A9'
  //   ctx.fillRect(x, y, CARD_WIDTH, CARD_HEIGHT)
  //   ctx.font = '20px Inter'
  //   ctx.strokeStyle = 'white'
  //   ctx.strokeText(rang, x, y)
  //   const img = new Image()
  //   img.src = suit
  //   img.onload = () => {
  //     ctx.drawImage(img, x, y, 20, 20)
  //   }
  // }
  if (isTrumpCard) {
    // ctx.save()
    // ctx.rotate((-90 * Math.PI) / 180)
    // ctx.lineWidth = 1
    // ctx.strokeStyle = 'black'
    // ctx.strokeRect(-y, x, CARD_WIDTH, CARD_HEIGHT)
    // ctx.fillStyle = '#A9A9A9'
    // ctx.fillRect(-y, x, CARD_WIDTH, CARD_HEIGHT)
    // ctx.font = '20px Inter'
    // ctx.fillStyle = 'white'
    // ctx.fillText(rang, -y + 5, x + CARD_HEIGHT / 5)
    // ctx.restore()

    const img = new Image()
    img.src = image
    img.onload = () => {
      ctx.save()
      ctx.rotate((-90 * Math.PI) / 180)
      ctx.drawImage(
        img,
        -y - CARD_HEIGHT - CARD_WIDTH / 2,
        x - 50,
        CARD_WIDTH,
        CARD_HEIGHT
      )
      ctx.restore()
    }
  }
}
