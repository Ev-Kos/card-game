import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'

export const Card = (
  ctx: CanvasRenderingContext2D,
  isTrumpCard: boolean,
  image: HTMLImageElement,
  x: number,
  y: number
) => {
  if (!isTrumpCard) {
    ctx.drawImage(image, x, y, CARD_WIDTH, CARD_HEIGHT)
  }
  // if (isOpened) {
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
    ctx.save()
    ctx.rotate((-90 * Math.PI) / 180)
    ctx.drawImage(
      image,
      -y - CARD_HEIGHT - CARD_WIDTH / 2,
      x - 50,
      CARD_WIDTH,
      CARD_HEIGHT
    )
    ctx.restore()
    // }
  }
}
