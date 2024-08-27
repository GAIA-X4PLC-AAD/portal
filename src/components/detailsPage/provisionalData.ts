import { Ontology } from '../../types/ontologies.model';
import { Shape } from '../../types/shapes.model';

export const testShape1: Shape = {
  comment: 'comment',
  label: 'label',
  subClasses: []
};

export const testShape2: Shape = {
  comment: 'comment',
  label: 'label',
  subClasses: []
};

export const testOntology2: Ontology = {
  subject: 'https://base2.com/',
  contributors: ['contributor1', 'contributor2'],
  description: 'description2',
  version: 'version',
  shapes: [testShape1, testShape2],
  linksForOfferings: ['https://www.google.de', 'https://www.google.de'],
  relatedOntologies: []
};

export const testOntology: Ontology = {
  subject: 'https://example.org/V1-0-0/plc/',
  contributors: ['contributor1', 'contributor2'],
  description: 'description',
  version: 'version',
  shapes: [testShape1, testShape2],
  graphLink: 'http://owlgred.lumii.lv/online_visualization/',
  downloadLink: 'https://www.google.de',
  linksForOfferings: ['https://www.google.de', 'https://www.google.de'],
  relatedOntologies: [testOntology2]
};
