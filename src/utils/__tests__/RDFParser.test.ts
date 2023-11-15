import {RDFParser, trimShapes} from "../RDFParser";
import {describe, expect, it} from "@jest/globals";

describe('RDF Parser', () => {

  describe('_ trim function for shapes', () => {
    it('_ should trim a given shape', async () => {
      // Given
      const shape = 'https://w3id.org/gaia-x/validation#DataConnectorShape';
      // When
      const result = trimShapes(shape)
      // Then

      expect(result).toBe('DataConnectorShape');
    });
  });
});
