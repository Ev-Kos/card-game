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
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(image, x, y, CARD_WIDTH, CARD_HEIGHT)
  }
  if (isTrumpCard && !isOpasity) {
    if (!isOpasity) {
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(image, x - CARD_WIDTH - 10, y + 3, CARD_WIDTH, CARD_HEIGHT)
    }
  }
  if (isTrumpCard && isOpasity) {
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(image, x + 3, y + 3, CARD_WIDTH, CARD_HEIGHT)
    ctx.fillStyle = 'rgba(211, 210, 210, 0.4)'
    ctx.fillRect(x, y, CARD_WIDTH, CARD_HEIGHT)
  }
}
