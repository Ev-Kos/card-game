import { Dispatch, SetStateAction } from 'react'

export type TCard = {
  id: number
  suit: string
  rang: string
  value: number
  image: string
}

export type TBattleCart = {
  id: number
  suit: string
  rang: string
  value: number
  image: string
  isPlayer: boolean
}

export type TRect = {
  x: number
  y: number
  image: HTMLImageElement
}

export const enum SUITS {
  CLUBS = 'clubs',
  DIAMONDS = 'diamonds',
  HEARTS = 'hearts',
  SPADES = 'spades',
}

export const initialDeskCard = [
  {
    id: 1,
    suit: SUITS.CLUBS,
    rang: 'A',
    value: 14,
    image: '../../../../public/sprites/deck/A-clubs.png',
  },
  {
    id: 2,
    suit: SUITS.DIAMONDS,
    rang: 'A',
    value: 14,
    image: '../../../../public/sprites/deck/A-diamonds.png',
  },
  {
    id: 3,
    suit: SUITS.HEARTS,
    rang: 'A',
    value: 14,
    image: '../../../../public/sprites/deck/A-hearts.png',
  },
  {
    id: 4,
    suit: SUITS.SPADES,
    rang: 'A',
    value: 14,
    image: '../../../../public/sprites/deck/A-spades.png',
  },
  {
    id: 5,
    suit: SUITS.CLUBS,
    rang: 'K',
    value: 13,
    image: '../../../../public/sprites/deck/K-clubs.png',
  },
  {
    id: 6,
    suit: SUITS.DIAMONDS,
    rang: 'K',
    value: 13,
    image: '../../../../public/sprites/deck/K-diamonds.png',
  },
  {
    id: 7,
    suit: SUITS.HEARTS,
    rang: 'K',
    value: 13,
    image: '../../../../public/sprites/deck/K-hearts.png',
  },
  {
    id: 8,
    suit: SUITS.SPADES,
    rang: 'K',
    value: 13,
    image: '../../../../public/sprites/deck/K-spades.png',
  },
  {
    id: 9,
    suit: SUITS.CLUBS,
    rang: 'Q',
    value: 12,
    image: '../../../../public/sprites/deck/Q-clubs.png',
  },
  {
    id: 10,
    suit: SUITS.DIAMONDS,
    rang: 'Q',
    value: 12,
    image: '../../../../public/sprites/deck/Q-diamonds.png',
  },
  {
    id: 11,
    suit: SUITS.HEARTS,
    rang: 'Q',
    value: 12,
    image: '../../../../public/sprites/deck/Q-hearts.png',
  },
  {
    id: 12,
    suit: SUITS.SPADES,
    rang: 'Q',
    value: 12,
    image: '../../../../public/sprites/deck/Q-spades.png',
  },
  {
    id: 13,
    suit: SUITS.CLUBS,
    rang: 'J',
    value: 11,
    image: '../../../../public/sprites/deck/J-clubs.png',
  },
  {
    id: 14,
    suit: SUITS.DIAMONDS,
    rang: 'J',
    value: 11,
    image: '../../../../public/sprites/deck/J-diamonds.png',
  },
  {
    id: 15,
    suit: SUITS.HEARTS,
    rang: 'J',
    value: 11,
    image: '../../../../public/sprites/deck/J-hearts.png',
  },
  {
    id: 16,
    suit: SUITS.SPADES,
    rang: 'J',
    value: 11,
    image: '../../../../public/sprites/deck/J-spades.png',
  },
  {
    id: 17,
    suit: SUITS.CLUBS,
    rang: '10',
    value: 10,
    image: '../../../../public/sprites/deck/10-clubs.png',
  },
  {
    id: 18,
    suit: SUITS.DIAMONDS,
    rang: '10',
    value: 10,
    image: '../../../../public/sprites/deck/10-diamonds.png',
  },
  {
    id: 19,
    suit: SUITS.HEARTS,
    rang: '10',
    value: 10,
    image: '../../../../public/sprites/deck/10-hearts.png',
  },
  {
    id: 20,
    suit: SUITS.SPADES,
    rang: '10',
    value: 10,
    image: '../../../../public/sprites/deck/10-spades.png',
  },
  {
    id: 21,
    suit: SUITS.CLUBS,
    rang: '9',
    value: 9,
    image: '../../../../public/sprites/deck/9-clubs.png',
  },
  {
    id: 22,
    suit: SUITS.DIAMONDS,
    rang: '9',
    value: 9,
    image: '../../../../public/sprites/deck/9-diamonds.png',
  },
  {
    id: 23,
    suit: SUITS.HEARTS,
    rang: '9',
    value: 9,
    image: '../../../../public/sprites/deck/9-hearts.png',
  },
  {
    id: 24,
    suit: SUITS.SPADES,
    rang: '9',
    value: 9,
    image: '../../../../public/sprites/deck/9-spades.png',
  },
  {
    id: 25,
    suit: SUITS.CLUBS,
    rang: '8',
    value: 8,
    image: '../../../../public/sprites/deck/8-clubs.png',
  },
  {
    id: 26,
    suit: SUITS.DIAMONDS,
    rang: '8',
    value: 8,
    image: '../../../../public/sprites/deck/8-diamonds.png',
  },
  {
    id: 27,
    suit: SUITS.HEARTS,
    rang: '8',
    value: 8,
    image: '../../../../public/sprites/deck/8-hearts.png',
  },
  {
    id: 28,
    suit: SUITS.SPADES,
    rang: '8',
    value: 8,
    image: '../../../../public/sprites/deck/8-spades.png',
  },
  {
    id: 29,
    suit: SUITS.CLUBS,
    rang: '7',
    value: 7,
    image: '../../../../public/sprites/deck/7-clubs.png',
  },
  {
    id: 30,
    suit: SUITS.DIAMONDS,
    rang: '7',
    value: 7,
    image: '../../../../public/sprites/deck/7-diamonds.png',
  },
  {
    id: 31,
    suit: SUITS.HEARTS,
    rang: '7',
    value: 7,
    image: '../../../../public/sprites/deck/7-hearts.png',
  },
  {
    id: 32,
    suit: SUITS.SPADES,
    rang: '7',
    value: 7,
    image: '../../../../public/sprites/deck/7-spades.png',
  },
  {
    id: 33,
    suit: SUITS.CLUBS,
    rang: '6',
    value: 6,
    image: '../../../../public/sprites/deck/6-clubs.png',
  },
  {
    id: 34,
    suit: SUITS.DIAMONDS,
    rang: '6',
    value: 6,
    image: '../../../../public/sprites/deck/6-diamonds.png',
  },
  {
    id: 35,
    suit: SUITS.HEARTS,
    rang: '6',
    value: 6,
    image: '../../../../public/sprites/deck/6-hearts.png',
  },
  {
    id: 36,
    suit: SUITS.SPADES,
    rang: '6',
    value: 6,
    image: '../../../../public/sprites/deck/6-spades.png',
  },
]

export const debounce = (callback: any, delay: number) => {
  let timeoutId: any = null
  return (...args: any) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export const shuffle = (array: any[]) => {
  const newArr = array.slice()
  let m = newArr.length,
    t,
    i

  while (m) {
    i = Math.floor(Math.random() * m--)

    t = newArr[m]
    newArr[m] = newArr[i]
    newArr[i] = t
  }

  return newArr
}

export const spritesLoaded = (arr: string[]) => {
  const promises = arr.map(async url => {
    const img = new Image()
    img.src = url
    await img.decode()
    return img
  })
  return promises
}

export const enum NOTICEGAME {
  firstMoveBot = 'Первым ходит противник',
  firstMovePlayer = 'Вы ходите первым',
  moveBot = 'Ход противника',
  movePlayer = 'Ваш ход',
}

export const getRect = (canvas: HTMLCanvasElement, e: MouseEvent) => {
  const rect = canvas.getBoundingClientRect(),
    xMouse = e.clientX - rect.left,
    yMouse = e.clientY - rect.top

  return { xMouse, yMouse }
}

export const findMinCard = (arr: TCard[], trumpCard: TCard): TBattleCart => {
  let cardsToMove: TBattleCart
  const trumpCards = arr.filter(item => item.suit === trumpCard.suit)
  const otherCards = arr.filter(item => item.suit !== trumpCard.suit)
  if (otherCards.length !== 0) {
    const minValue = otherCards.sort((a, b) => a.value - b.value)[0].value
    cardsToMove = otherCards
      .filter(item => item.value === minValue)
      .map(el => {
        return { ...el, isPlayer: false }
      })[0]
  } else {
    const minValue = trumpCards.sort((a, b) => a.value - b.value)[0].value
    cardsToMove = trumpCards
      .filter(item => item.value === minValue)
      .map(el => {
        return { ...el, isPlayer: false }
      })[0]
  }
  return cardsToMove
}

export const findCard = (
  arrBattle: TBattleCart[],
  arrBotCard: TCard[],
  trumpCard: TCard,
) => {
  const card = arrBattle[arrBattle.length - 1]

  const similarSuit = arrBotCard
    .filter(item => item.suit === card.suit)
    .sort((a, b) => a.value - b.value)
    .map(el => {
      return { ...el, isPlayer: false }
    })

  const trumpCards = arrBotCard
    .filter(item => item.suit === trumpCard.suit)
    .sort((a, b) => a.value - b.value)
    .map(el => {
      return { ...el, isPlayer: false }
    })

  if (card.suit !== trumpCard.suit) {
    if (similarSuit.length !== 0) {
      const foundCard = similarSuit.find(item => item.value > card.value)
      if (foundCard) {
        return foundCard
      } else {
        return trumpCards[0]
      }
    }
  } else {
    if (trumpCards.length !== 0) {
      const foundCard = trumpCards.find(item => item.value > card.value)
      if (foundCard) {
        return foundCard
      }
    }
  }
}

export const findCartToAdd = (
  arrBotCard: TCard[],
  arrBattle: TBattleCart[],
  trumpCard: TCard,
  deckCards: TCard[],
): TBattleCart[] => {
  const res: TBattleCart[] = []
  const botBattleCards = arrBattle
    .filter(item => !item.isPlayer)
    .map(item => item.rang)
  const botCardNotTrump = arrBotCard.filter(
    item => item.suit !== trumpCard.suit,
  )
  const playerBattleCards = arrBattle
    .filter(item => item.isPlayer)
    .map(item => item.rang)
  if (deckCards.length !== 0) {
    botCardNotTrump.forEach(item => {
      if (
        botBattleCards.includes(item.rang) ||
        playerBattleCards.includes(item.rang)
      ) {
        res.push({ ...item, isPlayer: false })
      }
    })
  } else {
    arrBotCard.forEach(item => {
      if (
        botBattleCards.includes(item.rang) ||
        playerBattleCards.includes(item.rang)
      ) {
        res.push({ ...item, isPlayer: false })
      }
    })
  }

  return res
}

export const checkCardToAdd = (
  playerCard: TCard,
  arrBattle: TBattleCart[],
): boolean => {
  const battleCards = arrBattle.map(item => item.rang)
  if (battleCards.includes(playerCard.rang)) {
    return true
  }
  return false
}

export const checkCard = (
  arr: TBattleCart[],
  card: TCard,
  trumpCard: TCard,
): boolean => {
  const lastCardArr = arr[arr.length - 1]
  if (lastCardArr.suit === card.suit && lastCardArr.value < card.value) {
    return true
  }
  if (lastCardArr.suit !== trumpCard.suit && card.suit === trumpCard.suit) {
    return true
  }
  if (
    lastCardArr.suit === trumpCard.suit &&
    card.suit === trumpCard.suit &&
    lastCardArr.value < card.value
  ) {
    return true
  }
  return false
}

export const trimStr = (str: string, trimValue = 'deck/') => {
  const i = str.indexOf(trimValue)
  return str.slice(i + trimValue.length)
}

export const enum BUTTON_TEXT {
  ITake = 'Беру',
  HeTake = 'Пусть берет',
  Ok = 'Бито',
}

export const deleteField = (obj: TBattleCart, key: string) => {
  if (!(key in obj)) {
    return obj
  }
  return Object.fromEntries(Object.entries(obj).filter(([k]) => k !== key))
}

export const newCards = (
  deckCards: TCard[],
  playerCards: TCard[],
  botCards: TCard[],
  battleCards: TBattleCart[],
  setDeckCards: Dispatch<SetStateAction<TCard[]>>,
  setPlayerCards: Dispatch<SetStateAction<TCard[]>>,
  setBotCards: Dispatch<SetStateAction<TCard[]>>,
) => {
  if (deckCards.length !== 0) {
    let length = 0
    if (battleCards[0].isPlayer) {
      if (playerCards.length < 6) {
        const cards = deckCards.slice(
          deckCards.length - (6 - playerCards.length),
          deckCards.length,
        )
        const waitNewCards = debounce(() => {
          setPlayerCards([...playerCards, ...cards])
        }, 500)
        waitNewCards()
        length = cards.length
      }
      if (botCards.length < 6) {
        const cards = deckCards.slice(
          deckCards.length - (6 - playerCards.length) - (6 - botCards.length),
          deckCards.length - (6 - playerCards.length),
        )
        const waitNewCards = debounce(() => {
          setBotCards([...botCards, ...cards])
        }, 500)
        waitNewCards()
        length = length + cards.length
      }
      setDeckCards(deckCards.slice(0, deckCards.length - length))
    }
    if (!battleCards[0].isPlayer) {
      if (botCards.length < 6) {
        const cards = deckCards.slice(
          deckCards.length - (6 - botCards.length),
          deckCards.length,
        )
        const waitNewCards = debounce(() => {
          setBotCards([...botCards, ...cards])
        }, 500)
        waitNewCards()
        length = cards.length
      }
      if (playerCards.length < 6) {
        const cards = deckCards.slice(
          deckCards.length - (6 - playerCards.length) - (6 - botCards.length),
          deckCards.length - (6 - botCards.length),
        )
        const waitNewCards = debounce(() => {
          setPlayerCards([...playerCards, ...cards])
        }, 500)
        waitNewCards()
        length = length + cards.length
      }
      setDeckCards(deckCards.slice(0, deckCards.length - length))
    }
  }
}
