import { useEffect, useReducer } from 'react';

import { Ontology } from '../../../types/ontologies.model';
import { Resource } from '../../../types/resources.model';
import { Shape } from '../../../types/shapes.model';
import { Asset } from '../helpers/resourceFilterHelper';
import {
  initialResourceFilterState,
  resourceFilterReducer,
  setResourceFilterAssetsAction,
  setSearchTextAction,
  updateFilterAssetAction
} from '../helpers/resourceFilterReducer';

export const useResourceFilter = (ontologies: Ontology[], shapes: Shape[], resources: Resource[]) => {
  const [filters, dispatch] = useReducer(resourceFilterReducer, initialResourceFilterState);

  useEffect(() => {
    dispatch(setResourceFilterAssetsAction(ontologies, shapes, resources));
  }, [ontologies, resources]);

  // Remove the "searchText" property from the "filters"
  const { searchText, ...resourceFilterAssetSate } = filters;
  return {
    ...resourceFilterAssetSate,
    updateSearchText: (searchText: string) => dispatch(setSearchTextAction(searchText, ontologies, shapes, resources)),
    updateFilterAsset: (asset: Asset) => {
      // alert('dispatching updateFilterAssetAction' + JSON.stringify(asset)); //TODO REMOVE
      dispatch(updateFilterAssetAction(asset, ontologies, shapes, resources))
    }
  }
}

