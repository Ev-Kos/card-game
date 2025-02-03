import { useEffect } from 'react'
import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'
import { TDeskCards } from '../utils/game-helpers'

export const DeskCard = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  cardsCount: number,
  deckCards: TDeskCards[],
  image: string
) => {
  const x = widthGame - CARD_WIDTH - CARD_WIDTH / 1.5
  const y = heightGame / 2 - CARD_HEIGHT

  const xTrumpCard = x - CARD_WIDTH / 1.5
  const yTrumpCard = y + CARD_HEIGHT + CARD_HEIGHT / 2.5
  const suit = '../../../../public/sprites/card.png'

  function loadImage(imagePath: string) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => {
        resolve(image)
      })
      image.addEventListener('error', err => {
        reject(err)
      })
      image.src = imagePath
    })
  }

  const newDeckCards = deckCards.map((item, index) =>
    index === 0 ? item : { ...item, image: suit }
  )

  Promise.all(newDeckCards.map(i => loadImage(i.image)))
    .then(() => {
      let i = y
      newDeckCards.forEach((item, index) => {
        if (index === 0) {
          Card(ctx, false, true, item.image, x, y)
        }
        Card(ctx, false, false, item.image, x, i)
        i = i + 3
      })
    })

    .catch(err => {
      console.error(err)
    })
}
