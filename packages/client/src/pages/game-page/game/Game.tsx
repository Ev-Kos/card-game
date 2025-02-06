import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  closedCard,
  LOGO_HEIGHT,
  PADDING_GAME_PAGE,
} from '../utils/constans'
import { DeskCard } from '../deck-cards/DeckCards'
import { useWindowSize } from '../hooks/hooks'
import styles from './Game.module.css'
import {
  BUTTON_TEXT,
  checkCard,
  checkCardToAdd,
  debounce,
  deleteField,
  findCard,
  findCartToAdd,
  findMinCard,
  getRect,
  initialDeskCard,
  newCards,
  NOTICEGAME,
  shuffle,
  spritesLoaded,
  TBattleCart,
  TCard,
  TRect,
  trimStr,
} from '../utils/game-helpers'
import { CardsGame } from '../cards-game/CardsGame'
import { NoticeGame } from '../notice-game/NoticeGame'
import { BattleField } from '../battle-field/BattleField'
import { Button } from '../../../shared/button'
import { Card } from '../card/card'

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
  const [leftCards, setLeftCards] = useState<TBattleCart[]>([])
  const [buttonText, setButtonText] = useState('')
  console.log(22)
  useEffect(() => {
    setWidthGame(Math.round(width - (width * PADDING_GAME_PAGE * 2) / 100))
    setHeightGame(Math.round(height - LOGO_HEIGHT - 30))
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
      const wait = debounce(() => {
        setDeckCards(deckCards.slice(0, length * 2))
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
            const t = debounce(() => {
              setMoveBot(true)
            }, 1400)
            t()
            setNoticeText(NOTICEGAME.firstMoveBot)
          }
        } else {
          if (isFinite(minTrumpCardBot)) {
            const t = debounce(() => {
              setMoveBot(true)
            }, 1400)
            t()
            setNoticeText(NOTICEGAME.firstMoveBot)
          } else {
            setMovePlayer(true)
            setNoticeText(NOTICEGAME.firstMovePlayer)
          }
        }
      }, 900)
      wait()
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
        const t = debounce(() => {
          setButtonText(BUTTON_TEXT.ITake)
        }, 900)
        t()
      } else {
        if (battleCards.length !== 0 && battleCards[0].isPlayer === true) {
          if (findCard(battleCards, botCards, trumpCard)) {
            const card = findCard(battleCards, botCards, trumpCard)
            if (card) {
              const wait = debounce(() => {
                setBattleCards([...battleCards, card])
                setBotCards(botCards.filter(item => item.id !== card.id))
                const t = debounce(() => {
                  setButtonText(BUTTON_TEXT.Ok)
                }, 1800)
                t()
              }, 900)
              wait()
              setMoveBot(false)
              setMovePlayer(true)
            }
          } else {
            const t = debounce(() => {
              setButtonText(BUTTON_TEXT.HeTake)
            }, 900)
            t()
            setMoveBot(false)
            setMovePlayer(true)
          }
        }
        if (battleCards.length !== 0 && battleCards[0].isPlayer === false) {
          const cardToAdd = shuffle(
            findCartToAdd(botCards, battleCards, trumpCard, deckCards),
          )[0]
          if (cardToAdd) {
            const wait = debounce(() => {
              setBattleCards([...battleCards, cardToAdd])
              setBotCards(botCards.filter(item => item.id !== cardToAdd.id))
            }, 900)
            wait()
            setMoveBot(false)
            setMovePlayer(true)
          } else {
            setButtonText('')
            const waitDeckCards = debounce(() => {
              setBattleCards([])
              setLeftCards([...leftCards, ...battleCards])
              newCards(
                deckCards,
                playerCards,
                botCards,
                battleCards,
                setDeckCards,
                setPlayerCards,
                setBotCards,
              )
              const transferMove = debounce(() => {
                setMoveBot(false)
                setMovePlayer(true)
              }, 900)
              transferMove()
            }, 600)
            waitDeckCards()
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
            if (buttonText === BUTTON_TEXT.HeTake) {
              setMoveBot(false)
              setMovePlayer(true)
            } else {
              setMoveBot(true)
              setMovePlayer(false)
            }
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
            if (buttonText === BUTTON_TEXT.HeTake) {
              setMoveBot(false)
            } else {
              setMoveBot(true)
            }
            setMovePlayer(false)
          }
        }
      }
    }
  }, [isMovePlayer, selectedSrcCardToMove])

  useEffect(() => {
    if (canvasRef.current && widthGame !== 0 && heightGame !== 0 && trumpCard) {
      if (ctx) {
        //const arr:any = []
        DeskCard(ctx, widthGame, heightGame, deckCards, trumpCard, false)
      }
    }
  }, [widthGame, heightGame, deckCards])

  useEffect(() => {
    if (canvasRef.current && widthGame !== 0 && heightGame !== 0 && trumpCard) {
      if (ctx) {
        const wait = debounce(() => {
          DeskCard(ctx, widthGame, heightGame, leftCards, trumpCard, true)
        }, 1100)

        wait()
      }
    }
  }, [widthGame, heightGame, leftCards])

  useEffect(() => {
    if (
      canvasRef.current &&
      widthGame !== 0 &&
      heightGame !== 0 &&
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
        }, 800)
        wait()
      }
    }
  }, [widthGame, heightGame, botCards])

  useEffect(() => {
    if (canvasRef.current && widthGame !== 0 && heightGame !== 0) {
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
        }, 800)
        wait()
      }
    }
  }, [widthGame, heightGame, playerCards, isMovePlayer])

  useEffect(() => {
    if (canvasRef.current && widthGame !== 0 && heightGame !== 0) {
      if (ctx) {
        const wait = debounce(() => {
          const t = debounce(() => {
            BattleField(ctx, widthGame, heightGame, battleCards)
          }, 400)
          t()
          setNoticeText('')
        }, 700)
        wait()
      }
    }
  }, [widthGame, heightGame, battleCards])

  const clickButton = () => {
    const newBattleCards = battleCards.map(item =>
      deleteField(item, 'isPlayer'),
    )
    setBattleCards([])
    if (buttonText === BUTTON_TEXT.HeTake) {
      setButtonText('')
      const waitDeckCards = debounce(() => {
        const arr = [...botCards, ...newBattleCards]
        //@ts-ignore
        setBotCards(arr)
        //@ts-ignore
        newCards(
          deckCards,
          playerCards,
          //@ts-ignore
          arr,
          battleCards,
          setDeckCards,
          setPlayerCards,
          setBotCards,
        )
        const transferMove = debounce(() => {
          setMoveBot(false)
          setMovePlayer(true)
        }, 900)
        transferMove()
      }, 600)
      waitDeckCards()
    }
    if (buttonText === BUTTON_TEXT.ITake) {
      setButtonText('')
      const waitDeckCards = debounce(() => {
        const arr = [...playerCards, ...newBattleCards]
        //@ts-ignore
        setPlayerCards(arr)
        //@ts-ignore
        newCards(
          deckCards,
          //@ts-ignore
          arr,
          botCards,
          battleCards,
          setDeckCards,
          setPlayerCards,
          setBotCards,
        )
        const transferMove = debounce(() => {
          setMoveBot(true)
          setMovePlayer(false)
        }, 900)
        transferMove()
      }, 600)
      waitDeckCards()
    }
    if (buttonText === BUTTON_TEXT.Ok) {
      setButtonText('')
      const waitDeckCards = debounce(() => {
        setBattleCards([])
        setLeftCards([...leftCards, ...battleCards])
        newCards(
          deckCards,
          playerCards,
          botCards,
          battleCards,
          setDeckCards,
          setPlayerCards,
          setBotCards,
        )

        const transferMove = debounce(() => {
          setMoveBot(true)
          setMovePlayer(false)
        }, 900)
        transferMove()
      }, 600)
      waitDeckCards()
    }
  }

  return (
    <div className={styles.game}>
      <canvas
        width={widthGame}
        height={heightGame}
        ref={canvasRef}
        id="canvas"
      />
      {isNoticeText.length !== 0 && <NoticeGame text={isNoticeText} />}
      <div className={styles.button}>
        {buttonText.length !== 0 && (
          <Button onClick={clickButton}>
            <p className={styles.buttonText}>{buttonText}</p>
          </Button>
        )}
      </div>
    </div>
  )
}
