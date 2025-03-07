import { useEffect, useMemo, useReducer, useState } from 'react';

import { useSchemas } from '../../../hooks/useSchemas';
import { getResourceTypes } from '../../../services/ontologyService.utils';
import { Shape } from '../../../types/shapes.model';
import { unique } from '../../../utils/utils';
import { loadResources } from '../helpers/resourceDataFlow';
import { removeNonResourceTypeLabels } from '../helpers/resourcesHelper';
import {
  initialResourceState,
  resourcesLoadedAction,
  resourcesLoadingErrorAction,
  resourcesReducer
} from '../helpers/resourcesReducer';

import { useResourceFilter } from './useResourceFilter';

export type ResourcesSearchPageContentType = 'LOADING' | 'SHOW_RESOURCES' | 'SHOW_NO_RESULTS';

export const useResources = () => {
  const schemas = useSchemas();
  const ontologies = useMemo(() =>
    !schemas.isLoading && !schemas.hasError ? schemas.ontologies : [],
  [schemas.isLoading]);

  const [state, dispatch] = useReducer(resourcesReducer, initialResourceState);
  const { isLoading, resources } = useMemo(() => ({
    isLoading: state.isLoading,
    resources: !state.isLoading && !state.hasError ? state.resources : []
  }), [state]);
  const [assetFilterVisible, toggleAssetFilterVisibility] = useState(false);

  const {
    filteredResources,
    typeAssets,
    formatAssets,
    vendorAssets,
    updateSearchText,
    updateFilterAsset,
  } = useResourceFilter(ontologies, resources);

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

  function processShapeProperty(shape: Shape | undefined, shapes: Shape[], path: string, visitedShapes: Set<string>): ShapePropertyForFilter[] {
    if (!shape || visitedShapes.has(shape.shaclShapeName)) {
      return [];
    }
    const shapesPropertiesForFilter: ShapePropertyForFilter[] = [];
    const visitedShapesCopy = new Set(visitedShapes);
    visitedShapesCopy.add(shape.shaclShapeName);
    const currentShapePath = path + '/' + removeShapeSuffix(getSegmentFromALinkFromBack(shape.shaclShapeName, 0));
    for (const property of shape.properties) {
      if (property.propertyValues.some(value => value.type === 'http://www.w3.org/ns/shacl#node')) {
        const node: Shape | undefined = shapes.find(s => s.shaclShapeName === property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#node')?.value) || undefined
        shapesPropertiesForFilter.push(...processShapeProperty(node, shapes, currentShapePath, visitedShapesCopy));
      } else {
        shapesPropertiesForFilter.push({
          path: currentShapePath,
          name: getSegmentFromALinkFromBack(property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#name')?.value || '', 0, '#'),
          type: getSegmentFromALinkFromBack(property.propertyValues.find(value => value.type === 'http://www.w3.org/ns/shacl#datatype')?.value || '', 0, '#')
        });
      }
    }
    return shapesPropertiesForFilter;
  }

  const getShapePropertiesForFilter = (shapes: Shape[], resourceTypes: string[]): ShapePropertyForFilter[] => {
    const shapesPropertiesForFilter: ShapePropertyForFilter[] = [];
    for (const resourceType of resourceTypes) {
      const shape = findShapeByResourceType(shapes, resourceType);
      if (shape) {
        shapesPropertiesForFilter.push(...processShapeProperty(shape, shapes, '', new Set<string>()));
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

  const getCypherQueryForProperties = (shapePropertiesForFilter: ShapePropertyForFilter[]): string => {
    const cypherConditions: Set<string> = new Set<string>();
    for (const shapePropertyForFilter of shapePropertiesForFilter) {
      getCypherConditions('dataResource', shapePropertyForFilter.path, cypherConditions)
    }
    return `${Array.from(cypherConditions).join('\n')}`
  }

  useEffect(() => {
    if (!schemas.isLoading) {
      if (!schemas.hasError) {
        const resourceTypes = Array.from(getResourceTypes(schemas.ontologies));
        const shapeProperties: ShapePropertyForFilter[] = getShapePropertiesForFilter(schemas.shapes, resourceTypes);
        console.log('shapeProperties') //TODO remove
        console.log(shapeProperties); //TODO remove

        console.log(schemas.shapes);
        console.log(shapeProperties);
        const query = getCypherQueryForProperties(shapeProperties);
        console.log(query)
        loadResources(resourceTypes)
          .then(resources => unique(resources, (item) => item.uri + item.name))
          .then(resources => dispatch(resourcesLoadedAction(resources)))
          .catch(error => dispatch(resourcesLoadingErrorAction(error)))
      } else {
        dispatch(resourcesLoadingErrorAction(schemas.error))
      }
    }
  }, [schemas.isLoading]);

  const viewContentType = useMemo<ResourcesSearchPageContentType>(() => {
    if (isLoading) {
      return 'LOADING'
    } else if (filteredResources.length) {
      return 'SHOW_RESOURCES'
    } else {
      return 'SHOW_NO_RESULTS'
    }
  }, [filteredResources, isLoading]);

  return {
    resources: removeNonResourceTypeLabels(
      filteredResources,
      typeAssets.map(asset => asset.id)
    ),
    typeAssets,
    formatAssets,
    vendorAssets,
    viewContentType,
    assetFilterVisible,
    toggleAssetFilterVisibility: () => toggleAssetFilterVisibility(!assetFilterVisible),
    updateSearchText,
    updateFilterAsset,
  }
}

