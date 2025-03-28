import { Shape, ShapePropertyForFilter } from '../../../types/shapes.model';

import { Asset } from './resourceFilterHelper';

function removeShapeSuffix(input: string): string {
  return input.replace(/Shape$/, '');
}

function dashedToDashless(input: string): string {
  return input.replace(/-/g, '');
}

function getSegmentFromALinkFromBack(link: string, countFromBack: number, separator?: string): string {
  const segments = separator ? link.split(separator) : link.split('/');
  return countFromBack >= segments.length ? '' : segments[segments.length - countFromBack - 1];
}

function getLastSegmentByMultipleDelimiters(input: string, delimiters: string[]): string {
  let lastSegment = input;
  for (const delimiter of delimiters) {
    lastSegment = getSegmentFromALinkFromBack(lastSegment, 0, delimiter);
  }
  return lastSegment;
}

function findShapeByResourceType(shapes: Shape[], resourceType: string): Shape | undefined {
  const baseUrl = 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/'
  return shapes.find(shape => (
    shape.shaclShapeName.includes(baseUrl) &&
        removeShapeSuffix(getSegmentFromALinkFromBack(shape.shaclShapeName, 0)) === resourceType &&
        dashedToDashless(getSegmentFromALinkFromBack(shape.shaclShapeName, 1)) === resourceType.toLowerCase()
  ));
}

function toCamelCase(str: string): string {
  if (!str) {
    return '';
  }

  // Split the string by spaces
  const words = str.split(' ');

  // Convert the first word to lowercase
  let result = words[0].toLowerCase();

  // Capitalize the first letter of each subsequent word and concatenate
  for (let i = 1; i < words.length; i++) {
    result += words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }

  return result;
}

function processShapeProperty(shape: Shape | undefined, shapes: Shape[], path: string, visitedShapes: Set<string>, nodeName: string, resourceType: string): ShapePropertyForFilter[] {
  if (!shape || visitedShapes.has(shape.shaclShapeName)) {
    return [];
  }
  const shapesPropertiesForFilter: ShapePropertyForFilter[] = [];
  const visitedShapesCopy = new Set(visitedShapes);
  visitedShapesCopy.add(shape.shaclShapeName);
  const newPathSegment = (nodeName !== '') ? nodeName : resourceType;
  const currentShapePath = path + '/' + newPathSegment;
  for (const property of shape.properties) {
    if (property.propertyValues.some(value => value.type === 'http://www.w3.org/ns/shacl#node')) {
      const node: Shape | undefined = shapes.find(s => s.shaclShapeName === property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#node')?.value) || undefined
      const nodeName = getLastSegmentByMultipleDelimiters(property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#path')?.value || '', ['/', '#']);
      shapesPropertiesForFilter.push(...processShapeProperty(node, shapes, currentShapePath, visitedShapesCopy, nodeName, resourceType));
    } else {
      shapesPropertiesForFilter.push({
        path: currentShapePath,
        name: getLastSegmentByMultipleDelimiters(property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#path')?.value || '', ['/', '#']),
        type: getLastSegmentByMultipleDelimiters(property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#datatype')?.value || '', ['/', '#']),
        resourceType: resourceType
      });
    }
  }
  return shapesPropertiesForFilter;
}

export const getShapePropertiesForFilter = (shapes: Shape[], resourceTypes: string[]): ShapePropertyForFilter[] => {
  const shapesPropertiesForFilter: ShapePropertyForFilter[] = [];
  for (const resourceType of resourceTypes) {
    const shape = findShapeByResourceType(shapes, resourceType);
    if (shape) {
      shapesPropertiesForFilter.push(...processShapeProperty(shape, shapes, '', new Set<string>(), '', resourceType));
    }
  }
  return shapesPropertiesForFilter;
}

// Function to get the first element from a path
function getFirstElement(path: string): string {
  const segments = path.split('/').filter(segment => segment !== ''); // Split and remove empty segments
  return segments[0] || ''; // Return first element or empty string if none
}

// Function to return the number of segments in a path
function getSegmentCount(path: string): number {
  const segments = path.split('/').filter(segment => segment !== ''); // Split and remove empty segments
  return segments.length;
}

// Function to remove the first segment from a path
function removeFirstSegment(path: string): string {
  const segments = path.split('/').filter(segment => segment !== ''); // Split and remove empty segments
  segments.shift(); // Remove first element
  return segments.length > 0 ? '/' + segments.join('/') : ''; // Rejoin with leading slash if segments remain
}

function replaceFirstSegment(path: string, replaceString: string): string {
  const segments = path.split('/').filter(segment => segment !== ''); // Split and remove empty segments
  segments[0] = replaceString; // Replace first element
  return segments.length > 0 ? '/' + segments.join('/') : ''; // Rejoin with leading slash if segments remain
}

function getCypherConditions(currentElement: string, remainingPath: string, conditions: Set<string>): Set<string> {
  const firstElementFromRemainingPath = getFirstElement(remainingPath);
  if (currentElement !== firstElementFromRemainingPath) {
    const currentCondition = `OPTIONAL MATCH (${currentElement})-[:${firstElementFromRemainingPath}]-(${firstElementFromRemainingPath})`;
    conditions.add(currentCondition);
  }

  if (getSegmentCount(remainingPath) > 1) {
    // Fixed: Removed spread operator and corrected recursive call
    getCypherConditions(firstElementFromRemainingPath, removeFirstSegment(remainingPath), conditions);
  }

  return conditions;
}

function getCypherReturns(shapePropertyForFilter: ShapePropertyForFilter): string {
  const path = replaceFirstSegment(shapePropertyForFilter.path, 'dataResource');
  return `properties(${getSegmentFromALinkFromBack(path, 0)}).${toCamelCase(shapePropertyForFilter.name)} AS \`${shapePropertyForFilter.path}/${shapePropertyForFilter.name}\``;
}

export const getCypherQueryForProperties = (shapePropertiesForFilter: ShapePropertyForFilter[], specificAssets: Asset[], typeLabels: string[]): string => {
  const cypherConditions: Set<string> = new Set<string>();
  const cypherReturns: Set<string> = new Set<string>();
  for (const shapePropertyForFilter of shapePropertiesForFilter) {
    if (specificAssets.some(asset =>
      asset.specificFilterPath === shapePropertyForFilter.path &&
        asset.label === shapePropertyForFilter.name &&
        asset.specificFilterSelected)) {
      getCypherConditions('dataResource', replaceFirstSegment(shapePropertyForFilter.path, 'dataResource'), cypherConditions)
      cypherReturns.add(getCypherReturns(shapePropertyForFilter));
    }
  }

  let returnStr = '';
  if (typeLabels.length > 0 && cypherReturns.size > 0) {
    returnStr = `
  MATCH (dataResource:DataResource)
  WHERE ANY (label IN labels(dataResource) WHERE label IN ['${typeLabels}'])
  ${Array.from(cypherConditions).join('\n')}
  RETURN
  properties(dataResource).uri AS specificResourceUri,
    ${Array.from(cypherReturns).map((returnStr, index, array) =>
    index === array.length - 1 ? returnStr : returnStr + ','
  ).join('\n')}`
  }

  return returnStr;
}
