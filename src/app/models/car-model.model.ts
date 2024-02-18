import { Color } from "./car-color.model";

export interface CarModel {
  code: string;
  description: string;
  colors: Color[];
}
