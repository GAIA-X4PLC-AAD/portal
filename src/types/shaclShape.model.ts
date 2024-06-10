import { ShapeProperty } from './shapeProperty.model';

export type ShaclShape = {
  shape: string,
  short_shape: string,
  properties?: ShapeProperty[]
}
