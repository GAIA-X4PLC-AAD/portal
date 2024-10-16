import i18next from 'i18next';

import { Ontology } from '../../types/ontologies.model';
import { Resource } from '../../types/resources.model';
import { ServiceOffering } from '../../types/serviceOfferings.model';
import { Shape } from '../../types/shapes.model';

export interface ItemCardData {
    label: string;
    isGaiaXCompliant: boolean;
    title: string;
    description: string;
    navigationUrl: string;
    testId: string;
}

const NO_TITLE = i18next.t('common.no-title');
const NO_DESCRIPTION = i18next.t('common.no-description');

const createItemCardData = (
  label: string,
  title: string | undefined,
  description: string | undefined,
  url: string,
  isGaiaXCompliant: boolean,
  testId: string
): ItemCardData => ({
  label,
  title: title ? title : NO_TITLE,
  description: description ? description : NO_DESCRIPTION,
  navigationUrl: url,
  isGaiaXCompliant,
  testId
});

export const ontologyToItemCardData = (ontology: Ontology): ItemCardData => {
  return createItemCardData(
    i18next.t('ontologies.title'),
    ontology.subject,
    ontology.description,
    `/ontologies/details/${ontology.subject}`,
    false,
    'Card:' + ontology.subject
  );
}

export const shapeToItemCardData = (shape: Shape): ItemCardData => {
  return createItemCardData(
    i18next.t('shapes.title'),
    shape.shaclShapeName,
    undefined,
    `/shapes/details/${shape.shaclShapeName}`,
    false,
    'Card:' + shape.shaclShapeName
  );
}

export const serviceToItemCardData = (service: ServiceOffering): ItemCardData => {
  console.log(service)
  return createItemCardData(
    service.label,
    service.name,
    service.description,
    `/services/details/${service.claimsGraphUri}`,
    false,
    'Card:' + service.uri + ':' + service.name
  );
}

export const resourceToItemCardData = (resource: Resource): ItemCardData => {
  return createItemCardData(
    resource.labels.join(', '),
    resource.claimsGraphUri.join(', '),
    resource.description,
    `/resources/${resource.uri}`,
    true,
    'Card:' + resource.uri + ':' + resource.name
  );
}
