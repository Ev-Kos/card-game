import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'

export const DeskCard = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  cardsCount: number
) => {
  const x = widthGame - CARD_WIDTH - 50
  const y = heightGame / 2 - CARD_HEIGHT / 2
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
      console.log(i)
      imageSources.forEach(item => {
        Card(ctx, widthGame, heightGame, item, '0', 0, false, 0, 0, x, i)
        i = i + 3
      })
    })
    .catch(err => {
      console.error(err)
    })
}
