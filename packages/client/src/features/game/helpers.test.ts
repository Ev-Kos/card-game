import { renderHook, waitFor } from '@testing-library/react'
import {
  cardsForTests,
  initialDeckCard,
  suits,
  trumpCardForTests,
} from './assets'
import {
  checkCard,
  checkCardToAdd,
  findCard,
  findCartToAdd,
  findMinCard,
  newCards,
  shuffle,
} from './helpers'
import { useState } from 'react'
import { act } from 'react-dom/test-utils'

describe('Тестирование функций игрового движка', () => {
  it('Функция перемешивания карт (shuffle)', () => {
    const shuffleArr = shuffle(initialDeckCard)
    expect(shuffleArr).not.toEqual(initialDeckCard)
  })

  it('Функция поиска минимальной карты для хода компьютера (findMinCard)', () => {
    const card = findMinCard(cardsForTests, trumpCardForTests)
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
    const card = findCard(battleCard, cardsForTests, trumpCardForTests)
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
    const card = findCard(battleCard, cardsForTests, trumpCardForTests)
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
    const card = findCartToAdd(cardsForTests, battleCard, trumpCardForTests, 5)
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
    const card = findCartToAdd(cardsForTests, battleCard, trumpCardForTests, 0)
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
    const card = findCartToAdd(cardsForTests, battleCard, trumpCardForTests, 5)
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

  it('Функция проверяет может ли игрок отбиться выбранной картой (checkCard)', () => {
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

    const resTrue = checkCard(battleCard, selectCardTrue, trumpCardForTests)
    const resFalse = checkCard(battleCard, selectCardFalse, trumpCardForTests)
    expect(resTrue).toBeTruthy
    expect(resFalse).toBeFalsy
  })

  it('Функция удаляет карты из колоды после хода, если добавляет карты компьютеру или игроку (newCards)', () => {
    const { result } = renderHook(() => useState(initialDeckCard.slice(0, 20)))
    const [deckCards, setDeckCards] = result.current

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

    const setPlayerCards = jest.fn()
    const setBotCards = jest.fn()

    act(() =>
      newCards(
        deckCards,
        cardsForTests.slice(0, 5),
        cardsForTests.slice(0, 5),
        battleCard,
        setDeckCards,
        setPlayerCards,
        setBotCards,
      ),
    )
    expect(result.current[0]).toHaveLength(18)
  })

  it('Функция добавляет карты игроку после хода, если их меньше 6 (newCards)', () => {
    const { result } = renderHook(() => useState(cardsForTests.slice(0, 5)))
    const [playerCards, setPlayerCards] = result.current

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

    const deckCards = initialDeckCard.slice(0, 20)
    const setDeckCards = jest.fn()
    const setBotCards = jest.fn()

    act(() =>
      newCards(
        deckCards,
        playerCards,
        cardsForTests.slice(0, 5),
        battleCard,
        setDeckCards,
        setPlayerCards,
        setBotCards,
      ),
    )

    waitFor(() => {
      expect(result.current[0]).toHaveLength(6)
    })
  })

  it('Функция добавляет карты компьютеру после хода, если их меньше 6 (newCards)', () => {
    const { result } = renderHook(() => useState(cardsForTests.slice(0, 5)))
    const [botCards, setBotCards] = result.current

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

    const deckCards = initialDeckCard.slice(0, 20)
    const setDeckCards = jest.fn()
    const setPlayerCards = jest.fn()

    act(() =>
      newCards(
        deckCards,
        cardsForTests.slice(0, 5),
        botCards,
        battleCard,
        setDeckCards,
        setPlayerCards,
        setBotCards,
      ),
    )

    waitFor(() => {
      expect(result.current[0]).toHaveLength(6)
    })
  })
})
