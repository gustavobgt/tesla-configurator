export interface CarOptions {
  configs: CarConfig[]
  towHitch: boolean
  yoke: boolean
}

export interface CarConfig {
  id: number
  description: string
  range: number
  speed: number
  price: number
}
