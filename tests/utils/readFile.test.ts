import { describe, expect, it } from '@jest/globals';

import { readFile } from '../../src/utils/readFile';

console.error = jest.fn(); // Disable error log
console.log = jest.fn(); // Disable console log

describe('readFile', () => {
  it('reads content', async () => {
    const filePath = 'tests/utils/__fixtures__/test-shapes-short.ttl';
    const result = await readFile(filePath);
    expect(result).toEqual(expectedContent);
  });

  it('throws error', async () => {
    const filePath = 'non/existing/path';
    await expect(() => readFile(filePath)).rejects.toThrow('');

  });
});

const expectedContent =
  `@prefix dcat:                <http://www.w3.org/ns/dcat#> .
@prefix dct:                 <http://purl.org/dc/terms/> .
@prefix example:             <http://example.org/example/> .
@prefix foaf:                <http://xmlns.com/foaf/0.1/> .
@prefix gax-core:            <https://w3id.org/gaia-x/core#> .
@prefix gax-trust-framework: <https://w3id.org/gaia-x/gax-trust-framework#> .
@prefix gax-validation:      <https://w3id.org/gaia-x/validation#> .
@prefix gaxtrustframework:   <http://w3id.org/gaia-x/gax-trust-framework#> .
@prefix openlabel:           <https://openlabel.asam.net/V1-0-0/ontologies/> .
@prefix plc:                 <https://example.org/V1-0-0/plc/> .
@prefix rdf:                 <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix sh:                  <http://www.w3.org/ns/shacl#> .
@prefix skos:                <http://www.w3.org/2004/02/skos/core#> .
@prefix surveyonto:          <http://semanticweb.org/metadatasurveyontology/> .
@prefix vcard:               <http://www.w3.org/2006/vcard/ns#> .
@prefix xsd:                 <http://www.w3.org/2001/XMLSchema#> .

gax-validation:WalletShape
    rdf:type        sh:NodeShape;
    sh:targetClass  gax-trust-framework:Wallet .
`;
