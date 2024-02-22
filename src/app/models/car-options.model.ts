import { CarConfig } from "./car-config.model"

export interface CarOptions {
  configs: CarConfig[]
  towHitch: boolean
  yoke: boolean
}
