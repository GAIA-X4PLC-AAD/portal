import { describe, expect, it } from '@jest/globals';

import { RDFParser } from '../RDFParser';
import { readFile } from '../readFile';

describe('RDF Parser', () => {

  describe('_  parse data from rdf', () => {
    it('_ should parse shapes from rdf data', async () => {
      // Given
      const rdfData = await readFile('src/utils/__tests__/fixtures/test-shapes.ttl');
      const expectedShapes = getExpectedShapes();
      // When
      const result = RDFParser.parseShapesFromRdfResponse(rdfData);
      // Then
      let resultList : string[] = [];
      result.forEach(result => {
        resultList.push(result.short_shape);
      });
      expect(resultList).toStrictEqual(expectedShapes);
    });
  });
});

const getExpectedShapes = () => {
  return [
    'WalletShape',
    'DataConnectorShape',
    'CPUShape',
    'SurveyResultDataOfferingShape',
    'NetworkingDeviceShape',
    'ComplianceCertificateClaimShape',
    'ScenarioDataResourceShape',
    'GPUShape',
    'FileStorageShape',
    'ComplianceReferenceManagerShape',
    'LegalPersonShape',
    'ComplianceAssessmentBodyShape',
    'CatalogueShape',
    'StorageShape',
    'SoftwareResourceShape',
    'DataResourceShape',
    'ComputeShape',
    'ComplianceCriteriaCombinationShape',
    'InstantiatedVirtualResourceShape',
    'ComplianceCertificationSchemeShape',
    'IdentityFederationShape',
    'MeasureShape',
    'ProviderShape',
    'StandardShape',
    'SoftwareOfferingShape',
    'FlavorShape',
    'VirtualResourceShape',
    'ServiceOfferingShape',
    'VirtualNodeShape',
    'LocatedServiceOfferingShape',
    'EndpointShape',
    'InfrastructureShape',
    'AddressShape',
    'ImageShape',
    'ServiceAccessPointShape',
    'AgentShape',
    'BigDataShape',
    'NodeShape',
    'ImageRegistryShape',
    'LocationShape',
    'BlockStorageShape',
    'PhysicalResourceShape',
    'TermsAndConditionsShape',
    'OrchestrationShape',
    'InterconnectionShape'];
}
