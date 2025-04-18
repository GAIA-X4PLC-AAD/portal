import { Asset } from '../../../../src/components/resources/helpers/resourceFilterHelper';
import {
  SET_RESOURCE_FILTER_ASSETS,
  SET_SEARCH_TEXT,
  setResourceFilterAssetsAction,
  setSearchTextAction,
  UPDATE_FILTER_ASSET,
  updateFilterAssetAction
} from '../../../../src/components/resources/helpers/resourceFilterReducer';
import { Ontology } from '../../../../src/types/ontologies.model';
import { Resource } from '../../../../src/types/resources.model';
import { Shape } from '../../../../src/types/shapes.model';

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
  const shapes: Shape[] = [{}, {}, {}] as Shape[]

  test('setResourceFilterAssetsAction', () => {
    const result = setResourceFilterAssetsAction(ontologies, shapes, resources);

    expect(result).toEqual({
      type: SET_RESOURCE_FILTER_ASSETS,
      payload: { ontologies, shapes, resources }
    })
  })

  test('setSearchTextAction', () => {
    const searchText = 'SEARCH_TEXT';

    const result = setSearchTextAction(searchText, ontologies, shapes, resources);

    expect(result).toEqual({
      type: SET_SEARCH_TEXT,
      payload: { searchText, ontologies, shapes, resources }
    })
  })

  test('updateFilterAssetAction', () => {
    const asset = {} as Asset;

    const result = updateFilterAssetAction(asset, ontologies, shapes, resources);

    expect(result).toEqual({
      type: UPDATE_FILTER_ASSET,
      payload: { asset, ontologies, shapes, resources }
    })
  })

})
