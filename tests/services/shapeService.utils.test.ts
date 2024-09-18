import { describe, expect, it } from '@jest/globals';

import { createShapeObjects } from '../../src/services/shapeService.utils';
import { hdmapShapeQuads, hdmapShapes } from '../__fixtures__/hdmap_shacl';

describe('createShapeObjects documentation', () => {
  it('Create EnvironmentShape from quads', () => {
    const shaclShapeId = '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b';
    const result = createShapeObjects(shaclShapeId, hdmapShapeQuads);
    expect(result).toEqual(hdmapShapes);
  })
})
