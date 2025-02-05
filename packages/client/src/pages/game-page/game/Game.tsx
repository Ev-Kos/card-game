import { useEffect, useRef, useState } from 'react'
import { LOGO_HEIGHT, PADDING_GAME_PAGE } from '../utils/constans'
import { DeskCard } from '../deck-cards/DeckCards'
import { useWindowSize } from '../hooks/hooks'
import styles from './Game.module.css'
import {
  checkCard,
  checkCardToAdd,
  debounce,
  findCard,
  findCartToAdd,
  findMinCard,
  initialDeskCard,
  NOTICEGAME,
  shuffle,
  TBattleCart,
  TCard,
  TRect,
  trimStr,
} from '../utils/game-helpers'
import { CardsGame } from '../cards-game/CardsGame'
import { NoticeGame } from '../notice-game/NoticeGame'
import { Card } from '../card/card'
import { BattleField } from '../battle-field/battleField'

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

  const [selectedSrcCardToMove, setSelectedSrcCardToMove] = useState('')
  const [isMoveBot, setMoveBot] = useState(false)
  const [isMovePlayer, setMovePlayer] = useState(false)

  const [battleCards, setBattleCards] = useState<TBattleCart[]>([])

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
    if (playerCards.length !== 0 && botCards.length !== 0 && isFirstGetCards) {
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
            if (minTrumpCardBot > minTrumpCartPlayer) {
              setMovePlayer(true)
              setNoticeText(NOTICEGAME.firstMovePlayer)
            } else {
              setMoveBot(true)
              setNoticeText(NOTICEGAME.firstMoveBot)
            }
          } else {
            if (isFinite(minTrumpCardBot)) {
              setMoveBot(true)
              setNoticeText(NOTICEGAME.firstMoveBot)
            } else {
              setMovePlayer(true)
              setNoticeText(NOTICEGAME.firstMovePlayer)
            }
          }
        }, 100)
        t()
      }, 1000)
      waite()
      setFirstGetCards(false)
    }
  }, [playerCards, botCards, isFirstGetCards])

  useEffect(() => {
    if (isMoveBot && trumpCard) {
      if (battleCards.length === 0) {
        const cardToMove = findMinCard(botCards, trumpCard)
        setBattleCards([...battleCards, cardToMove])
        setBotCards(botCards.filter(item => item.id !== cardToMove.id))
        setMoveBot(false)
        setMovePlayer(true)
      } else {
        if (battleCards.length !== 0 && battleCards[0].isPlayer === true) {
          if (findCard(battleCards, botCards, trumpCard)) {
            const card = findCard(battleCards, botCards, trumpCard)
            if (card) {
              const wait = debounce(() => {
                setBattleCards([...battleCards, card])
                setBotCards(botCards.filter(item => item.id !== card.id))
              }, 1000)
              wait()
              setMoveBot(false)
              setMovePlayer(true)
            }
          }
        }
        if (battleCards.length !== 0 && battleCards[0].isPlayer === false) {
          const cardToAdd = shuffle(
            findCartToAdd(botCards, battleCards, trumpCard),
          )[0]
          if (cardToAdd) {
            const wait = debounce(() => {
              setBattleCards([...battleCards, cardToAdd])
              setBotCards(botCards.filter(item => item.id !== cardToAdd.id))
            }, 1000)
            wait()
            setMoveBot(false)
            setMovePlayer(true)
          } else {
            console.log('бито')
            setMoveBot(false)
          }
        }
      }
    }
  }, [isMoveBot])

  useEffect(() => {
    if (isMovePlayer && selectedSrcCardToMove.length !== 0) {
      const selectedCard = playerCards.find(
        item => trimStr(item.image) === trimStr(selectedSrcCardToMove),
      )
      if (selectedCard && trumpCard) {
        if (battleCards.length !== 0 && battleCards[0].isPlayer === false) {
          const checkResult = checkCard(battleCards, selectedCard, trumpCard)
          if (checkResult) {
            setPlayerCards(
              playerCards.filter(item => item.id !== selectedCard.id),
            )
            setBattleCards([
              ...battleCards,
              { ...selectedCard, isPlayer: true },
            ])
            setSelectedSrcCardToMove('')
            setMoveBot(true)
            setMovePlayer(false)
          }
        }
        if (battleCards.length === 0) {
          setPlayerCards(
            playerCards.filter(item => item.id !== selectedCard.id),
          )
          setBattleCards([...battleCards, { ...selectedCard, isPlayer: true }])
          setSelectedSrcCardToMove('')
          setMoveBot(true)
          setMovePlayer(false)
        }
        if (battleCards.length !== 0 && battleCards[0].isPlayer === true) {
          const checkCard = checkCardToAdd(selectedCard, battleCards)
          if (checkCard) {
            setPlayerCards(
              playerCards.filter(item => item.id !== selectedCard.id),
            )
            setBattleCards([
              ...battleCards,
              { ...selectedCard, isPlayer: true },
            ])
            setSelectedSrcCardToMove('')
            setMoveBot(true)
            setMovePlayer(false)
          }
        }
      }
    }
  }, [isMovePlayer, selectedSrcCardToMove])

  useEffect(() => {
    if (canvasRef.current && widthGame !== 0 && widthGame !== 0 && trumpCard) {
      if (ctx) {
        DeskCard(ctx, widthGame, heightGame, deckCards)
      }
    }
  }, [widthGame, heightGame, deckCards])

  useEffect(() => {
    if (
      canvasRef.current &&
      widthGame !== 0 &&
      widthGame !== 0 &&
      botCards.length !== 0
    ) {
      if (ctx) {
        const wait = debounce(() => {
          CardsGame(
            ctx,
            widthGame,
            heightGame,
            false,
            botCards,
            setSelectedSrcCardToMove,
            isMovePlayer,
          )
        }, 1000)
        wait()
      }
    }
  }, [widthGame, heightGame, botCards])

  useEffect(() => {
    if (
      canvasRef.current &&
      widthGame !== 0 &&
      widthGame !== 0 &&
      playerCards.length !== 0
    ) {
      if (ctx) {
        const wait = debounce(() => {
          CardsGame(
            ctx,
            widthGame,
            heightGame,
            true,
            playerCards,
            setSelectedSrcCardToMove,
            isMovePlayer,
          )
        }, 700)
        wait()
      }
    }
  }, [widthGame, heightGame, playerCards, isMovePlayer])

  useEffect(() => {
    if (
      canvasRef.current &&
      widthGame !== 0 &&
      widthGame !== 0 &&
      battleCards.length !== 0
    ) {
      if (ctx) {
        const wait = debounce(() => {
          const t = debounce(() => {
            BattleField(ctx, widthGame, heightGame, battleCards)
          }, 500)
          t()
          setNoticeText('')
        }, 800)
        wait()
      }
    }
  }, [widthGame, heightGame, battleCards])

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
