import { DeckCard } from './deck-cards/deck-cards'
import {
  checkCard,
  checkCardToAdd,
  debounce,
  deleteField,
  findCard,
  findCartToAdd,
  findMinCard,
  getRect,
  newCards,
  shuffle,
  spritesLoaded,
  trimStr,
} from './helpers'
import { NoticeGame } from '../../shared/notice-game/notice-game'
import { BattleField } from './battle-field/battle-field'
import { Button } from '../../shared/button'
import { CardsGame } from './cards-game/cards-game'
import { initialDeckCard, LOGO_HEIGHT } from './assets'
import { useWindowSize } from '../../shared/hooks/useWindowSize'
import { CARD_HEIGHT, CARD_WIDTH } from '../../assets/assets'

const imports = {
  LOGO_HEIGHT,
  CARD_WIDTH,
  CARD_HEIGHT,
  DeckCard,
  checkCard,
  checkCardToAdd,
  Button,
  debounce,
  deleteField,
  findCard,
  findCartToAdd,
  findMinCard,
  newCards,
  shuffle,
  trimStr,
  initialDeckCard,
  NoticeGame,
  BattleField,
  useWindowSize,
  CardsGame,
  spritesLoaded,
  getRect,
}

export default imports
