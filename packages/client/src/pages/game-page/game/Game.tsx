import { useEffect, useRef, useState } from 'react'
import { LOGO_HEIGHT, PADDING_GAME_PAGE } from '../utils/constans'
import { DeskCard } from '../deck-cards/DeckCards'
import { useWindowSize } from '../hooks/hooks'
import styles from './Game.module.css'
import {
  debounce,
  initialDeskCard,
  NOTICEGAME,
  shuffle,
  TCard,
} from '../utils/game-helpers'
import { CardGame } from '../card-game/CardGame'
import { NoticeGame } from '../notice-game/NoticeGame'

export const Game = () => {
  const [widthGame, setWidthGame] = useState(0)
  const [heightGame, setHeightGame] = useState(0)
  const [isStartGame, setStartGame] = useState(true)
  const [deckCards, setDeckCards] = useState<TCard[]>([])
  const [trumpCard, setTrumpCard] = useState<TCard>()

  const [isFirstGetCards, setFirstGetCards] = useState(false)
  const [playerCards, setPlayerCards] = useState<TCard[]>([])
  const [botCards, setBotCards] = useState<TCard[]>([])

  const [isNoticeText, setNoticeText] = useState('')

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas = canvasRef.current
  const ctx = canvas?.getContext('2d')
  const [width, height] = useWindowSize()

  //Если нажата кнопка "Начать игру", то устанавливаем:
  //  перетасованную копию исходного массива массива (arr)
  //  сохраняем в trumpCard первую карту перетасованного массива - козырь
  //  и сам перетасованный массив без козырной карты (deskCards)
  //  widthGame, heightGame - размер поля canvas зависящий от размера окна браузера

  useEffect(() => {
    setWidthGame(width - (width * PADDING_GAME_PAGE * 2) / 100)
    setHeightGame(height - LOGO_HEIGHT - 30)
  }, [width, height])

  useEffect(() => {
    if (isStartGame) {
      const arr = shuffle(initialDeskCard)
      setTrumpCard(arr[0])
      setDeckCards(arr)
      setFirstGetCards(true)
    }
  }, [isStartGame])

  useEffect(() => {
    if (isFirstGetCards) {
      setPlayerCards(deckCards.slice(30, 36))
      setBotCards(deckCards.slice(24, 30))
    }
  }, [isFirstGetCards])

  useEffect(() => {
    if (playerCards.length !== 0 && botCards.length !== 0) {
      const length = playerCards.length + botCards.length
      const waite = debounce(() => {
        setDeckCards(deckCards.slice(0, length * 2))
        const t = debounce(() => {
          const minTrumpCardBot = Math.min(
            ...botCards
              .filter(item => item.suit === trumpCard?.suit)
              .map(el => el.value),
          )
          const minTrumpCartPlayer = Math.min(
            ...playerCards
              .filter(item => item.suit === trumpCard?.suit)
              .map(el => el.value),
          )
          if (isFinite(minTrumpCardBot) && isFinite(minTrumpCartPlayer)) {
            minTrumpCardBot > minTrumpCartPlayer
              ? setNoticeText(NOTICEGAME.firstMovePlayer)
              : setNoticeText(NOTICEGAME.firstMoveBot)
          } else {
            isFinite(minTrumpCardBot)
              ? setNoticeText(NOTICEGAME.firstMoveBot)
              : setNoticeText(NOTICEGAME.firstMovePlayer)
          }
        }, 100)
        t()
      }, 1000)
      waite()
    }
  }, [playerCards, botCards])

  useEffect(() => {
    if (canvasRef.current && widthGame !== 0 && widthGame !== 0 && trumpCard) {
      if (ctx) {
        DeskCard(ctx, widthGame, heightGame, deckCards),
          CardGame(ctx, widthGame, heightGame, false, botCards),
          CardGame(ctx, widthGame, heightGame, true, playerCards)
      }
    }
  }, [widthGame, heightGame, deckCards])

  return (
    <div className={styles.game}>
      <canvas
        width={widthGame}
        height={heightGame}
        ref={canvasRef}
        id="canvas"
      />
      {isNoticeText.length !== 0 && <NoticeGame text={isNoticeText} />}
    </div>
  )
}
