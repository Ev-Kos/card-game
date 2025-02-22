import { initialDeckCard, suits } from './assets'
import {
  checkCardToAdd,
  findCard,
  findCartToAdd,
  findMinCard,
  shuffle,
} from './helpers'

const cards = [
  {
    id: 28,
    suit: suits.spades,
    rang: '8',
    value: 8,
    image: 'sprites/deck/8-spades.png',
  },
  {
    id: 2,
    suit: suits.hearts,
    rang: '8',
    value: 8,
    image: 'sprites/deck/8-hearts.png',
  },
  {
    id: 3,
    suit: suits.spades,
    rang: 'J',
    value: 11,
    image: 'sprites/deck/J-spades.png',
  },
  {
    id: 4,
    suit: suits.hearts,
    rang: 'Q',
    value: 12,
    image: 'sprites/deck/Q-hearts.png',
  },
  {
    id: 5,
    suit: suits.spades,
    rang: 'K',
    value: 13,
    image: 'sprites/deck/K-spades.png',
  },
  {
    id: 29,
    suit: suits.clubs,
    rang: '7',
    value: 7,
    image: 'sprites/deck/7-clubs.png',
  },
]

const trumpCard = {
  id: 36,
  suit: suits.spades,
  rang: '6',
  value: 6,
  image: 'sprites/deck/6-spades.png',
}

describe('Тестирование функций игры', () => {
  it('Функция перемешивания карт (shuffle)', () => {
    const shuffleArr = shuffle(initialDeckCard)
    expect(shuffleArr).not.toEqual(initialDeckCard)
  })

  it('Функция поиска минимальной карты для хода компьютера (findMinCard)', () => {
    const card = findMinCard(cards, trumpCard)
    expect(card.rang).toBe('7')
    expect(card.suit).toBe(suits.clubs)
  })

  it('Функция поиска карты возвращает карту, которой компьютер может отбиться (findCard), если она есть', () => {
    const battleCard = [
      {
        id: 31,
        suit: suits.hearts,
        rang: '7',
        value: 7,
        image: 'sprites/deck/7-hearts.png',
        isPlayer: true,
      },
    ]
    const card = findCard(battleCard, cards, trumpCard)
    expect(card?.rang).toBe('8')
    expect(card?.suit).toBe(suits.hearts)
  })

  it('Функция поиска карты, не возвращает карту, которой компьютер может отбиться (findCard), если ее нет', () => {
    const battleCard = [
      {
        id: 4,
        suit: suits.spades,
        rang: 'A',
        value: 14,
        image: 'sprites/deck/A-spades.png',
        isPlayer: true,
      },
    ]
    const card = findCard(battleCard, cards, trumpCard)
    expect(card).toBeUndefined
  })

  it('Функция подкидывания карт, возвращает не козырную карту, если есть подходящая (findCartToAdd) и основная колода не пустая', () => {
    const battleCard = [
      {
        id: 26,
        suit: suits.diamonds,
        rang: '8',
        value: 8,
        image: 'sprites/deck/8-diamonds.png',
        isPlayer: true,
      },
    ]
    const card = findCartToAdd(cards, battleCard, trumpCard, 5)
    expect(card[0].rang).toBe('8')
    expect(card[0].suit).toBe(suits.hearts)
  })

  it('Функция подкидывания карт, возвращает козырную карту, если есть подходящая (findCartToAdd) и основная колода пуста', () => {
    const battleCard = [
      {
        id: 7,
        suit: suits.hearts,
        rang: 'K',
        value: 13,
        image: 'sprites/deck/K-hearts.png',
        isPlayer: true,
      },
    ]
    const card = findCartToAdd(cards, battleCard, trumpCard, 0)
    expect(card[0].rang).toBe('K')
    expect(card[0].suit).toBe(suits.spades)
  })

  it('Функция подкидывания карт, возвращает пустой массив, если нет подходящей карты (findCartToAdd)', () => {
    const battleCard = [
      {
        id: 4,
        suit: suits.spades,
        rang: 'A',
        value: 14,
        image: 'sprites/deck/A-spades.png',
        isPlayer: true,
      },
    ]
    const card = findCartToAdd(cards, battleCard, trumpCard, 5)
    expect(card).toHaveLength(0)
  })

  it('Функция проверяет может ли игрок использовать выбранную карту для того, что бы подкинуть ее (checkCardToAdd)', () => {
    const battleCard = [
      {
        id: 26,
        suit: suits.diamonds,
        rang: '8',
        value: 8,
        image: 'sprites/deck/8-diamonds.png',
        isPlayer: true,
      },
    ]

    const selectCardTrue = {
      id: 28,
      suit: suits.spades,
      rang: '8',
      value: 8,
      image: 'sprites/deck/8-spades.png',
    }

    const selectCardFalse = {
      id: 4,
      suit: suits.hearts,
      rang: 'Q',
      value: 12,
      image: 'sprites/deck/Q-hearts.png',
    }

    const resTrue = checkCardToAdd(selectCardTrue, battleCard)
    const resFalse = checkCardToAdd(selectCardFalse, battleCard)
    expect(resTrue).toBeTruthy
    expect(resFalse).toBeFalsy
  })
})
