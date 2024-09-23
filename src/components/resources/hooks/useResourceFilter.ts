import { useEffect, useReducer } from 'react';

import { Ontology } from '../../../types/ontologies.model';
import { Resource } from '../../../types/resources.model';
import { Asset } from '../helpers/resourceFilterHelper';
import {
  initialResourceFilterState,
  resourceFilterReducer,
  setResourceFilterAssetsAction,
  setSearchTextAction,
  updateFilterAssetAction
} from '../helpers/resourceFilterReducer';

export const useResourceFilter = (ontologies: Ontology[], resources: Resource[]) => {
  const [filters, dispatch] = useReducer(resourceFilterReducer, initialResourceFilterState);

  useEffect(() => {
    dispatch(setResourceFilterAssetsAction(ontologies, resources));
  }, [ontologies, resources]);

  const { searchText, ...resourceFilterAssetSate } = filters;
  return {
    ...resourceFilterAssetSate,
    updateSearchText: (searchText: string) => dispatch(setSearchTextAction(searchText, ontologies, resources)),
    updateFilterAsset: (asset: Asset) => dispatch(updateFilterAssetAction(asset, ontologies, resources))
  }
}

