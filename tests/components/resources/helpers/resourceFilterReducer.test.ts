import { Asset } from '../../../../src/components/resources/helpers/resourceFilterHelper';
import {
  SET_RESOURCE_FILTER_ASSETS,
  SET_SEARCH_TEXT, SET_SORT_ORDER,
  setResourceFilterAssetsAction,
  setSearchTextAction, setSortOrderAction,
  UPDATE_FILTER_ASSET,
  updateFilterAssetAction
} from '../../../../src/components/resources/helpers/resourceFilterReducer';
import { Ontology } from '../../../../src/types/ontologies.model';
import { Resource } from '../../../../src/types/resources.model';

const getSchemaById = jest.fn();
jest.mock('../../../../src/services/schemaApiService', () => ({
  getSchemaById: () => getSchemaById(),
}));

// describe('Reducer', () => {
//
//   it('', () => {
//
//     // const nextState = resourceFilterReducer(initialResourceFilterState, setResourceFilterAssetsAction(ontologiesWithRelatedShapes))
//   })
// })

describe('Actions', () => {
  const ontologies = [{}, {}] as Ontology[]
  const resources = [{}, {}, {}] as Resource[]

  test('setResourceFilterAssetsAction', () => {
    const result = setResourceFilterAssetsAction(ontologies, resources);

    expect(result).toEqual({
      type: SET_RESOURCE_FILTER_ASSETS,
      payload: { ontologies, resources }
    })
  })

  test('setSearchTextAction', () => {
    const searchText = 'SEARCH_TEXT';

    const result = setSearchTextAction(searchText, ontologies, resources);

    expect(result).toEqual({
      type: SET_SEARCH_TEXT,
      payload: { searchText, ontologies, resources }
    })
  })

  test('updateFilterAssetAction', () => {
    const asset = {} as Asset;

    const result = updateFilterAssetAction(asset, ontologies, resources);

    expect(result).toEqual({
      type: UPDATE_FILTER_ASSET,
      payload: { asset, ontologies, resources }
    })
  })

  test('setSortOrderAction', () => {
    const sortOrder = 'ASC_NAME';

    const result = setSortOrderAction(sortOrder, ontologies, resources);

    expect(result).toEqual({
      type: SET_SORT_ORDER,
      payload: { sortOrder, ontologies, resources }
    })
  })
})
