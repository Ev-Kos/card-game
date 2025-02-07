export type TCard = {
  id: number
  suit: string
  rang: string
  value: number
  image: string
}
export type TBattleCart = TCard & { isPlayer: boolean }

export type TRect = {
  x: number
  y: number
  image: HTMLImageElement
}
