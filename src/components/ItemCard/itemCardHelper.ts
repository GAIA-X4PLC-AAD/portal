import i18next from 'i18next';

import { Ontology } from '../../types/ontologies.model';
import { Participant } from '../../types/participants.model';
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

export const createItemCardData = (
  label: string,
  title: string | undefined,
  description: string | undefined,
  url: string,
  isGaiaXCompliant: boolean,
  testId: string
): ItemCardData => ({
  label,
  title: title ? title : '',
  description: description ? description : '',
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
    resource.name,
    resource.description,
    `/resources/${encodeURIComponent(resource.uri)}`,
    true,
    'Card:' + resource.uri + ':' + resource.name
  );

}

export const participantToItemCardData = (participant: Participant): ItemCardData => {
  return createItemCardData(
    participant.labels.filter((label: string) => ['LegalParticipant'].includes(label)).join(', '),
    participant.legalName,
    undefined,
    `/participants/${encodeURIComponent(participant.legalName)}`,
    true,
    'Card:' + participant.legalName
  );
}
