import { Shape } from '../../../types/shapes.model';

import { Asset } from './resourceFilterHelper';

interface ShapePropertyForFilter {
    path: string; // e.g., "/resourceType" or "/resourceType/nodeName"
    name: string;
    type: string;
}

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

function processShapeProperty(shape: Shape | undefined, shapes: Shape[], path: string, visitedShapes: Set<string>, nodeName: string): ShapePropertyForFilter[] {
  if (!shape || visitedShapes.has(shape.shaclShapeName)) {
    return [];
  }
  const shapesPropertiesForFilter: ShapePropertyForFilter[] = [];
  const visitedShapesCopy = new Set(visitedShapes);
  visitedShapesCopy.add(shape.shaclShapeName);
  const newPathSegment = (nodeName !== '') ? nodeName : toCamelCase(removeShapeSuffix(getSegmentFromALinkFromBack(shape.shaclShapeName, 0)));
  const currentShapePath = path + '/' + newPathSegment;
  for (const property of shape.properties) {
    if (property.propertyValues.some(value => value.type === 'http://www.w3.org/ns/shacl#node')) {
      const node: Shape | undefined = shapes.find(s => s.shaclShapeName === property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#node')?.value) || undefined
      const nodeName = property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#name')?.value || ''
      shapesPropertiesForFilter.push(...processShapeProperty(node, shapes, currentShapePath, visitedShapesCopy, nodeName));
    } else {
      shapesPropertiesForFilter.push({
        path: currentShapePath,
        name: property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#name')?.value || '',
        type: getSegmentFromALinkFromBack(property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#datatype')?.value || '', 0, '#')
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
      shapesPropertiesForFilter.push(...processShapeProperty(shape, shapes, '', new Set<string>(), ''));
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

function getCypherConditions(currentElement: string, remainingPath: string, conditions: Set<string>): Set<string> {
  const firstElementFromRemainingPath = getFirstElement(remainingPath);
  const currentCondition = `OPTIONAL MATCH (${currentElement})-[:${firstElementFromRemainingPath}]-(${firstElementFromRemainingPath})`;
  conditions.add(currentCondition); // Fixed: was adding conditions to itself

  if (getSegmentCount(remainingPath) > 1) {
    // Fixed: Removed spread operator and corrected recursive call
    getCypherConditions(firstElementFromRemainingPath, removeFirstSegment(remainingPath), conditions);
  }

  return conditions;
}

function getCypherReturns(shapePropertyForFilter: ShapePropertyForFilter): string {
  return `properties(${getSegmentFromALinkFromBack(shapePropertyForFilter.path, 0)}).${toCamelCase(shapePropertyForFilter.name)} AS \`${shapePropertyForFilter.path}/${shapePropertyForFilter.name}\`,`;
}

export const getCypherQueryForProperties = (shapePropertiesForFilter: ShapePropertyForFilter[], specificAssets: Asset[]): string => {
  const cypherConditions: Set<string> = new Set<string>();
  const cypherReturns: Set<string> = new Set<string>();
  for (const shapePropertyForFilter of shapePropertiesForFilter) {
    if (specificAssets.some(asset =>
      asset.specificFilterPath === shapePropertyForFilter.path &&
        asset.label === shapePropertyForFilter.name &&
        asset.specificFilterSelected)) {
      getCypherConditions('dataResource', shapePropertyForFilter.path, cypherConditions)
      cypherReturns.add(getCypherReturns(shapePropertyForFilter));
    }
  }

  return `${Array.from(cypherConditions).join('\n')} + ${Array.from(cypherReturns).join('\n')}`
}
