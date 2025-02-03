import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'
import { spritesLoaded, TCard } from '../utils/game-helpers'

export const CardGame = (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  isPlayerCards: boolean,
  cardsArray: TCard[]
) => {
  const x = widthGame / 3.5
  const yBot = 10
  const yPlayer = heightGame - CARD_HEIGHT - 30

  const newCardsArray = cardsArray.map((item, index) => item.image)
  //const newPlayerCards = playerCards.map((item, index) => item.image)

  const sprites = spritesLoaded(newCardsArray)
  //const spritesForPlayer = spritesLoaded(newPlayerCards)

  Promise.all(sprites)
    .then(images => {
      //(function gameLoop() {
      let i = x
      ctx.clearRect(x, isPlayerCards ? yPlayer : yBot, 600, 100)
      images.forEach((item, index) => {
        Card(ctx, false, item, i, isPlayerCards ? yPlayer : yBot)
        i = i + CARD_WIDTH + 15
      })
      //requestAnimationFrame(gameLoop);
      //})();
    })
    .catch(err => console.error(err))
}
