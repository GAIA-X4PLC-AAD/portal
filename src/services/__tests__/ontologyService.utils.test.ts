import { describe, expect, it } from '@jest/globals';

import { EnvironmentModelOntology } from '../__mocks__/EnvironmentModelOntology';
import { EnvironmentModelOntologyQuads } from '../__mocks__/EnvironmentModelOntologyQuads';
import { HdMapOntology } from '../__mocks__/HdMapOntology';
import { HdMapOntologyQuads } from '../__mocks__/HdMapOntologyQuads';
import { createOntologyObject } from '../ontologyService.utils';

describe('createOntologyObject method documentation', () => {
  it('Creates EnvironmentModel ontology from quads', () => {

    const result = createOntologyObject(EnvironmentModelOntologyQuads, []);
    expect(result).toEqual(EnvironmentModelOntology);
  });

  it('Create HdMap ontology from quads', () => {
    const result = createOntologyObject(HdMapOntologyQuads, []);
    expect(result).toEqual(HdMapOntology);
  });
});
