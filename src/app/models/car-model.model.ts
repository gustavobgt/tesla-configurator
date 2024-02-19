import { CarColor } from "./car-color.model";

export interface CarModel {
  code: string;
  description: string;
  colors: CarColor[];
}
