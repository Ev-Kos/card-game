import { Dispatch, SetStateAction } from 'react'
import { Card } from '../../../shared/card/Card'
import { TCard, TRect } from '../../../utils/types'
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  closedCardImage,
} from '../../../shared/constans'
import {
  debounce,
  getRect,
  spritesLoaded,
} from '../../../features/game/helpers'

export const CardsGame = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  isPlayerCards: boolean,
  cardsArray: TCard[],
  setSelectedSrcCardToMove: Dispatch<SetStateAction<string>>,
  isMovePlayer: boolean,
) => {
  const x = Math.round((widthGame - cardsArray.length * (CARD_WIDTH + 15)) / 2)
  const yBot = 25
  const yPlayer = Math.round(heightGame - CARD_HEIGHT - 45)

  const canvas = document.querySelector('canvas')

  const newCardsArray = cardsArray.map(item =>
    isPlayerCards ? item.image : closedCardImage,
  )

  const sprites = spritesLoaded(newCardsArray)

  Promise.all(sprites)
    .then(images => {
      const rects: TRect[] = []
      let newX = x

      images.forEach(item => {
        rects.push({ image: item, x: newX, y: isPlayerCards ? yPlayer : yBot })
        newX = newX + CARD_WIDTH + 15
      })

      const wait = debounce(() => {
        ctx.clearRect(0, isPlayerCards ? yPlayer : yBot, widthGame, 200)
        rects.forEach(item => {
          Card(ctx, false, item.image, item.x, item.y, false)
        })
      }, 50)
      wait()

      if (isPlayerCards) {
        if (canvas) {
          canvas.onmousemove = e => {
            const rect = getRect(canvas, e)
            ctx.clearRect(x - CARD_WIDTH, yPlayer - 25, widthGame, 200)
            rects.forEach(item => {
              if (
                rect.xMouse >= item.x &&
                rect.xMouse <= item.x + CARD_WIDTH &&
                rect.yMouse >= item.y &&
                rect.yMouse <= item.y + CARD_HEIGHT
              ) {
                Card(ctx, false, item.image, item.x, item.y - 20, false)
              } else {
                Card(ctx, false, item.image, item.x, item.y, false)
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
    .catch(err => console.log(err))
}
