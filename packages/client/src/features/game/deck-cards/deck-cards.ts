import { Card } from '../../../shared/card/Card'
import { TCard } from '../types'
import imports from '../imports'

export const DeckCard = async (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  cardsArray: TCard[],
  trumpCard: TCard,
  isLeft: boolean,
  shirtCard: string,
) => {
  const x = Math.round(
    widthGame - imports.CARD_WIDTH - imports.CARD_WIDTH / 1.5,
  )
  const y = Math.round(heightGame / 2 - imports.CARD_HEIGHT)
  const xLeft = 50

  const newDeckCards = cardsArray.map((item, index) =>
    index === 0 && !isLeft ? item.image : shirtCard,
  )

  const sprites = imports.spritesLoaded(newDeckCards)

  if (!isLeft) {
    if (cardsArray.length !== 0) {
      Promise.all(sprites)
        .then(images => {
          let i = y
          ctx.clearRect(x - imports.CARD_WIDTH + 50, y - 50, 150, 500)
          images.forEach((item, index) => {
            Card(
              ctx,
              index === 0 ? true : false,
              item,
              x,
              index === 0 ? y : i,
              false,
            )
            i = i + 3
          })
        })
        .catch(err => console.error(err))
    } else {
      ctx.clearRect(x - imports.CARD_WIDTH - 15, y, 160, 150)
      const img = new Image()
      img.src = trumpCard.image
      await img.decode()

      Card(ctx, true, img, x, y, true)
    }
  } else {
    if (cardsArray.length !== 0) {
      Promise.all(sprites)
        .then(images => {
          let i = y
          ctx.clearRect(xLeft - 2, y, 100, 500)
          images.forEach(item => {
            Card(ctx, false, item, xLeft, i, false)
            i = i + 3
          })
        })
        .catch(err => console.error(`DeckCards. ${err}`))
    }
  }
}
