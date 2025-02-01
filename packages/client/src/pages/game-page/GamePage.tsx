import { useEffect, useRef, useState } from 'react'
import styles from './GamePage.module.css'
import Logo from '../../assets/Logo.svg'
import { Game } from './game/Game'

export const GamePage = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width)
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [ref])

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.logoWrap}>
        <div>buttonback</div>
        <img src={Logo} className={styles.logo} alt="Desc Masters" />
      </div>
      <div className={styles.gameBoard}>
        <Game width={width} height={height} />
      </div>
    </div>
  )
}
