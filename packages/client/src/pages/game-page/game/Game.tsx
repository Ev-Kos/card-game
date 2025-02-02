import { useEffect, useMemo, useRef, useState } from 'react'
import { LOGO_HEIGHT, PADDING_GAME_PAGE } from '../utils/constans'
import { DeskCard } from '../deck-cards/DeckCards'
import { useWindowSize } from '../hooks/hooks'
import { createDeskCards, shuffle, TDeskCards } from '../utils/game-helpers'

export const Game = () => {
  const [cardsCounter, setCardsCounter] = useState(0)
  const [widthGame, setWidthGame] = useState(0)
  const [heightGame, setHeightGame] = useState(0)
  const [isStartGame, setStartGame] = useState(true)
  const [initDeskCards, setInitDeskCards] = useState<TDeskCards[]>([])
  const [deskCards, setDeskCards] = useState<TDeskCards[]>([])
  const [trumpCard, setTrumpCard] = useState<TDeskCards>()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [width, height] = useWindowSize()

  //Если нажата кнопка "Начать игру", то устанавливаем:
  //  cardsCounter - счетчик карт в колоде, задаем 35, т.к. 1 карта будет являться козырем
  //  initDeskCards - массив из 36 карт
  //  widthGame, heightGame - размер поля canvas зависящий от размера окна браузера
  useEffect(() => {
    if (isStartGame) {
      setCardsCounter(35)
      setInitDeskCards(createDeskCards())
      setWidthGame(width - (width * PADDING_GAME_PAGE * 2) / 100)
      setHeightGame(height - LOGO_HEIGHT - 30)
    }
  }, [width, height, isStartGame])

  //когда initDeskCards(колода со всеми картами) заполнен,
  // создаем перетасованную копию этого массива (arr)
  // сохраняем в trumpCard первую карту перетасованного массива - козырь
  // и сам перетасованный массив без козырной карты (deskCards)
  useEffect(() => {
    if (initDeskCards.length !== 0) {
      const arr = shuffle(initDeskCards)
      setTrumpCard(arr[0])
      setDeskCards(arr.filter((item, index) => index !== 0))
    }
  }, [initDeskCards])

  console.log(deskCards)

  useEffect(() => {
    if (canvasRef.current && widthGame !== 0 && widthGame !== 0 && trumpCard) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (ctx) {
        DeskCard(
          ctx,
          widthGame,
          heightGame,
          cardsCounter,
          String(trumpCard?.suit),
          String(trumpCard?.rang)
        )
      }
    }
  }, [widthGame, heightGame, trumpCard])

  return <canvas width={widthGame} height={heightGame} ref={canvasRef} />
}
