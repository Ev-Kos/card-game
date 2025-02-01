type TDeskCards = {
  id: number
  suit: string
  rang: string
  value: number
}

export const enum SUITS {
  CLUBS = '../../../../public/sprites/hearts.svg',
  DIAMONDS = '../../../../public/sprites/diamonds.svg',
  HEARTS = '../../../../public/sprites/hearts.svg',
  SPADES = '../../../../public/sprites/spades.svg',
}

export const rang = [
  {
    rang: 'T',
    value: 14,
  },
  {
    rang: 'K',
    value: 13,
  },
  {
    rang: 'Q',
    value: 12,
  },
  {
    rang: 'V',
    value: 11,
  },
  {
    rang: '10',
    value: 10,
  },
  {
    rang: '9',
    value: 9,
  },
  {
    rang: '8',
    value: 8,
  },
  {
    rang: '7',
    value: 7,
  },
  {
    rang: '6',
    value: 6,
  },
]

export const createDeskCards = () => {
  const res: TDeskCards[] = []
  rang.forEach(item => {
    res.push({
      id: res.length + 1,
      suit: SUITS.CLUBS,
      rang: item.rang,
      value: item.value,
    })
    res.push({
      id: res.length + 1,
      suit: SUITS.DIAMONDS,
      rang: item.rang,
      value: item.value,
    })
    res.push({
      id: res.length + 1,
      suit: SUITS.HEARTS,
      rang: item.rang,
      value: item.value,
    })
    res.push({
      id: res.length + 1,
      suit: SUITS.SPADES,
      rang: item.rang,
      value: item.value,
    })
  })
  return res
}
