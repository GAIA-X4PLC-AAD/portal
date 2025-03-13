import {
  createItemCardData,
  ontologyToItemCardData,
  resourceToItemCardData,
  serviceToItemCardData,
  shapeToItemCardData
} from '../../../src/components/ItemCard/itemCardHelper';
import { Ontology } from '../../../src/types/ontologies.model';
import { Resource } from '../../../src/types/resources.model';
import { ServiceOffering } from '../../../src/types/serviceOfferings.model';
import { Shape } from '../../../src/types/shapes.model';

jest.mock('i18next', () => ({
  t: (key: string) => {
    const translations = {
      'common.no-title': 'No Title',
      'common.no-description': 'No Description',
      'ontologies.title': 'Ontology',
      'shapes.title': 'Shape',
    };
    return translations[key] || key;
  },
}));

console.error = jest.fn(); // Disable error logging
console.debug = jest.fn(); // Disable debug logging
console.warn = jest.fn(); // Disable warn logging

describe('itemCardHelper', () => {
  describe('createItemCardData', () => {
    it('should create ItemCardData with provided values', () => {
      const data = createItemCardData('Label', 'Title', 'Description', 'url', true, 'testId');
      expect(data).toEqual({
        label: 'Label',
        title: 'Title',
        description: 'Description',
        navigationUrl: 'url',
        isGaiaXCompliant: true,
        testId: 'testId',
      });
    });

    it('should use default values for undefined title and description', () => {
      const data = createItemCardData('Label', undefined, undefined, 'url', true, 'testId');
      expect(data).toEqual({
        label: 'Label',
        title: '',
        description: '',
        navigationUrl: 'url',
        isGaiaXCompliant: true,
        testId: 'testId',
      });
    });
  });

  describe('ontologyToItemCardData', () => {
    it('should convert Ontology to ItemCardData', () => {
      const ontology: Ontology = { subject: 'Subject', description: 'Description' };
      const data = ontologyToItemCardData(ontology);
      expect(data).toEqual({
        label: 'Ontology',
        title: 'Subject',
        description: 'Description',
        navigationUrl: '/ontologies/Subject',
        isGaiaXCompliant: false,
        testId: 'Card:Subject',
      });
    });
  });

  describe('shapeToItemCardData', () => {
    it('should convert Shape to ItemCardData', () => {
      const shape: Shape = { shaclShapeName: 'ShapeName' };
      const data = shapeToItemCardData(shape);
      expect(data).toEqual({
        label: 'Shape',
        title: 'ShapeName',
        description: '',
        navigationUrl: '/shapes/ShapeName',
        isGaiaXCompliant: false,
        testId: 'Card:ShapeName',
      });
    });
  });

  describe('serviceToItemCardData', () => {
    it('should convert ServiceOffering to ItemCardData', () => {
      const service: ServiceOffering = {
        labels: ['SoftwareResource'],
        name: 'ServiceName',
        description: 'ServiceDescription',
        uri: 'ServiceUri'
      };
      const data = serviceToItemCardData(service);
      expect(data).toEqual({
        label: 'SoftwareResource',
        title: 'ServiceName',
        description: 'ServiceDescription',
        navigationUrl: '/service-offerings/ServiceUri',
        isGaiaXCompliant: false,
        testId: 'Card:ServiceUri:ServiceName',
      });
    });
  });

  describe('resourceToItemCardData', () => {
    it('should convert Resource to ItemCardData', () => {
      const resource: Resource = { labels: ['Label1', 'Label2'], claimsGraphUri: ['Uri1', 'Uri2'], description: 'ResourceDescription', uri: 'ResourceUri', name: 'ResourceName' };
      const data = resourceToItemCardData(resource);
      expect(data).toEqual({
        label: 'Label1, Label2',
        title: 'ResourceName',
        description: 'ResourceDescription',
        navigationUrl: '/resources/ResourceUri',
        isGaiaXCompliant: true,
        testId: 'Card:ResourceUri:ResourceName',
      });
    });
  });
});
