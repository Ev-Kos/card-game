export type TCard = {
  id: number
  suit: string
  rang: string
  value: number
  image: string
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

export const shuffle = (array: TCard[]) => {
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
