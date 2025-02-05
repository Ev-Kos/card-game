import { Dispatch, SetStateAction } from 'react'
import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH, closedCard } from '../utils/constans'
import { getRect, spritesLoaded, TCard, TRect } from '../utils/game-helpers'

export const CardsGame = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  isPlayerCards: boolean,
  cardsArray: TCard[],
  setSelectedSrcCardToMove: Dispatch<SetStateAction<string>>,
  isMovePlayer: boolean,
) => {
  const x = (widthGame - cardsArray.length * (CARD_WIDTH + 15)) / 2
  const yBot = 10
  const yPlayer = heightGame - CARD_HEIGHT - 30

  const canvas = document.querySelector('canvas')

  const newCardsArray = cardsArray.map(item =>
    isPlayerCards ? item.image : closedCard,
  )

  const sprites = spritesLoaded(newCardsArray)
  Promise.all(sprites).then(images => {
    const rects: TRect[] = []
    let newX = x
    images.forEach(item => {
      rects.push({ image: item, x: newX, y: isPlayerCards ? yPlayer : yBot })
      newX = newX + CARD_WIDTH + 15
    })

    ctx.clearRect(0, isPlayerCards ? yPlayer : yBot, widthGame, 125)

    rects.forEach(item => {
      Card(ctx, false, item.image, item.x, item.y)
    })

    if (isPlayerCards) {
      if (canvas) {
        canvas.onmousemove = e => {
          const rect = getRect(canvas, e)
          ctx.clearRect(x - CARD_WIDTH, yPlayer - 25, 600, 125)
          rects.forEach(item => {
            if (
              rect.xMouse >= item.x &&
              rect.xMouse <= item.x + CARD_WIDTH &&
              rect.yMouse >= item.y &&
              rect.yMouse <= item.y + CARD_HEIGHT
            ) {
              Card(ctx, false, item.image, item.x, item.y - 20)
            } else {
              Card(ctx, false, item.image, item.x, item.y)
            }
          })
        }
        if (isMovePlayer) {
          canvas.onclick = e => {
            const rect = getRect(canvas, e)
            rects.forEach(item => {
              if (
                rect.xMouse >= item.x &&
                rect.xMouse <= item.x + CARD_WIDTH &&
                rect.yMouse >= item.y + 20 &&
                rect.yMouse <= item.y + 20 + CARD_HEIGHT
              ) {
                setSelectedSrcCardToMove(item.image.src)
              }
            })
          }
        }
      }
    }
  })
}
