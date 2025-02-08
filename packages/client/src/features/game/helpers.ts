import { Dispatch, SetStateAction } from 'react'
import { TBattleCart, TCard } from './types'

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

export const getRect = (canvas: HTMLCanvasElement, e: MouseEvent) => {
  const rect = canvas.getBoundingClientRect(),
    xMouse = e.clientX - rect.left,
    yMouse = e.clientY - rect.top

  return { xMouse, yMouse }
}

export const findMinCard = (arr: TCard[], trumpCard: TCard): TBattleCart => {
  let cardsToMove: TBattleCart
  const trumpCards: TCard[] = []
  const otherCards: TCard[] = []

  arr.forEach(item => {
    item.suit === trumpCard.suit ? trumpCards.push(item) : otherCards.push(item)
  })

  const minValue =
    otherCards.length !== 0
      ? otherCards.sort((a, b) => a.value - b.value)[0].value
      : trumpCards.sort((a, b) => a.value - b.value)[0].value

  otherCards.length !== 0
    ? (cardsToMove = otherCards
        .filter(item => item.value === minValue)
        .map(el => {
          return { ...el, isPlayer: false }
        })[0])
    : (cardsToMove = trumpCards
        .filter(item => item.value === minValue)
        .map(el => {
          return { ...el, isPlayer: false }
        })[0])

  return cardsToMove
}

export const findCard = (
  arrBattle: TBattleCart[],
  arrBotCard: TCard[],
  trumpCard: TCard,
) => {
  const card = arrBattle.at(-1)

  const similarSuit = arrBotCard
    .filter(item => item.suit === card?.suit)
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

  if (card && card.suit !== trumpCard.suit) {
    const foundCard = similarSuit.find(item => item.value > card.value)
    foundCard ? foundCard : trumpCards[0]
  }
  return trumpCards.find(item => item.value > Number(card?.value))
}

export const findCartToAdd = (
  arrBotCard: TCard[],
  arrBattle: TBattleCart[],
  trumpCard: TCard,
  deckCards: TCard[],
): TBattleCart[] => {
  const res: TBattleCart[] = []
  const botBattleCards: string[] = []
  const playerBattleCards: string[] = []
  arrBattle.forEach(item => {
    !item.isPlayer
      ? botBattleCards.push(item.rang)
      : playerBattleCards.push(item.rang)
  })

  const botCardNotTrump = arrBotCard.filter(
    item => item.suit !== trumpCard.suit,
  )

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
const pathSprites = 'deck/'
export const trimStr = (str: string, trimValue = pathSprites) => {
  const i = str.indexOf(pathSprites)
  return str.slice(i + trimValue.length)
}

export const deleteField = (obj: TBattleCart | TCard, key: string) => {
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
