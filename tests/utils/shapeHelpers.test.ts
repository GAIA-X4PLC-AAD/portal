import { describe, expect, it } from '@jest/globals';

import { trimShapes } from '../../src/utils/shapeHelpers';

describe('Shape Helpers', () => {

  describe('_ trim function for shapes', () => {
    it('_ should trim a given shape which contains #', async () => {
      // Given
      const shape = 'https://w3id.org/gaia-x/validation#DataConnectorShape';
      // When
      const result = trimShapes(shape)
      // Then
      expect(result).toBe('DataConnectorShape');
    });

    it('_ should trim a given shape which contains /', async () => {
      // Given
      const shape = 'https://semanticweb.org/metadatasurveyontology/SurveyResultDataOffering';
      // When
      const result = trimShapes(shape)
      // Then
      expect(result).toBe('SurveyResultDataOffering');
    });
  });
});
