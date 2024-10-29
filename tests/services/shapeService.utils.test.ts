import { describe, expect, it } from '@jest/globals';

import { createShapeObjects, trimShapes } from '../../src/services/shapeService.utils';
import { hdmapShapeQuads, hdmapShapes } from '../__fixtures__/hdmap_shacl';

describe('createShapeObjects documentation', () => {
  it('Create EnvironmentShape from quads', () => {
    const shaclShapeId = '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b';
    const result = createShapeObjects(shaclShapeId, hdmapShapeQuads);
    expect(result).toEqual(hdmapShapes);
  })
})

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
