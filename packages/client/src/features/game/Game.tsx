import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { TBattleCart, TCard } from './types'
import { useWindowSize } from '../../shared/hooks/useWindowSize'
import imports from './imports'
import { button_text, cards, colors, notice_game } from './assets'
import { BeforeGame } from './before-game/before-game'
import { EndGame } from '../../entities/end-game/end-game'
import { findCard } from './helpers'
import { useMusic } from '../../shared/hooks/useMusic'
import { InputRange } from '../../shared/input-range/input-range'
import { useSelector } from 'react-redux'
import { getUser } from '../../shared/store/selectors/userSelector'
import { addUserToLeaderBoard } from '../../shared/hooks/api/leaderboard'
import { teamName } from '../../assets/assets'
import { leaderboardSelectors } from '../../shared/store/selectors/leaderboardSelector'
import { useAppDispatch } from '../../shared/store/store'
import { fetchLeaderboard } from '../../shared/store/slices/leaderboardSlise'

const limit = 100

export const Game = () => {
  const [widthGame, setWidthGame] = useState(0)
  const [heightGame, setHeightGame] = useState(0)
  const [isStartGame, setStartGame] = useState(false)
  const [deckCards, setDeckCards] = useState<TCard[]>([])
  const [trumpCard, setTrumpCard] = useState<TCard | null>(null)

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
  const [isPlayer, setPlayer] = useState<boolean | undefined>(undefined)

  const [backgroundBoard, setBackgroudBoard] = useState(colors[0].color)
  const [shirtCard, setShirtCard] = useState(cards[0].image)

  const [isShowGameResult, setShowGameResult] = useState(false)
  const [isPlayerWin, setPlayerWin] = useState(false)
  const [isNobodyWin, setNobodyWin] = useState(false)

  const [isGetCards, setGetCards] = useState(false)
  const [isPutCards, setPutCards] = useState(false)

  const [valueSoundMusic, setValueSoundMusic] = useState(1)
  const [valueSoundEffects, setValueSoundEffects] = useState(1)
  const [offset, setOffset] = useState(0)
  const [isGetLeaderboard, setIsGetLeaderboard] = useState(false)

  const userData = useSelector(getUser)
  const leaderboard = useSelector(leaderboardSelectors.getLeaderboard)
  const dispatch = useAppDispatch()

  useMusic({
    loop: true,
    src: 'music/soundtrack.mp3',
    conditional: isStartGame,
    volume: valueSoundMusic,
  })
  useMusic({
    src: 'music/defeatSound.mp3',
    conditional: isShowGameResult && !isPlayerWin,
    volume: valueSoundEffects,
  })
  useMusic({
    src: 'music/winSound.mp3',
    conditional: isShowGameResult && isPlayerWin,
    volume: valueSoundEffects,
  })
  useMusic({
    src: 'music/getCards.mp3',
    conditional: isGetCards,
    volume: valueSoundEffects,
  })
  useMusic({
    src: 'music/putCard.mp3',
    conditional: isPutCards,
    volume: valueSoundEffects,
  })

  const endGame =
    (playerCards.length === 0 || botCards.length === 0) &&
    deckCards.length === 0

  useEffect(() => {
    if (!isPlayerWin) return
    const updateLeaderboard = async (
      newWins: number,
      user: typeof userData,
    ) => {
      const data = {
        data: {
          login_deckMasters: user?.login || '',
          avatarUrl: user?.avatar || null,
          numberOfWins: newWins,
        },
        ratingFieldName: 'numberOfWins',
        teamName: teamName,
      }

      try {
        await addUserToLeaderBoard(data)
        localStorage.setItem('wins', String(newWins))
      } catch (e) {
        console.error('Ошибка addUserToLeaderboard:', e)
      }
    }

    const handleNewUser = async () => {
      if (leaderboard.length % limit === 0 && leaderboard.length !== 0) {
        setOffset(prev => prev + limit)
        setIsGetLeaderboard(true)
      } else {
        localStorage.setItem('wins', '1')
        await updateLeaderboard(1, userData)
      }
    }

    const handleExistingUser = async () => {
      const storedWins = Number(localStorage.getItem('wins')) || 0
      const leaderboardUser = leaderboard.find(
        item => item.data.login_deckMasters === userData?.login,
      )
      if (leaderboardUser) {
        const newWins = leaderboardUser.data.numberOfWins + 1
        await updateLeaderboard(newWins, userData)
      } else if (storedWins > 0) {
        const newWins = storedWins + 1
        await updateLeaderboard(newWins, userData)
      } else {
        await handleNewUser()
      }
    }

    const executeUpdate = async () => {
      const storedWins = localStorage.getItem('wins')

      if (storedWins && userData) {
        await updateLeaderboard(Number(storedWins) + 1, userData)
      } else {
        await handleExistingUser()
      }
    }

    executeUpdate()
  }, [isPlayerWin, leaderboard])

  useEffect(() => {
    if (!isGetLeaderboard) return
    const getLeaderboard = async () => {
      try {
        const data = {
          ratingFieldName: 'login_deckMasters',
          cursor: offset,
          limit: limit,
        }
        await dispatch(fetchLeaderboard({ data, teamName }))
        setIsGetLeaderboard(false)
      } catch (e) {
        console.error('Ошибка getLeaderboard:', e)
      }
    }
    getLeaderboard()
  }, [isGetLeaderboard])

  useEffect(() => {
    if (deckCards.length !== 0) return
    if (botCards.length === 0 && playerCards.length === 1 && trumpCard) {
      const card = findCard(battleCards, playerCards, trumpCard)
      if (card) {
        setNobodyWin(true)
      }
    }
    if (playerCards.length === 0 && botCards.length === 1 && trumpCard) {
      const card = findCard(battleCards, botCards, trumpCard)
      if (card) {
        setNobodyWin(true)
      }
    }
    if (botCards.length === 0 && playerCards.length > 1) {
      setPlayerWin(false)
    }
    if (playerCards.length === 0 && botCards.length > 1) {
      setPlayerWin(true)
    }
  }, [botCards, playerCards, deckCards])

  useEffect(() => {
    setWidthGame(Math.round(width - (width * 5 * 2) / 100))
    setHeightGame(Math.round(height - imports.LOGO_HEIGHT - 30))
  }, [width, height])

  const onClickStart = () => {
    setStartGame(true)
    setBotCards([])
    setPlayerCards([])
    setLeftCards([])
    setBattleCards([])
    setTrumpCard(null)
    setMoveBot(false)
    setMovePlayer(false)
    setPlayer(false)
    setPlayerWin(false)
    setNobodyWin(false)
    if (leaderboard.length === 0) {
      setIsGetLeaderboard(true)
    }
  }

  const onClickNewGame = () => {
    setShowGameResult(false)
  }

  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, widthGame, widthGame)
    }
  }, [widthGame, heightGame])

  useEffect(() => {
    if (isStartGame) {
      const arr = imports.shuffle(imports.initialDeckCard)
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
    if (!(playerCards.length !== 0 && botCards.length !== 0 && isFirstGetCards))
      return
    const length = playerCards.length + botCards.length
    const wait = imports.debounce(() => {
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
          setNoticeText(notice_game.firstMovePlayer)
        } else {
          const t = imports.debounce(() => {
            setMoveBot(true)
          }, 1000)
          t()
          setNoticeText(notice_game.firstMoveBot)
        }
      } else {
        if (isFinite(minTrumpCardBot)) {
          const t = imports.debounce(() => {
            setMoveBot(true)
          }, 1000)
          t()
          setNoticeText(notice_game.firstMoveBot)
        } else {
          setMovePlayer(true)
          setNoticeText(notice_game.firstMovePlayer)
        }
      }
      setGetCards(true)
    }, 1000)
    wait()
    setFirstGetCards(false)
  }, [playerCards, botCards, isFirstGetCards])

  useEffect(() => {
    if (!(isMoveBot && trumpCard && !endGame)) return
    setGetCards(false)
    if (battleCards.length === 0) {
      const cardToMove = imports.findMinCard(botCards, trumpCard)
      setBattleCards([...battleCards, cardToMove])
      setBotCards(botCards.filter(item => item.id !== cardToMove.id))
      setMoveBot(false)
      setMovePlayer(true)
      const t = imports.debounce(() => {
        setButtonText(button_text.ITake)
      }, 800)
      t()
    } else {
      if (battleCards.length !== 0 && battleCards[0].isPlayer === true) {
        if (imports.findCard(battleCards, botCards, trumpCard)) {
          const card = imports.findCard(battleCards, botCards, trumpCard)
          if (card) {
            const wait = imports.debounce(() => {
              setBattleCards([...battleCards, card])
              setBotCards(botCards.filter(item => item.id !== card.id))
              const t = imports.debounce(() => {
                setButtonText(button_text.Ok)
              }, 1700)
              t()
            }, 2000)
            wait()
            setMoveBot(false)
            setMovePlayer(true)
          }
        } else {
          const t = imports.debounce(() => {
            setButtonText(button_text.HeTake)
          }, 800)
          t()
          setMoveBot(false)
          setMovePlayer(true)
        }
      }
      if (battleCards.length !== 0 && battleCards[0].isPlayer === false) {
        const cardToAdd = imports.shuffle(
          imports.findCartToAdd(
            botCards,
            battleCards,
            trumpCard,
            deckCards.length,
          ),
        )[0]
        if (cardToAdd) {
          const wait = imports.debounce(() => {
            setBattleCards([...battleCards, cardToAdd])
            setBotCards(botCards.filter(item => item.id !== cardToAdd.id))
          }, 800)
          wait()
          setMoveBot(false)
          setMovePlayer(true)
        } else {
          setButtonText('')
          const waitDeckCards = imports.debounce(() => {
            setBattleCards([])
            setLeftCards([...leftCards, ...battleCards])
            imports.newCards(
              deckCards,
              playerCards,
              botCards,
              battleCards,
              setDeckCards,
              setPlayerCards,
              setBotCards,
            )
            const transferMove = imports.debounce(() => {
              setMoveBot(false)
              setMovePlayer(true)
              setGetCards(true)
            }, 800)
            transferMove()
          }, 500)
          waitDeckCards()
        }
      }
    }
  }, [isMoveBot, endGame])

  useEffect(() => {
    if (!(isMovePlayer && selectedSrcCardToMove.length !== 0 && !endGame))
      return
    setGetCards(false)
    const wait = imports.debounce(() => {
      setPlayer(true)
    }, 2000)
    wait()
    const selectedCard = playerCards.find(
      item =>
        imports.trimStr(item.image) === imports.trimStr(selectedSrcCardToMove),
    )
    if (selectedCard && trumpCard) {
      if (battleCards.length !== 0 && battleCards[0].isPlayer === false) {
        const checkResult = imports.checkCard(
          battleCards,
          selectedCard,
          trumpCard,
        )
        if (checkResult) {
          setPlayerCards(
            playerCards.filter(item => item.id !== selectedCard.id),
          )
          setBattleCards([...battleCards, { ...selectedCard, isPlayer: true }])
          setSelectedSrcCardToMove('')
          setMoveBot(true)
          setMovePlayer(false)
        }
      }
      if (battleCards.length === 0) {
        setPlayerCards(playerCards.filter(item => item.id !== selectedCard.id))
        setBattleCards([...battleCards, { ...selectedCard, isPlayer: true }])
        setSelectedSrcCardToMove('')
        setMoveBot(true)
        setMovePlayer(false)
      }
      if (battleCards.length !== 0 && battleCards[0].isPlayer === true) {
        const checkCard = imports.checkCardToAdd(selectedCard, battleCards)
        if (checkCard) {
          setPlayerCards(
            playerCards.filter(item => item.id !== selectedCard.id),
          )
          setBattleCards([...battleCards, { ...selectedCard, isPlayer: true }])
          setSelectedSrcCardToMove('')
          if (buttonText === button_text.HeTake) {
            setMoveBot(false)
            setMovePlayer(true)
          } else {
            setMoveBot(true)
            setMovePlayer(false)
          }
        }
      }
    }
  }, [isMovePlayer, selectedSrcCardToMove, endGame])

  useEffect(() => {
    if (trumpCard && ctx) {
      const wait = imports.debounce(() => {
        imports.DeckCard(
          ctx,
          widthGame,
          heightGame,
          deckCards,
          trumpCard,
          false,
          shirtCard,
        )
      }, 100)
      wait()
    }
  }, [deckCards, widthGame, height])

  useEffect(() => {
    if (ctx && trumpCard) {
      const wait = imports.debounce(() => {
        imports.DeckCard(
          ctx,
          widthGame,
          heightGame,
          leftCards,
          trumpCard,
          true,
          shirtCard,
        )
      }, 1000)
      wait()
    }
  }, [widthGame, heightGame, leftCards])

  useEffect(() => {
    if (ctx) {
      const wait = imports.debounce(() => {
        imports.CardsGame(
          ctx,
          widthGame,
          heightGame,
          false,
          botCards,
          setSelectedSrcCardToMove,
          isMovePlayer,
          shirtCard,
        )
        setGetCards(false)
      }, 700)
      wait()
    }
  }, [botCards, widthGame, heightGame])

  useEffect(() => {
    if (ctx) {
      const wait = imports.debounce(() => {
        imports.CardsGame(
          ctx,
          widthGame,
          heightGame,
          true,
          playerCards,
          setSelectedSrcCardToMove,
          isMovePlayer,
          shirtCard,
        )
      }, 700)
      wait()
    }
  }, [widthGame, heightGame, playerCards, isMovePlayer])

  useEffect(() => {
    if (ctx) {
      setPutCards(false)
      const wait = imports.debounce(() => {
        const t = imports.debounce(() => {
          imports.BattleField(ctx, widthGame, heightGame, battleCards)
        }, 300)
        t()
        setNoticeText('')
        if (battleCards.length !== 0) {
          setPutCards(true)
        }
      }, 600)
      wait()
    }
  }, [widthGame, heightGame, battleCards])

  const clickButton = () => {
    const newBattleCards = battleCards.map(item =>
      imports.deleteField(item, 'isPlayer'),
    )
    setBattleCards([])
    if (buttonText === button_text.HeTake) {
      setButtonText('')
      const waitDeckCards = imports.debounce(() => {
        const arr = [...botCards, ...newBattleCards] as TCard[]
        setBotCards(arr)
        imports.newCards(
          deckCards,
          playerCards,
          arr,
          battleCards,
          setDeckCards,
          setPlayerCards,
          setBotCards,
        )
        const transferMove = imports.debounce(() => {
          setMoveBot(false)
          setMovePlayer(true)
          setGetCards(true)
        }, 800)
        transferMove()
      }, 500)
      waitDeckCards()
    }
    if (buttonText === button_text.ITake) {
      setButtonText('')
      setPlayer(false)
      const waitDeckCards = imports.debounce(() => {
        const arr = [...playerCards, ...newBattleCards] as TCard[]
        setPlayerCards(arr)
        imports.newCards(
          deckCards,
          arr,
          botCards,
          battleCards,
          setDeckCards,
          setPlayerCards,
          setBotCards,
        )
        const transferMove = imports.debounce(() => {
          setMoveBot(true)
          setMovePlayer(false)
          setGetCards(true)
        }, 800)
        transferMove()
      }, 500)
      waitDeckCards()
    }
    if (buttonText === button_text.Ok) {
      setButtonText('')
      setPlayer(false)
      const waitDeckCards = imports.debounce(() => {
        setBattleCards([])
        setLeftCards([...leftCards, ...battleCards])
        imports.newCards(
          deckCards,
          playerCards,
          botCards,
          battleCards,
          setDeckCards,
          setPlayerCards,
          setBotCards,
        )
        const transferMove = imports.debounce(() => {
          setMoveBot(true)
          setMovePlayer(false)
          setGetCards(true)
        }, 800)
        transferMove()
      }, 500)
      waitDeckCards()
    }
  }

  useEffect(() => {
    if (endGame && trumpCard) {
      const wait = imports.debounce(() => {
        setStartGame(false)
        setShowGameResult(true)
        setButtonText('')
      }, 1800)
      wait()
    }
  }, [playerCards, botCards])

  const position = Math.round(
    (widthGame - playerCards.length * (imports.CARD_WIDTH + 15)) / 2,
  )

  const onChangeInputSound = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSoundMusic(Number(e.target.value))
    setValueSoundEffects(Number(e.target.value))
  }

  return (
    <div className={styles.game}>
      {!isStartGame && !isShowGameResult && (
        <BeforeGame
          onClickStart={onClickStart}
          setBackgroudBoard={setBackgroudBoard}
          setShirtCard={setShirtCard}
          setValueSoundMusic={setValueSoundMusic}
          valueSoundMusic={valueSoundMusic}
          setValueSoundEffects={setValueSoundEffects}
          valueSoundEffects={valueSoundEffects}
        />
      )}
      {isStartGame && (
        <div
          className={styles.gameBoard}
          style={{ background: backgroundBoard }}
          data-testid="game">
          <div className={styles.inputSound}>
            <InputRange
              valueSound={valueSoundMusic}
              onChange={onChangeInputSound}
              colorTrack="#3a3a3a"
            />
          </div>
          <canvas
            width={widthGame}
            height={heightGame}
            ref={canvasRef}
            id="canvas"
          />
          {isNoticeText.length !== 0 && !endGame && (
            <imports.NoticeGame text={isNoticeText} />
          )}
          {isPlayer &&
            isNoticeText.length === 0 &&
            battleCards.length === 0 &&
            !endGame && (
              <imports.NoticeGame
                className={styles.noticeToPlayer}
                text="Ваш ход"
                position={position}
              />
            )}
          <div className={styles.button}>
            {buttonText.length !== 0 && (
              <imports.Button
                onClick={clickButton}
                data-testid="button-player-action">
                <p className={styles.buttonText}>{buttonText}</p>
              </imports.Button>
            )}
          </div>
        </div>
      )}
      {isShowGameResult && (
        <EndGame
          isNobodyWin={isNobodyWin}
          isPlayerWin={isPlayerWin}
          onClick={onClickNewGame}
        />
      )}
    </div>
  )
}
