import Diamonds from '../assets/Diamonds.svg'
import Hearts from '../assets/Hearts.svg'
import Clubs from '../assets/Clubs.svg'
import Spades from '../assets/Spades.svg'

const avatarPlaceholder = [Diamonds, Hearts, Clubs, Spades]

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getAvatarPlaceholder = () => {
  return avatarPlaceholder[getRandomInt(0, 3)]
}
