import { CARD_HEIGHT, CARD_WIDTH } from '../../features/game/constans'

export const Card = (
  ctx: CanvasRenderingContext2D,
  isTrumpCard: boolean,
  image: HTMLImageElement,
  x: number,
  y: number,
  isOpacity: boolean,
) => {
  if (!isTrumpCard) {
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(image, x, y, CARD_WIDTH, CARD_HEIGHT)
  }
  if (isTrumpCard && !isOpacity) {
    if (!isOpacity) {
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(image, x - CARD_WIDTH - 10, y + 3, CARD_WIDTH, CARD_HEIGHT)
    }
  }
  if (isTrumpCard && isOpacity) {
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(image, x + 3, y + 3, CARD_WIDTH, CARD_HEIGHT)
    ctx.fillStyle = 'rgba(211, 210, 210, 0.5)'
    ctx.fillRect(x + 3, y + 3, CARD_WIDTH, CARD_HEIGHT)
  }
}
