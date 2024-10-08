import {
  fetchAllOntologiesFromSchemas,
  fetchOntologyById,
  getResourceFormats,
  getResourceTypes,
  getUniqueLinks
} from '../../src/services/ontologyService.utils';
import { fetchAllShapesFromSchemas } from '../../src/services/shapeService.utils';
import { ShapesAndOntologiesInput } from '../../src/types/ontologies.model';
import { readFile } from '../../src/utils/readFile';
import { EnvironmentModelOntology } from '../__fixtures__/environment_model_ontology';
import { HdmapOntology } from '../__fixtures__/hdmap_ontology';

const GENERAL_SHAPE_ID = '8c6a9177cc0141095c1d65d10963359bb5338f9dd8ceb314073ce0a3c3497b59'
const GENERAL_ONTOLOGY_ID = 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/general/'
const HDMAP_SHAPE_ID = '700f40c0030d83b0ca6ed147144037891b27f4fa73fe596d0092c25b07c9d98b'
const HDMAP_ONTOLOGY_ID = 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/hdmap/'
const ENV_MODEL_SHAPE_ID = '9ff53e73d6e55bb1c9838240d1eb758dcf56d62ced1b0c1fcc4cf6aa022f996c'
const ENV_MODEL_ONTOLOGY_ID = 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/tree/main/environment-model/'

const getSchemaById = jest.fn();
jest.mock('../../src/services/schemaApiService', () => ({
  getSchemaById: () => getSchemaById(),
}));

const general_ontology_ttl = readFile('tests/__fixtures__/general_ontology.ttl')
const general_shacl_ttl = readFile('tests/__fixtures__/general_shacl.ttl')
const hdmap_ontology_ttl = readFile('tests/__fixtures__/hdmap_ontology.ttl')
const hdmap_shacl_ttl = readFile('tests/__fixtures__/hdmap_shacl.ttl')
const environment_model_ontology_ttl = readFile('tests/__fixtures__/environment-model_ontology.ttl')
const environment_model_shacl_ttl = readFile('tests/__fixtures__/environment-model_shacl.ttl')

describe('fetchAllOntologiesFromSchemas', () => {
  const schemas = {
    ontologies: [HDMAP_ONTOLOGY_ID, ENV_MODEL_ONTOLOGY_ID]
  } as ShapesAndOntologiesInput;

  it('fetches all ontologies listed in the schema', async () => {
    getSchemaById
      .mockResolvedValueOnce(await hdmap_ontology_ttl)
      .mockResolvedValueOnce(await environment_model_ontology_ttl)

    const ontologies = await fetchAllOntologiesFromSchemas(schemas, []);
    expect(ontologies).toEqual([HdmapOntology, EnvironmentModelOntology]);
  })
})

describe('fetchOntologyById', () => {
  it('fetches HdMap ontology turtle file and converts it to Ontology object', async () => {
    getSchemaById.mockResolvedValueOnce(await hdmap_ontology_ttl);

    const ontology = await fetchOntologyById([], HDMAP_ONTOLOGY_ID);
    expect(ontology).toEqual(HdmapOntology);
  })

  it('fetches environment model ontology turtle file and converts it to Ontology object', async () => {
    getSchemaById.mockResolvedValueOnce(await environment_model_ontology_ttl);

    const ontology = await fetchOntologyById([], ENV_MODEL_ONTOLOGY_ID);
    expect(ontology).toEqual(EnvironmentModelOntology);
  })
})

describe('getUniqueLinks', () => {
  it('returns links that are unique', () => {
    const links = getUniqueLinks([HdmapOntology, EnvironmentModelOntology]);
    expect(links.length).toBeGreaterThan(0)

    const unique = Array.from(new Set(links.map(link => `${link.source} - ${link.target}`)));
    expect(links.length).toBe(unique.length)
  })
})

describe('getResourceType', () => {
  const schemas = {
    shapes: [GENERAL_SHAPE_ID, HDMAP_SHAPE_ID, ENV_MODEL_SHAPE_ID],
    ontologies: [GENERAL_ONTOLOGY_ID, HDMAP_ONTOLOGY_ID, ENV_MODEL_ONTOLOGY_ID],
  } as ShapesAndOntologiesInput;

  it('returns a list of short subject of shapes which are subclasses of "DataResource"', async () => {
    getSchemaById
      .mockResolvedValueOnce(await general_shacl_ttl)
      .mockResolvedValueOnce(await hdmap_shacl_ttl)
      .mockResolvedValueOnce(await environment_model_shacl_ttl)
      .mockResolvedValueOnce(await general_ontology_ttl)
      .mockResolvedValueOnce(await hdmap_ontology_ttl)
      .mockResolvedValueOnce(await environment_model_ontology_ttl)

    const shapes = await fetchAllShapesFromSchemas(schemas)
    const ontologies = await fetchAllOntologiesFromSchemas(schemas, shapes);
    const resourceTypes = getResourceTypes(ontologies)
    expect(resourceTypes).toEqual(new Set(['HdMap', 'EnvironmentModel']));
  })
})

describe('getResourceFormats', () => {
  const schemas = {
    shapes: [GENERAL_SHAPE_ID, HDMAP_SHAPE_ID, ENV_MODEL_SHAPE_ID],
    ontologies: [GENERAL_ONTOLOGY_ID, HDMAP_ONTOLOGY_ID, ENV_MODEL_ONTOLOGY_ID],
  } as ShapesAndOntologiesInput;

  it('returns the "in" parameter values of the "formatType" property of the shapes which are subclasses of' +
        ' "DataResource"', async () => {
    getSchemaById
      .mockResolvedValueOnce(await general_shacl_ttl)
      .mockResolvedValueOnce(await hdmap_shacl_ttl)
      .mockResolvedValueOnce(await environment_model_shacl_ttl)
      .mockResolvedValueOnce(await general_ontology_ttl)
      .mockResolvedValueOnce(await hdmap_ontology_ttl)
      .mockResolvedValueOnce(await environment_model_ontology_ttl)

    const shapes = await fetchAllShapesFromSchemas(schemas)
    const ontologies = await fetchAllOntologiesFromSchemas(schemas, shapes);
    const resourceFormats = getResourceFormats(ontologies)
    expect(resourceFormats).toEqual(['ASAM OpenDRIVE', 'Lanelet', 'Road5', 'Shape', 'road2sim', 'roadXML',
      'Autodesk FBX', 'GLTF', 'OpenSceneGraph', 'Unreal DataSmith'])
  })
})
