import { describe, expect, it } from '@jest/globals';

import { readFile } from '../../src/utils/readFile';

describe('ReadFile', () => {
  it('_ read file', async () => {
    // Given
    const filePath = 'tests/utils/__fixtures__/test-shapes-short.ttl';
    const expectedString = getExpectedString();
    // When
    const result = await readFile(filePath);
    // Then
    expect(result).toEqual(expectedString);
  });
});
const getExpectedString = () => {
  return '@prefix dcat:                <http://www.w3.org/ns/dcat#> .\n' +
    '@prefix dct:                 <http://purl.org/dc/terms/> .\n' +
    '@prefix example:             <http://example.org/example/> .\n' +
    '@prefix foaf:                <http://xmlns.com/foaf/0.1/> .\n' +
    '@prefix gax-core:            <https://w3id.org/gaia-x/core#> .\n' +
    '@prefix gax-trust-framework: <https://w3id.org/gaia-x/gax-trust-framework#> .\n' +
    '@prefix gax-validation:      <https://w3id.org/gaia-x/validation#> .\n' +
    '@prefix gaxtrustframework:   <http://w3id.org/gaia-x/gax-trust-framework#> .\n' +
    '@prefix openlabel:           <https://openlabel.asam.net/V1-0-0/ontologies/> .\n' +
    '@prefix plc:                 <https://example.org/V1-0-0/plc/> .\n' +
    '@prefix rdf:                 <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n' +
    '@prefix sh:                  <http://www.w3.org/ns/shacl#> .\n' +
    '@prefix skos:                <http://www.w3.org/2004/02/skos/core#> .\n' +
    '@prefix surveyonto:          <http://semanticweb.org/metadatasurveyontology/> .\n' +
    '@prefix vcard:               <http://www.w3.org/2006/vcard/ns#> .\n' +
    '@prefix xsd:                 <http://www.w3.org/2001/XMLSchema#> .\n' +
    '\n' +
    'gax-validation:WalletShape\n' +
    '    rdf:type        sh:NodeShape;\n' +
    '    sh:targetClass  gax-trust-framework:Wallet .\n';
}
