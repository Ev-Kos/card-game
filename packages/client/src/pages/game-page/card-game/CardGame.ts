import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH, closedCard } from '../utils/constans'
import { spritesLoaded, TCard } from '../utils/game-helpers'

type TRect = {
  x: number
  y: number
  image: HTMLImageElement
}

export const CardGame = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  isPlayerCards: boolean,
  cardsArray: TCard[]
) => {
  const x = widthGame / 3.5
  const yBot = 10
  const yPlayer = heightGame - CARD_HEIGHT - 30

  const canvas = document.querySelector('canvas')

  const newCardsArray = cardsArray.map(item =>
    isPlayerCards ? item.image : closedCard
  )

  const sprites = spritesLoaded(newCardsArray)

  Promise.all(sprites).then(images => {
    const rects: TRect[] = []
    let newX = x
    images.forEach(item => {
      rects.push({ image: item, x: newX, y: isPlayerCards ? yPlayer : yBot })
      newX = newX + CARD_WIDTH + 15
    })

    rects.forEach(item => {
      Card(ctx, false, item.image, item.x, item.y)
    })

    if (isPlayerCards) {
      if (canvas) {
        canvas.onmousemove = e => {
          const rect = canvas.getBoundingClientRect(),
            xMouse = e.clientX - rect.left,
            yMouse = e.clientY - rect.top

          ctx.clearRect(x - 2, yPlayer - 25, 600, 125)

          rects.forEach(item => {
            if (
              xMouse >= item.x &&
              xMouse <= item.x + CARD_WIDTH &&
              yMouse >= item.y &&
              yMouse <= item.y + CARD_HEIGHT
            ) {
              Card(ctx, false, item.image, item.x, item.y - 20)
            } else {
              Card(ctx, false, item.image, item.x, item.y)
            }
          })
        }
      }
    }
  })
}
