import { useEffect } from 'react'
import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'

export const DeskCard = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  cardsCount: number,
  suitTrumpCard: string,
  rangTrumpCard: string
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

  const imageSources = Array(cardsCount).fill(suit)

  Promise.all(imageSources.map(i => loadImage(i)))
    .then(() => {
      let i = y
      imageSources.forEach(item => {
        Card(ctx, item, '0', 0, false, false, x, i)
        i = i + 3
      })
    })
    .catch(err => {
      console.error(err)
    })

  Card(
    ctx,
    suitTrumpCard,
    rangTrumpCard,
    0,
    false,
    true,
    xTrumpCard,
    yTrumpCard
  )
}
