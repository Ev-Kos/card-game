import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'

export const Card = (
  ctx: CanvasRenderingContext2D,
  isTrumpCard: boolean,
  image: HTMLImageElement,
  x: number,
  y: number,
  isOpasity: boolean,
) => {
  if (!isTrumpCard) {
    ctx.drawImage(image, x, y, CARD_WIDTH, CARD_HEIGHT)
  }
  if (isTrumpCard) {
    ctx.save()
    ctx.rotate((-90 * Math.PI) / 180)
    ctx.drawImage(
      image,
      -y - CARD_HEIGHT - CARD_WIDTH / 2,
      x - 50,
      CARD_WIDTH,
      CARD_HEIGHT,
    )
    if (isOpasity) {
      ctx.fillStyle = 'rgba(201, 204, 206, 0.5)'
      ctx.fillRect(
        -y - CARD_HEIGHT - CARD_WIDTH / 2,
        x - 50,
        CARD_WIDTH,
        CARD_HEIGHT,
      )
    }
    ctx.restore()
  }
}
