import { useEffect, useState } from 'react'
import { Card } from '../card/card'
import { CARD_HEIGHT, CARD_WIDTH } from '../utils/constans'
import { spritesLoaded, TCard } from '../utils/game-helpers'

export const DeskCard = async (
  ctx: CanvasRenderingContext2D,
  widthGame: number,
  heightGame: number,
  cardsCount: number,
  deckCards: TCard[]
) => {
  const x = widthGame - CARD_WIDTH - CARD_WIDTH / 1.5
  const y = heightGame / 2 - CARD_HEIGHT

  const suit = '../../../../public/sprites/card.png'

  const newDeckCards = deckCards.map((item, index) =>
    index === 0 ? item.image : suit
  )

  const sprites = spritesLoaded(newDeckCards)

  Promise.all(sprites)
    .then(images => {
      //(function gameLoop() {
      let i = y
      ctx.clearRect(x - 2, y, 100, 500)
      images.forEach((item, index) => {
        Card(ctx, index === 0 ? true : false, item, x, index === 0 ? y : i)
        i = i + 3
      })
      //requestAnimationFrame(gameLoop);
      //})();
    })
    .catch(err => console.error(err))
}
