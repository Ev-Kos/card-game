import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'
import { spritesLoaded, TBattleCart } from '../utils/game-helpers'

export const BattleField = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  cardsArray: TBattleCart[],
) => {
  const x = widthGame - (widthGame * 69) / 100
  const y = heightGame / 2 - CARD_HEIGHT

  const images = cardsArray.map(item => item.image)

  const sprites = spritesLoaded(images)

  if (cardsArray.length === 0) {
    ctx.clearRect(widthGame - (widthGame * 70) / 100, y, 600, 200)
  } else {
    Promise.all(sprites)
      .then(images => {
        const arr = cardsArray.map((item, index) => {
          return { ...item, image: images[index] }
        })

        let oddX = x
        let evenX = x
        ctx.clearRect(
          x - 2,
          y - CARD_HEIGHT,
          cardsArray.length * (CARD_WIDTH + 15),
          CARD_HEIGHT * 2 + 50,
        )
        arr.forEach(item => {
          if (arr[0].isPlayer === item.isPlayer) {
            Card(ctx, false, item.image, oddX, y, false)
            oddX = oddX + CARD_WIDTH + 15
          } else {
            Card(ctx, false, item.image, evenX, y + 45, false)
            evenX = evenX + CARD_WIDTH + 15
          }
        })
      })
      .catch(err => console.error(err))
  }
}
