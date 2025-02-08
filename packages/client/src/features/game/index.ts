import { LOGO_HEIGHT, CARD_WIDTH } from './constans'
import { DeskCard } from './deck-cards/deck-cards'
import {
  checkCard,
  checkCardToAdd,
  debounce,
  deleteField,
  findCard,
  findCartToAdd,
  findMinCard,
  newCards,
  shuffle,
  trimStr,
} from './helpers'
import { NoticeGame } from '../../shared/notice-game/notice-game'
import { BattleField } from './battle-field/battle-field'
import { Button } from '../../shared/button'
import { CardsGame } from './cards-game/cards-game'
import { initialDeskCard } from './assets'
import { useWindowSize } from '../../shared/hooks/useWindowSize'

const imports = {
  LOGO_HEIGHT,
  CARD_WIDTH,
  DeskCard,
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
  initialDeskCard,
  NoticeGame,
  BattleField,
  useWindowSize,
  CardsGame,
}

export default imports
