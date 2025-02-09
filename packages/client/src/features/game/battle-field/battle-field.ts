import { spritesLoaded } from '../helpers'
import { TBattleCart } from '../types'
import imports from '../imports'
import { Card } from '../../../shared/card/Card'

export const BattleField = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  cardsArray: TBattleCart[],
) => {
  const images: string[] = []
  let cardsArrayLength = 0

  cardsArray.forEach(item => {
    images.push(item.image)
    if (item.isPlayer === cardsArray[0].isPlayer) {
      cardsArrayLength += 1
    }
  })

  const x = Math.round(
    (widthGame - cardsArrayLength * (imports.CARD_WIDTH + 15)) / 2,
  )
  const y = Math.round(heightGame / 2 - imports.CARD_HEIGHT)

  const sprites = spritesLoaded(images)

  if (cardsArray.length === 0) {
    ctx.clearRect(
      widthGame - (widthGame - 300),
      y,
      widthGame - 510,
      imports.CARD_HEIGHT + 50,
    )
  }

  Promise.all(sprites)
    .then(images => {
      const arr = cardsArray.map((item, index) => {
        return { ...item, image: images[index] }
      })

      let oddX = x
      let evenX = x

      ctx.clearRect(
        x - 2,
        y,
        cardsArrayLength * (imports.CARD_WIDTH + 15),
        imports.CARD_HEIGHT + 50,
      )
      arr.forEach(item => {
        if (arr[0].isPlayer === item.isPlayer) {
          Card(ctx, false, item.image, oddX, y, false)
          oddX = oddX + imports.CARD_WIDTH + 15
        } else {
          Card(ctx, false, item.image, evenX, y + 45, false)
          evenX = evenX + imports.CARD_WIDTH + 15
        }
      })
    })
    .catch(err => console.error(`BattleField. ${err}`))
}
