import { loadOntology } from '../../../../src/components/ontologies/helpers/ontologyDataFlow';
import { fetchOntologyById } from '../../../../src/services/ontologyService.utils';
import { fetchAllSchemas } from '../../../../src/services/schemaApiService';
import { fetchAllShapesFromSchemas } from '../../../../src/services/shapeService.utils';

jest.mock('../../../../src/services/ontologyService.utils');
jest.mock('../../../../src/services/schemaApiService');
jest.mock('../../../../src/services/shapeService.utils');

describe('loadOntology', () => {
  it('should load ontology by id', async () => {
    const mockSchemas = [{ id: 'schema1' }, { id: 'schema2' }];
    const mockShapes = [{ id: 'shape1' }, { id: 'shape2' }];
    const mockOntology = { id: 'ontology1', name: 'Test Ontology' };

    (fetchAllSchemas as jest.Mock).mockResolvedValue(mockSchemas);
    (fetchAllShapesFromSchemas as jest.Mock).mockResolvedValue(mockShapes);
    (fetchOntologyById as jest.Mock).mockResolvedValue(mockOntology);

    const ontologyId = 'ontology1';
    const result = await loadOntology(ontologyId);

    expect(fetchAllSchemas).toHaveBeenCalled();
    expect(fetchAllShapesFromSchemas).toHaveBeenCalledWith(mockSchemas);
    expect(fetchOntologyById).toHaveBeenCalledWith(mockShapes, ontologyId);
    expect(result).toEqual(mockOntology);
  });
});
