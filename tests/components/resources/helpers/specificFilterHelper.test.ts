import { Asset } from '../../../../src/components/resources/helpers/resourceFilterHelper';
import {
  getCypherQueryForProperties,
  getShapePropertiesForFilter
} from '../../../../src/components/resources/helpers/specificFilterHelper';
import { ShapePropertyForFilter } from '../../../../src/types/shapes.model';

describe('getShapePropertiesForFilter', () => {

  it('handles shape with no properties', () => {
    const shapes = [
      {
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/testShape',
        properties: []
      }
    ];
    const resourceTypes = ['test'];
    const result = getShapePropertiesForFilter(shapes, resourceTypes);
    expect(result).toEqual([]);
  });

  it('handles property with missing values', () => {
    const shapes = [
      {
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/testShape',
        properties: [
          {
            propertyValues: [
              { type: 'http://www.w3.org/ns/shacl#path' },
              { type: 'http://www.w3.org/ns/shacl#datatype' }
            ]
          }
        ]
      }
    ];
    const resourceTypes = ['test'];
    const result = getShapePropertiesForFilter(shapes, resourceTypes);
    expect(result).toEqual([]);
  });
});

describe('getCypherQueryForProperties', () => {
  it('returns cypher query correctly with multiple properties', () => {
    const shapePropertiesForFilter: ShapePropertyForFilter[] = [
      { path: 'test/path', name: 'testName', type: 'testType', resourceType: 'test' },
      { path: 'another/path', name: 'anotherName', type: 'anotherType', resourceType: 'another' }
    ];
    const specificAssets: Asset[] = [
      {
        id: '1',
        type: 'specificAssets',
        label: 'testName',
        value: true,
        disabled: false,
        specificFilterPath: 'test/path',
        specificFilterSelected: true,
        specificFilterPossibleValues: [],
        specificFilterValueSelected: null
      },
      {
        id: '2',
        type: 'specificAssets',
        label: 'anotherName',
        value: true,
        disabled: false,
        specificFilterPath: 'another/path',
        specificFilterSelected: true,
        specificFilterPossibleValues: [],
        specificFilterValueSelected: null
      }
    ];
    const typeLabels = ['test', 'another'];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toContain('MATCH (dataResource:DataResource)');
    expect(result).toContain('WHERE ANY (label IN labels(dataResource) WHERE label IN [\'test,another\'])');
    expect(result).toContain('OPTIONAL MATCH (dataResource)-[:path]-(path)');
    expect(result).toContain('properties(path).testname AS `test/path/testName`');
    expect(result).toContain('OPTIONAL MATCH (dataResource)-[:path]-(path)');
  });

  it('handles specific asset filter not selected', () => {
    const shapePropertiesForFilter: ShapePropertyForFilter[] = [
      { path: 'test/path', name: 'testName', type: 'testType', resourceType: 'test' }
    ];
    const specificAssets: Asset[] = [
      {
        id: '1',
        type: 'specificAssets',
        label: 'testName',
        value: true,
        disabled: false,
        specificFilterPath: 'test/path',
        specificFilterSelected: false,
        specificFilterPossibleValues: [],
        specificFilterValueSelected: null
      }
    ];
    const typeLabels = ['test'];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toBe('');
  });

  it('handles special characters in label', () => {
    const shapePropertiesForFilter: ShapePropertyForFilter[] = [
      { path: 'test/path', name: 'testName', type: 'testType', resourceType: 'test' }
    ];
    const specificAssets: Asset[] = [
      {
        id: '1',
        type: 'specificAssets',
        label: 'testName',
        value: true,
        disabled: false,
        specificFilterPath: 'test/path',
        specificFilterSelected: true,
        specificFilterPossibleValues: [],
        specificFilterValueSelected: null
      }
    ];
    const typeLabels = ['test-label'];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toContain('WHERE ANY (label IN labels(dataResource) WHERE label IN [\'test-label\'])');
  });

  it('generates correct cypher query with multiple type labels', () => {
    const shapePropertiesForFilter: ShapePropertyForFilter[] = [
      { path: 'test/path', name: 'testName', type: 'testType', resourceType: 'test' }
    ];
    const specificAssets: Asset[] = [
      {
        id: '1',
        type: 'specificAssets',
        label: 'testName',
        value: true,
        disabled: false,
        specificFilterPath: 'test/path',
        specificFilterSelected: true,
        specificFilterPossibleValues: [],
        specificFilterValueSelected: null
      }
    ];
    const typeLabels = ['test', 'label'];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toContain('WHERE ANY (label IN labels(dataResource) WHERE label IN [\'test,label\'])');
  });

  it('handles no matching shape properties for filter', () => {
    const shapePropertiesForFilter: ShapePropertyForFilter[] = [];
    const specificAssets: Asset[] = [
      {
        id: '1',
        type: 'specificAssets',
        label: 'testName',
        value: true,
        disabled: false,
        specificFilterPath: 'test/path',
        specificFilterSelected: true,
        specificFilterPossibleValues: [],
        specificFilterValueSelected: null
      }
    ];
    const typeLabels = ['test'];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toBe('');
  });
});
