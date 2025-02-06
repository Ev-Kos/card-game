import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH, closedCard } from '../utils/constans'
import { spritesLoaded, TCard } from '../utils/game-helpers'

export const DeskCard = async (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  deckCards: TCard[],
  trumpCard: TCard,
) => {
  const x = widthGame - CARD_WIDTH - CARD_WIDTH / 1.5
  const y = heightGame / 2 - CARD_HEIGHT

  const newDeckCards = deckCards.map((item, index) =>
    index === 0 ? item.image : closedCard,
  )

  const sprites = spritesLoaded(newDeckCards)
  if (deckCards.length !== 0) {
    Promise.all(sprites)
      .then(images => {
        //(function gameLoop() {
        let i = y
        ctx.clearRect(x - 2, y, 100, 500)
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
        //requestAnimationFrame(gameLoop);
        //})();
      })
      .catch(err => console.error(err))
  } else {
    ctx.clearRect(x - 60, y, 150, 150)
    const img = new Image()
    img.src = trumpCard.image
    Card(ctx, true, img, x, y, true)
  }
}
