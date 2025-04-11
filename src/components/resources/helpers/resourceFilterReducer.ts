import { AnyAction } from 'redux';

import { Ontology } from '../../../types/ontologies.model';
import { Resource } from '../../../types/resources.model';
import { Shape } from '../../../types/shapes.model';

import { Asset, calculateResourceFiltersAssetState } from './resourceFilterHelper';

////////////////////////////////////////////////////////////////////////////////
// Action types
////////////////////////////////////////////////////////////////////////////////
export const SET_RESOURCE_FILTER_ASSETS = 'SET_RESOURCE_FILTER_ASSETS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const UPDATE_FILTER_ASSET = 'UPDATE_FILTER_ASSET';
export const UPDATE_SPECIFIC_DETAILS = 'UPDATE_SPECIFIC_DETAILS';

////////////////////////////////////////////////////////////////////////////////
// Type definitions
////////////////////////////////////////////////////////////////////////////////
type ResourceFilterAssetState = {
    filteredResources: Resource[],
    typeAssets: Asset[],
    formatAssets: Asset[],
    vendorAssets: Asset[],
    specificAssets: Asset[]
};

export type ResourceFilterState = ResourceFilterAssetState & {
    searchText: string,
    resourceSpecificDetailsQuery: string,
    resourceSpecificDetails: any[]
}

type ResourceFilterAction =
    {
        type: 'SET_RESOURCE_FILTER_ASSETS', payload: {
            ontologies: Ontology[],
            resources: Resource[],
            shapes: Shape[],
        }
    } |
    {
        type: 'SET_SEARCH_TEXT', payload: {
            searchText: string,
            ontologies: Ontology[],
            resources: Resource[],
            shapes: Shape[],
        }
    } |
    {
        type: 'UPDATE_FILTER_ASSET', payload: {
            asset: Asset,
            ontologies: Ontology[],
            resources: Resource[],
            shapes: Shape[],
        },
    } |
    {
        type: 'UPDATE_SPECIFIC_DETAILS', payload: {
            ontologies: Ontology[],
            resources: Resource[],
            shapes: Shape[],
            specificDetails: any[],
        },
    }

////////////////////////////////////////////////////////////////////////////////
// Initial state
////////////////////////////////////////////////////////////////////////////////
export const initialResourceFilterState: ResourceFilterState = {
  filteredResources: [],
  typeAssets: [],
  formatAssets: [],
  vendorAssets: [],
  specificAssets: [],
  searchText: '',
  resourceSpecificDetailsQuery: '',
  resourceSpecificDetails: []
}

////////////////////////////////////////////////////////////////////////////////
// Reducer
////////////////////////////////////////////////////////////////////////////////
export const resourceFilterReducer = (state: ResourceFilterState, action: AnyAction): ResourceFilterState => {
  switch (action.type) {

  case SET_RESOURCE_FILTER_ASSETS:
    return {
      ...state,
      ...calculateResourceFiltersAssetState(action.payload.ontologies, action.payload.shapes, action.payload.resources, initialResourceFilterState)
    }

  case SET_SEARCH_TEXT:
    return {
      ...state,
      ...calculateResourceFiltersAssetState(action.payload.ontologies, action.payload.shapes, action.payload.resources, {
        ...state,
        searchText: action.payload.searchText
      }),
      searchText: action.payload.searchText
    }

  case UPDATE_FILTER_ASSET:
    return {
      ...state,
      ...calculateResourceFiltersAssetState(action.payload.ontologies, action.payload.shapes, action.payload.resources, {
        ...state,
        typeAssets: state.typeAssets.map(item => item.id === action.payload.asset.id ? action.payload.asset : item),
        formatAssets: state.formatAssets.map(item => item.id === action.payload.asset.id ? action.payload.asset : item),
        vendorAssets: state.vendorAssets.map(item => item.id === action.payload.asset.id ? action.payload.asset : item),
        specificAssets: state.specificAssets.map(item => item.id === action.payload.asset.id ? action.payload.asset : item)
      }, state.resourceSpecificDetails),
    }

  case UPDATE_SPECIFIC_DETAILS:
    return {
      ...state,
      ...calculateResourceFiltersAssetState(action.payload.ontologies, action.payload.shapes, action.payload.resources, {
        ...state
      }, action.payload.specificDetails),
      resourceSpecificDetails: action.payload.specificDetails,
    }
  }
  return state
}

////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////
export const setResourceFilterAssetsAction = (
  ontologies: Ontology[],
  shapes: Shape[],
  resources: Resource[]): ResourceFilterAction => (
  {
    type: SET_RESOURCE_FILTER_ASSETS,
    payload: { ontologies, resources, shapes }
  })

export const setSearchTextAction = (
  searchText: string,
  ontologies: Ontology[],
  shapes: Shape[],
  resources: Resource[]): ResourceFilterAction => (
  {
    type: SET_SEARCH_TEXT,
    payload: { searchText, ontologies, resources, shapes }
  })

export const updateFilterAssetAction = (
  asset: Asset,
  ontologies: Ontology[],
  shapes: Shape[],
  resources: Resource[]): ResourceFilterAction => (
  {
    type: UPDATE_FILTER_ASSET,
    payload: { asset, ontologies, resources, shapes }
  })

export const updateSpecificDetailsAction = (
  ontologies: Ontology[],
  shapes: Shape[],
  resources: Resource[],
  specificDetails: any[]): ResourceFilterAction => (
  {
    type: UPDATE_SPECIFIC_DETAILS,
    payload: { ontologies, resources, shapes, specificDetails }
  })

