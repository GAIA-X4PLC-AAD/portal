import { Quad } from 'n3';

export const isEmpty = (value: string | undefined) => {
  return (value == null || (value.trim().length === 0));
}

export const logQuads = (quads: Quad[]) => {
  console.table(quads.map(quad => {
    try {
      const textLength: number = -40;
      return {
        subject: quad.subject.id.slice(textLength),
        predicate: quad.predicate.id.slice(textLength),
        object: quad.object.id.slice(textLength)
      }
    } catch (error) {
      // don't handle
    }
  }))
}
