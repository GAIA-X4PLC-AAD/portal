import { describe, expect, it } from '@jest/globals';

import { HdMapShape } from '../__mocks__/HdMapShape';
import { HdMapShapeQuads } from '../__mocks__/HdMapShapeQuads';
import { createShapeObjects } from '../shapeService.utils';

describe('createShapeObjects documentation', () => {
  it('Create EnvironmentShape from quads', () => {
    const shaclShapeId = '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b';
    const result = createShapeObjects(shaclShapeId, HdMapShapeQuads);
    expect(result).toEqual(HdMapShape);
  })
})
