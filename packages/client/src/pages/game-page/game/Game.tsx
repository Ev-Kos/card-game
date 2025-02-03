import { useEffect, useRef, useState } from 'react'
import { LOGO_HEIGHT, PADDING_GAME_PAGE } from '../utils/constans'
import { DeskCard } from '../deck-cards/DeckCards'
import { useWindowSize } from '../hooks/hooks'
import { initialDeskCard, shuffle, TDeskCards } from '../utils/game-helpers'

export const Game = () => {
  const [cardsCounter, setCardsCounter] = useState(0)
  const [widthGame, setWidthGame] = useState(0)
  const [heightGame, setHeightGame] = useState(0)
  const [isStartGame, setStartGame] = useState(true)
  const [deckCards, setDeckCards] = useState<TDeskCards[]>([])
  const [trumpCard, setTrumpCard] = useState<TDeskCards>()

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [width, height] = useWindowSize()

  //Если нажата кнопка "Начать игру", то устанавливаем:
  //  cardsCounter - счетчик карт в колоде, задаем 35, т.к. 1 карта будет являться козырем
  //  создаем перетасованную копию этого массива (arr)
  //  сохраняем в trumpCard первую карту перетасованного массива - козырь
  //  и сам перетасованный массив без козырной карты (deskCards)
  //  widthGame, heightGame - размер поля canvas зависящий от размера окна браузера

  useEffect(() => {
    setWidthGame(width - (width * PADDING_GAME_PAGE * 2) / 100)
    setHeightGame(height - LOGO_HEIGHT - 30)
  }, [width, height])

  useEffect(() => {
    if (isStartGame) {
      setCardsCounter(35)
      const arr = shuffle(initialDeskCard)
      setTrumpCard(arr[0])
      setDeckCards(arr)
    }
  }, [isStartGame])

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
          deckCards,
          String(trumpCard?.image)
        )
      }
    }
  }, [widthGame, heightGame, trumpCard])

  return <canvas width={widthGame} height={heightGame} ref={canvasRef} />
}
