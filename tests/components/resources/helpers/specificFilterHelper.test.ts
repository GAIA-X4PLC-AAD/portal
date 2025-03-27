import {
  getCypherQueryForProperties,
  getShapePropertiesForFilter
} from '../../../../src/components/resources/helpers/specificFilterHelper';

describe('getShapePropertiesForFilter', () => {
  // it('returns shape properties for filter', () => {
  //   const shapes = [
  //     {
  //       shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/testShape',
  //       properties: [
  //         {
  //           propertyValues: [
  //             { type: 'http://www.w3.org/ns/shacl#path', value: 'test/path' },
  //             { type: 'http://www.w3.org/ns/shacl#datatype', value: 'testType' }
  //           ]
  //         }
  //       ]
  //     }
  //   ];
  //   const resourceTypes = ['test'];
  //   const result = getShapePropertiesForFilter(shapes, resourceTypes);
  //
  //   // Debug statements to inspect the result
  //   console.log('Result:', result);
  //
  //   expect(result).toEqual([
  //     {
  //       path: 'test/test',
  //       name: 'path',
  //       type: 'testType',
  //       resourceType: 'test'
  //     }
  //   ]);
  // });

  it('handles empty shapes array', () => {
    const shapes = [];
    const resourceTypes = ['test'];
    const result = getShapePropertiesForFilter(shapes, resourceTypes);
    expect(result).toEqual([]);
  });

  it('handles empty resourceTypes array', () => {
    const shapes = [
      {
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/testShape',
        properties: []
      }
    ];
    const resourceTypes = [];
    const result = getShapePropertiesForFilter(shapes, resourceTypes);
    expect(result).toEqual([]);
  });

  it('handles shapes with no matching resource type', () => {
    const shapes = [
      {
        shaclShapeName: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/testShape',
        properties: []
      }
    ];
    const resourceTypes = ['nonexistent'];
    const result = getShapePropertiesForFilter(shapes, resourceTypes);
    expect(result).toEqual([]);
  });
});

describe('getCypherQueryForProperties', () => {
  it('returns cypher query correctly', () => {
    const shapePropertiesForFilter = [
      { path: 'test/path', name: 'testName', type: 'testType', resourceType: 'test' }
    ];
    const specificAssets = [
      { specificFilterPath: 'test/path', label: 'testName', specificFilterSelected: true }
    ];
    const typeLabels = ['test'];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toContain('MATCH (dataResource:DataResource)');
    expect(result).toContain('OPTIONAL MATCH (dataResource)-[:path]-(path)');
    expect(result).toContain('properties(path).testname AS `test/path/testName`');
  });

  it('handles empty specificAssets array', () => {
    const shapePropertiesForFilter = [
      { path: 'test/path', name: 'testName', type: 'testType', resourceType: 'test' }
    ];
    const specificAssets = [];
    const typeLabels = ['test'];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toBe('');
  });

  it('handles empty typeLabels array', () => {
    const shapePropertiesForFilter = [
      { path: 'test/path', name: 'testName', type: 'testType', resourceType: 'test' }
    ];
    const specificAssets = [
      { specificFilterPath: 'test/path', label: 'testName', specificFilterSelected: true }
    ];
    const typeLabels = [];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toBe('');
  });

  it('handles no matching specific assets', () => {
    const shapePropertiesForFilter = [
      { path: 'test/path', name: 'testName', type: 'testType', resourceType: 'test' }
    ];
    const specificAssets = [
      { specificFilterPath: 'other/path', label: 'otherName', specificFilterSelected: true }
    ];
    const typeLabels = ['test'];
    const result = getCypherQueryForProperties(shapePropertiesForFilter, specificAssets, typeLabels);
    expect(result).toBe('');
  });
});
