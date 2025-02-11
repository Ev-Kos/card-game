export const LOGO_HEIGHT = 95

export const suits = {
  clubs: 'clubs',
  diamonds: 'diamonds',
  hearts: 'hearts',
  spades: 'spades',
}

export const notice_game = {
  firstMoveBot: 'Первым ходит противник',
  firstMovePlayer: 'Вы ходите первым',
  moveBot: 'Ход противника',
  movePlayer: 'Ваш ход',
}

export const button_text = {
  ITake: 'Беру',
  HeTake: 'Пусть берет',
  Ok: 'Бито',
}

export const colors = [
  { color: '#b38ff1' }, //--color-background-light
  { color: '#6495ED' }, //CornflowerBlue
  { color: '#006400' }, // зеленый
  { color: '#d61e1e' }, // --color-contrast
  { color: '#778899' }, //LightSlateGray
  { color: '#F08080' }, //LightCoral
]

export const cards = [
  { image: 'sprites/card.png' },
  { image: 'sprites/card2.png' },
  { image: 'sprites/card3.png' },
]

export const initialDeckCard = [
  {
    id: 1,
    suit: suits.clubs,
    rang: 'A',
    value: 14,
    image: 'sprites/deck/A-clubs.png',
  },
  {
    id: 2,
    suit: suits.diamonds,
    rang: 'A',
    value: 14,
    image: 'sprites/deck/A-diamonds.png',
  },
  {
    id: 3,
    suit: suits.hearts,
    rang: 'A',
    value: 14,
    image: 'sprites/deck/A-hearts.png',
  },
  {
    id: 4,
    suit: suits.spades,
    rang: 'A',
    value: 14,
    image: 'sprites/deck/A-spades.png',
  },
  {
    id: 5,
    suit: suits.clubs,
    rang: 'K',
    value: 13,
    image: 'sprites/deck/K-clubs.png',
  },
  {
    id: 6,
    suit: suits.diamonds,
    rang: 'K',
    value: 13,
    image: 'sprites/deck/K-diamonds.png',
  },
  {
    id: 7,
    suit: suits.hearts,
    rang: 'K',
    value: 13,
    image: 'sprites/deck/K-hearts.png',
  },
  {
    id: 8,
    suit: suits.spades,
    rang: 'K',
    value: 13,
    image: 'sprites/deck/K-spades.png',
  },
  {
    id: 9,
    suit: suits.clubs,
    rang: 'Q',
    value: 12,
    image: 'sprites/deck/Q-clubs.png',
  },
  {
    id: 10,
    suit: suits.diamonds,
    rang: 'Q',
    value: 12,
    image: 'sprites/deck/Q-diamonds.png',
  },
  {
    id: 11,
    suit: suits.hearts,
    rang: 'Q',
    value: 12,
    image: 'sprites/deck/Q-hearts.png',
  },
  {
    id: 12,
    suit: suits.spades,
    rang: 'Q',
    value: 12,
    image: 'sprites/deck/Q-spades.png',
  },
  {
    id: 13,
    suit: suits.clubs,
    rang: 'J',
    value: 11,
    image: 'sprites/deck/J-clubs.png',
  },
  {
    id: 14,
    suit: suits.diamonds,
    rang: 'J',
    value: 11,
    image: 'sprites/deck/J-diamonds.png',
  },
  {
    id: 15,
    suit: suits.hearts,
    rang: 'J',
    value: 11,
    image: 'sprites/deck/J-hearts.png',
  },
  {
    id: 16,
    suit: suits.spades,
    rang: 'J',
    value: 11,
    image: 'sprites/deck/J-spades.png',
  },
  {
    id: 17,
    suit: suits.clubs,
    rang: '10',
    value: 10,
    image: 'sprites/deck/10-clubs.png',
  },
  {
    id: 18,
    suit: suits.diamonds,
    rang: '10',
    value: 10,
    image: 'sprites/deck/10-diamonds.png',
  },
  {
    id: 19,
    suit: suits.hearts,
    rang: '10',
    value: 10,
    image: 'sprites/deck/10-hearts.png',
  },
  {
    id: 20,
    suit: suits.spades,
    rang: '10',
    value: 10,
    image: 'sprites/deck/10-spades.png',
  },
  {
    id: 21,
    suit: suits.clubs,
    rang: '9',
    value: 9,
    image: 'sprites/deck/9-clubs.png',
  },
  {
    id: 22,
    suit: suits.diamonds,
    rang: '9',
    value: 9,
    image: 'sprites/deck/9-diamonds.png',
  },
  {
    id: 23,
    suit: suits.hearts,
    rang: '9',
    value: 9,
    image: 'sprites/deck/9-hearts.png',
  },
  {
    id: 24,
    suit: suits.spades,
    rang: '9',
    value: 9,
    image: 'sprites/deck/9-spades.png',
  },
  {
    id: 25,
    suit: suits.clubs,
    rang: '8',
    value: 8,
    image: 'sprites/deck/8-clubs.png',
  },
  {
    id: 26,
    suit: suits.diamonds,
    rang: '8',
    value: 8,
    image: 'sprites/deck/8-diamonds.png',
  },
  {
    id: 27,
    suit: suits.hearts,
    rang: '8',
    value: 8,
    image: 'sprites/deck/8-hearts.png',
  },
  {
    id: 28,
    suit: suits.spades,
    rang: '8',
    value: 8,
    image: 'sprites/deck/8-spades.png',
  },
  {
    id: 29,
    suit: suits.clubs,
    rang: '7',
    value: 7,
    image: 'sprites/deck/7-clubs.png',
  },
  {
    id: 30,
    suit: suits.diamonds,
    rang: '7',
    value: 7,
    image: 'sprites/deck/7-diamonds.png',
  },
  {
    id: 31,
    suit: suits.hearts,
    rang: '7',
    value: 7,
    image: 'sprites/deck/7-hearts.png',
  },
  {
    id: 32,
    suit: suits.spades,
    rang: '7',
    value: 7,
    image: 'sprites/deck/7-spades.png',
  },
  {
    id: 33,
    suit: suits.clubs,
    rang: '6',
    value: 6,
    image: 'sprites/deck/6-clubs.png',
  },
  {
    id: 34,
    suit: suits.diamonds,
    rang: '6',
    value: 6,
    image: 'sprites/deck/6-diamonds.png',
  },
  {
    id: 35,
    suit: suits.hearts,
    rang: '6',
    value: 6,
    image: 'sprites/deck/6-hearts.png',
  },
  {
    id: 36,
    suit: suits.spades,
    rang: '6',
    value: 6,
    image: 'sprites/deck/6-spades.png',
  },
]
