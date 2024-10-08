import { getAllLabels } from '../../../../src/components/resources/helpers/resourceFilterHelper';
import {
  getPropertyValue,
  removeNonResourceTypeLabels
} from '../../../../src/components/resources/helpers/resourcesHelper';

import { resources_HdMap_EnvironmentModel_x2 } from './__fixtures__/resources_HdMap_EnvironmentModel_x2';

describe('removeNonResourceTypeLabels', () => {
  it('returns the value of a given property entry', () => {
    const obj = {
      property1: 'first property value',
      property2: 'second property value'
    }
    const entries = Object.entries(obj);
    expect(getPropertyValue(entries[0])).toEqual('first property value');
    expect(getPropertyValue(entries[1])).toEqual('second property value');
  })

  it('removes all labels which not contained by the "resourceTypes" input parameter', () => {
    const resourceTypes = ['HdMap', 'EnvironmentModel'];
    const result = removeNonResourceTypeLabels(resources_HdMap_EnvironmentModel_x2, resourceTypes);

    expect(getAllLabels(resources_HdMap_EnvironmentModel_x2).size).toBeGreaterThan(resourceTypes.length);
    expect(getAllLabels(result)).toEqual(new Set(resourceTypes));
  })
})
