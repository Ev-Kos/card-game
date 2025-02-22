import { Dispatch, SetStateAction } from 'react'
import { Card } from '../../../shared/card/Card'
import { TCard, TRect } from '../types'
import imports from '../imports'

export const CardsGame = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  isPlayerCards: boolean,
  cardsArray: TCard[],
  setSelectedSrcCardToMove: Dispatch<SetStateAction<string>>,
  isMovePlayer: boolean,
  shirtCard: string,
) => {
  const x = Math.round(
    (widthGame - cardsArray.length * (imports.CARD_WIDTH + 15)) / 2,
  )
  const yBot = 45
  const yPlayer = Math.round(heightGame - imports.CARD_HEIGHT - 60)

  const canvas = document.querySelector('canvas')

  const newCardsArray = cardsArray.map(item =>
    isPlayerCards ? item.image : shirtCard,
  )

  const sprites = imports.spritesLoaded(newCardsArray)

  Promise.all(sprites)
    .then(images => {
      const rects: TRect[] = []
      let newX = x

      images.forEach(item => {
        rects.push({ image: item, x: newX, y: isPlayerCards ? yPlayer : yBot })
        newX = newX + imports.CARD_WIDTH + 15
      })

      const wait = imports.debounce(() => {
        ctx.clearRect(0, isPlayerCards ? yPlayer : yBot, widthGame, 200)
        rects.forEach(item => {
          Card(ctx, false, item.image, item.x, item.y, false)
        })
      }, 50)
      wait()

      if (isPlayerCards && canvas) {
        canvas.onmousemove = e => {
          const rect = imports.getRect(canvas, e)
          ctx.clearRect(x - imports.CARD_WIDTH, yPlayer - 25, widthGame, 200)
          rects.forEach(item => {
            if (
              rect.xMouse >= item.x &&
              rect.xMouse <= item.x + imports.CARD_WIDTH &&
              rect.yMouse >= item.y &&
              rect.yMouse <= item.y + imports.CARD_HEIGHT
            ) {
              Card(ctx, false, item.image, item.x, item.y - 20, false)
            } else {
              Card(ctx, false, item.image, item.x, item.y, false)
            }
          })
        }
        if (isMovePlayer) {
          canvas.onclick = e => {
            const rect = imports.getRect(canvas, e)
            rects.forEach(item => {
              if (
                rect.xMouse >= item.x &&
                rect.xMouse <= item.x + imports.CARD_WIDTH &&
                rect.yMouse >= item.y + 20 &&
                rect.yMouse <= item.y + 20 + imports.CARD_HEIGHT
              ) {
                setSelectedSrcCardToMove(item.image.src)
              }
            })
          }
        }
      }
    })
    .catch(err => console.error(`CardGame. ${err}`))
}
