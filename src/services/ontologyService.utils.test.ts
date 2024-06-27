import { describe, expect, it } from '@jest/globals';

import { Ontology } from '../types/shapesAndOntologies.model';

import { createOntologyObject } from './ontologyService.utils';

describe('ontologyMapper test', () => {
  it('should create an ontology object from rdf data', () => {
    const rdfData = [
      {
        _subject: { id: 'subject1' },
        _predicate: { id: 'http://purl.org/dc/terms/contributor' },
        _object: { id: '"contributor1"' },
      },
      {
        _subject: { id: 'subject1' },
        _predicate: { id: 'http://purl.org/dc/terms/contributor' },
        _object: { id: '"contributor2"' },
      },
      {
        _subject: { id: 'subject1' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
        _object: { id: '"description1"@en' },
      },
      {
        _subject: { id: 'subject1' },
        _predicate: { id: 'http://www.w3.org/2002/07/owl#versionInfo' },
        _object: { id: '"version1"^^http://www.w3.org/2001/XMLSchema#string' },
      },
      {
        _subject: { id: 'subject2' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
        _object: { id: '"label1"@en' },
      },
      {
        _subject: { id: 'subject2' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
        _object: { id: '"comment1"' },
      },
      {
        _subject: { id: 'subject2' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#subClassOf' },
        _object: { id: '"subClass1"' },
      },
      {
        _subject: { id: 'subject3' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
        _object: { id: '' },
      },
      {
        _subject: { id: 'subject3' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
        _object: { id: '"comment1"' },
      },
      {
        _subject: { id: 'subject3' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#subClassOf' },
        _object: { id: '"subClass1"' },
      },
      {
        _subject: { id: 'subject4' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#label' },
        _object: { id: '"label2"@en' },
      },
      {
        _subject: { id: 'subject4' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#comment' },
        _object: { id: '"comment1"' },
      },
      {
        _subject: { id: 'subject4' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#subClassOf' },
        _object: { id: '"subClass2"' },
      },
      {
        _subject: { id: 'subject4' },
        _predicate: { id: 'http://www.w3.org/2000/01/rdf-schema#subClassOf' },
        _object: { id: '"subClass3"' },
      },
    ];

    const expected: Ontology = {
      subject: 'subject1',
      contributors: ['contributor1', 'contributor2'],
      description: 'description1',
      version: 'version1',
      shapes: [
        {
          label: 'label1',
          comment: 'comment1',
          subClasses: ['subClass1'],
        },
        {
          label: 'label2',
          comment: 'comment1',
          subClasses: ['subClass2', 'subClass3'],
        },
      ],
    };

    const result = createOntologyObject(rdfData);
    expect(result).toEqual(expected);
  });
});
