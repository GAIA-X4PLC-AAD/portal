import {trimShapes, RDFParser} from "../RDFParser";
import {describe, expect, it} from "@jest/globals";
import {readFile} from "../readFile";

describe('RDF Parser', () => {

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

  describe('_  parse data from rdf', () => {
    it('_ should parse shapes from rdf data', async () => {
      // Given
      const rdfData = await readFile('src/utils/__tests__/fixtures/test-shapes.ttl');
      const expectedShapes = getExpectedShapes();
      // When
      const result = RDFParser.parseShapesFromRdfResponse(rdfData);
      // Then
      expect(result).toStrictEqual(expectedShapes);
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
