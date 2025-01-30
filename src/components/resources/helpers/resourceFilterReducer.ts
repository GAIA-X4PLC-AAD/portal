import { AnyAction } from 'redux';

import { Ontology } from '../../../types/ontologies.model';
import { Resource } from '../../../types/resources.model';

import { Asset, calculateResourceFiltersAssetState } from './resourceFilterHelper';

////////////////////////////////////////////////////////////////////////////////
// Action types
////////////////////////////////////////////////////////////////////////////////
export const SET_RESOURCE_FILTER_ASSETS = 'SET_RESOURCE_FILTER_ASSETS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const UPDATE_FILTER_ASSET = 'UPDATE_FILTER_ASSET';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

export type SortOrder = 'ASC_NAME' | 'DESC_NAME' | 'ASC_DATE' | 'DESC_DATE';

////////////////////////////////////////////////////////////////////////////////
// Type definitions
////////////////////////////////////////////////////////////////////////////////
type ResourceFilterAssetState = {
    filteredResources: Resource[],
    typeAssets: Asset[],
    formatAssets: Asset[],
    vendorAssets: Asset[],
};

export type ResourceFilterState = ResourceFilterAssetState & {
    searchText: string;
    sortOrder: SortOrder;
}

type ResourceFilterAction =
    {
        type: 'SET_RESOURCE_FILTER_ASSETS', payload: {
            ontologies: Ontology[],
            resources: Resource[]
        }
    } |
    {
        type: 'SET_SEARCH_TEXT', payload: {
            searchText: string,
            ontologies: Ontology[],
            resources: Resource[]
        }
    } |
    {
        type: 'UPDATE_FILTER_ASSET', payload: {
            asset: Asset,
            ontologies: Ontology[],
            resources: Resource[],
        },
    } |
    {
        type: 'SET_SORT_ORDER';
        payload: {
            sortOrder: SortOrder;
            ontologies: Ontology[];
            resources: Resource[];
        };
    }

////////////////////////////////////////////////////////////////////////////////
// Initial state
////////////////////////////////////////////////////////////////////////////////
export const initialResourceFilterState: ResourceFilterState = {
  filteredResources: [],
  typeAssets: [],
  formatAssets: [],
  vendorAssets: [],
  searchText: '',
  sortOrder: 'ASC_NAME',
}

////////////////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////////////////
export const resourceFilterReducer = (state: ResourceFilterState, action: AnyAction): ResourceFilterState => {
  switch (action.type) {

  case SET_RESOURCE_FILTER_ASSETS:
    return {
      ...state,
      ...calculateResourceFiltersAssetState(action.payload.ontologies, action.payload.resources, initialResourceFilterState)
    }

  case SET_SEARCH_TEXT:
    return {
      ...state,
      ...calculateResourceFiltersAssetState(action.payload.ontologies, action.payload.resources, {
        ...state,
        searchText: action.payload.searchText
      }),
      searchText: action.payload.searchText
    }

  case UPDATE_FILTER_ASSET:
    return {
      ...state,
      ...calculateResourceFiltersAssetState(action.payload.ontologies, action.payload.resources, {
        ...state,
        typeAssets: state.typeAssets.map(item => item.id === action.payload.asset.id ? action.payload.asset : item),
        formatAssets: state.formatAssets.map(item => item.id === action.payload.asset.id ? action.payload.asset : item),
        vendorAssets: state.vendorAssets.map(item => item.id === action.payload.asset.id ? action.payload.asset : item)
      })
    }

  case SET_SORT_ORDER:
    return {
      ...state,
      ...calculateResourceFiltersAssetState(
        action.payload.ontologies,
        action.payload.resources,
        {
          ...state,
          sortOrder: action.payload.sortOrder,
        }
      ),
      sortOrder: action.payload.sortOrder,
    };

  default:
    return state;
  }
}

////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////
export const setResourceFilterAssetsAction = (
  ontologies: Ontology[],
  resources: Resource[]): ResourceFilterAction => (
  {
    type: SET_RESOURCE_FILTER_ASSETS,
    payload: { ontologies, resources }
  })

export const setSearchTextAction = (
  searchText: string,
  ontologies: Ontology[],
  resources: Resource[]): ResourceFilterAction => (
  {
    type: SET_SEARCH_TEXT,
    payload: { searchText, ontologies, resources }
  })

export const updateFilterAssetAction = (
  asset: Asset,
  ontologies: Ontology[],
  resources: Resource[]): ResourceFilterAction => (
  {
    type: UPDATE_FILTER_ASSET,
    payload: { asset, ontologies, resources }
  })

export const setSortOrderAction = (
  sortOrder: SortOrder,
  ontologies: Ontology[],
  resources: Resource[]
): ResourceFilterAction => ({
  type: SET_SORT_ORDER,
  payload: { sortOrder, ontologies, resources },
});
