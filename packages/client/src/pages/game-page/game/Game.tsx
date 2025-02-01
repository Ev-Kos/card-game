import { useEffect, useMemo, useRef, useState } from 'react'
import { LOGO_HEIGHT, PADDING_GAME_PAGE } from '../utils/constans'
import { DeskCard } from '../deck-cards/DeckCards'

type TProps = {
  width: number
  height: number
}

export const Game = ({ width, height }: TProps) => {
  const [widthGame, setWidthGame] = useState(0)
  const [heightGame, setHeightGame] = useState(0)
  const [cardsCounter, setCardsCounter] = useState(0)

  const [isStartGame, setStartGame] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useMemo(() => {
    setWidthGame(width - (width * PADDING_GAME_PAGE) / 100)
    setHeightGame(height - LOGO_HEIGHT)
  }, [width, height])

  useEffect(() => {
    if (widthGame !== 0 && heightGame !== 0) {
      setStartGame(true)
      setCardsCounter(35)
    }
  }, [widthGame, heightGame])

  useEffect(() => {
    if (
      canvasRef.current &&
      widthGame !== 0 &&
      heightGame !== 0 &&
      isStartGame
    ) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        DeskCard(ctx, widthGame, heightGame, cardsCounter)
      }
    }
  }, [isStartGame])

  return (
    <>
      <canvas width={widthGame} height={heightGame} ref={canvasRef} />
    </>
  )
}
