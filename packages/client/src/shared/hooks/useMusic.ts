import { useRef, useEffect } from 'react'

type TMusicProps = {
  src: string
  loop?: boolean
  conditional: boolean
  numberRepetitions?: number
  volume?: number
}

export const useMusic = (props: TMusicProps) => {
  const { loop = false, src = '', conditional = true, volume = 1 } = props
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio()

    audio.src = src
    audio.loop = loop

    audioRef.current = audio
    audioRef.current.volume = volume

    document.body.appendChild(audio)

    return () => {
      audioRef.current?.pause()
      document.body.removeChild(audio)
    }
  }, [])

  useEffect(() => {
    if (conditional && volume !== 0 && audioRef.current) {
      audioRef.current.play()
      audioRef.current.volume = volume
    }
    if (conditional && volume === 0 && audioRef.current) {
      audioRef.current.pause()
    }
  }, [conditional, volume])
}
